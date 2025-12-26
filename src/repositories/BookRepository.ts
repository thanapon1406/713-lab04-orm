import type { Book } from "../generated/prisma/client";
import { prisma } from "../lib/Prisma";

export class BookRepository {
  async findAll(query: Record<string, any> = {}): Promise<Book[]> {
    const where: Record<string, any> = {};
    Object.keys(query).forEach((key) => {
      if (query[key] !== undefined) {
        where[key] =
          typeof query[key] === "string"
            ? { contains: query[key], mode: "insensitive" }
            : query[key];
      }
    });

    return prisma.book.findMany({ where });
  }
  async create(data: Book): Promise<Book> {
    return prisma.book.create({ data });
  }
}
