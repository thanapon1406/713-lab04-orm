import type { Book } from "../generated/prisma/client";
import { BookRepository } from "../repositories/BookRepository";

export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async getAllBooks(query: Record<string, any> = {}): Promise<Book[]> {
    const books = await this.bookRepository.findAll(query);
    return books;
  }
}

// Export singleton instance
const bookRepository = new BookRepository();
export const bookService = new BookService(bookRepository);
