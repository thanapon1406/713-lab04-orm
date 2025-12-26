import type { Book } from "../generated/prisma/client";
import { bookRepository } from "../repositories/BookRepository";
export const bookService = {
  async getAllBooks(): Promise<Book[]> {
    const books = await bookRepository.findAll();
    return books;
  },
};
