import type { Author } from "../generated/prisma/client";
import { AuthorRepository } from "../repositories/AuthorRepository";

export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}

  async getAllAuthors(query: Record<string, any> = {}): Promise<Author[]> {
    const authors = await this.authorRepository.findAll(query);
    return authors;
  }
}

// Export singleton instance
const authorRepository = new AuthorRepository();
export const authorService = new AuthorService(authorRepository);
