import type { Author } from "../generated/prisma/client";
import { prisma } from "../lib/Prisma";
import {
  mapQueryToPrismaOptions,
  mapQueryToPrismaOptionsWithOutPagination,
  mapQueryToPrismaOptionsWithPagination,
} from "../utils/queryMapper";

export class AuthorRepository {
  async findAll(query: Record<string, any> = {}): Promise<Author[]> {
    const where = mapQueryToPrismaOptions(query);
    return prisma.author.findMany(where);
  }
  async findManyWithPagination(
    query: Record<string, any> = {},
    page: number,
    limit: number
  ): Promise<Author[]> {
    const where = mapQueryToPrismaOptionsWithPagination(query, page, limit);
    return prisma.author.findMany(where);
  }

  async count(query: Record<string, any> = {}): Promise<number> {
    const where = mapQueryToPrismaOptionsWithOutPagination(query);
    return prisma.author.count(where);
  }
  async create(data: Author): Promise<Author> {
    return prisma.author.create({ data });
  }
}
