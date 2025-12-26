import type { Book } from "../generated/prisma/client";
import { prisma } from "../lib/Prisma";

export const bookRepository = {
  async findAll(): Promise<Book[]> {
    return prisma.book.findMany();
  },
  async create(data: Book): Promise<Book> {
    return prisma.book.create({ data });
  },
};
