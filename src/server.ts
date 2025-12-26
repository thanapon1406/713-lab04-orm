import express, { type Request, type Response } from "express";
import { bookService } from "./services/BookService";
import { authorService } from "./services/AuthorService";
import { historyService } from "./services/HistoryService";
import { memberService } from "./services/MemberService";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.get("/books", async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks(req.query as Record<string, any>);
  if (books.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }
  res.json(books);
});

app.get("/authors", async (req: Request, res: Response) => {
  const authors = await authorService.getAllAuthors(
    req.query as Record<string, any>
  );
  if (authors.length === 0) {
    return res.status(404).json({ message: "No authors found" });
  }
  res.json(authors);
});

app.get("/histories", async (req: Request, res: Response) => {
  const histories = await historyService.getAllHistorys(
    req.query as Record<string, any>
  );
  if (histories.length === 0) {
    return res.status(404).json({ message: "No histories found" });
  }
  res.json(histories);
});

app.get("/members", async (req: Request, res: Response) => {
  const members = await memberService.getAllMembers(
    req.query as Record<string, any>
  );
  if (members.length === 0) {
    return res.status(404).json({ message: "No members found" });
  }
  res.json(members);
});
