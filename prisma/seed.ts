import { prisma } from "../src/lib/Prisma";

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Create Authors
  const author1 = await prisma.author.create({
    data: {
      firstName: "J.K.",
      lastName: "Rowling",
      agency: "Bloomsbury",
    },
  });

  const author2 = await prisma.author.create({
    data: {
      firstName: "George",
      lastName: "Orwell",
      agency: "Secker & Warburg",
    },
  });

  console.log(`✅ Created authors: ${author1.firstName}, ${author2.firstName}`);

  // 2. Create Books
  const booksData = [
    {
      name: "Harry Potter and the Sorcerer's Stone",
      group: "Fantasy",
      authorId: author1.id,
    },
    {
      name: "Harry Potter and the Chamber of Secrets",
      group: "Fantasy",
      authorId: author1.id,
    },
    {
      name: "Harry Potter and the Prisoner of Azkaban",
      group: "Fantasy",
      authorId: author1.id,
    },
    { name: "1984", group: "Dystopian", authorId: author2.id },
    { name: "Animal Farm", group: "Political Satire", authorId: author2.id },
  ];

  // We use createMany for speed, but we can't get IDs back easily in all DBs.
  // For seeding with relations later, it's safer to create one by one or query them back.
  // Here I'll loop to keep it simple and get IDs.
  const books = [];
  for (const b of booksData) {
    const book = await prisma.book.create({ data: b });
    books.push(book);
  }

  console.log(`✅ Created ${books.length} books`);

  // 3. Create Members
  const member1 = await prisma.member.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      mobile: "081-234-5678",
    },
  });

  const member2 = await prisma.member.create({
    data: {
      firstName: "Jane",
      lastName: "Smith",
      mobile: "089-987-6543",
    },
  });

  console.log(
    `✅ Created members: ${member1.firstName} (${member1.memberNo}), ${member2.firstName} (${member2.memberNo})`
  );

  // 4. Create History (Borrowing Records)

  // Scenario A: John borrows 2 Harry Potter books in one batch (Current/Active Loan)
  const batchId1 = crypto.randomUUID(); // Create a unique batch ID
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  await prisma.history.createMany({
    data: [
      {
        memberNo: member1.memberNo,
        bookId: books[0]?.id || 0, // Sorcerer's Stone
        expectReturn: nextWeek,
        batchId: batchId1,
        returnedAt: null, // Still borrowed
      },
      {
        memberNo: member1.memberNo,
        bookId: books[1]?.id || 0, // Chamber of Secrets
        expectReturn: nextWeek,
        batchId: batchId1,
        returnedAt: null, // Still borrowed
      },
    ],
  });

  // Scenario B: Jane borrowed 1 book and returned it already (Past History)
  const batchId2 = crypto.randomUUID();
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const returnedDate = new Date(lastMonth);
  returnedDate.setDate(returnedDate.getDate() + 5);

  await prisma.history.create({
    data: {
      memberNo: member2.memberNo,
      bookId: books[3]?.id || 0, // 1984
      expectReturn: lastMonth, // Was due last month
      returnedAt: returnedDate, // Returned 5 days after borrowing
      batchId: batchId2,
    },
  });

  console.log("✅ Created history records with batch IDs");
  console.log("🌱 Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
