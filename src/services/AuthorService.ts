import type { Author } from "../generated/prisma/client";
import { AuthorRepository } from "../repositories/AuthorRepository";

export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}

  async getAllAuthors(query: Record<string, any> = {}): Promise<Author[]> {
    const authors = await this.authorRepository.findAll(query);
    return authors;
  }

  async getAllAuthorsWithPagination(
    page: number,
    limit: number,
    query: Record<string, any> = {}
  ): Promise<{ data: Author[]; total: number; page: number; limit: number }> {
    const total = await this.authorRepository.count(query);
    const data = await this.authorRepository.findManyWithPagination(
      query,
      page,
      limit
    );

    return {
      data,
      total,
      page,
      limit,
    };
  }
}

// Export singleton instance
const authorRepository = new AuthorRepository();
export const authorService = new AuthorService(authorRepository);
