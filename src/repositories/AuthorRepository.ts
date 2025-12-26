import type { Author } from "../generated/prisma/client";
import { prisma } from "../lib/Prisma";

export class AuthorRepository {
  async findAll(query: Record<string, any> = {}): Promise<Author[]> {
    const where: Record<string, any> = {};
    Object.keys(query).forEach((key) => {
      if (query[key] !== undefined) {
        where[key] =
          typeof query[key] === "string"
            ? { contains: query[key], mode: "insensitive" }
            : query[key];
      }
    });

    return prisma.author.findMany({ where });
  }
  async create(data: Author): Promise<Author> {
    return prisma.author.create({ data });
  }
}
