import type { Book } from "../generated/prisma/client";
import { prisma } from "../lib/Prisma";
import {
  mapQueryToPrismaOptions,
  mapQueryToPrismaOptionsWithOutPagination,
  mapQueryToPrismaOptionsWithPagination,
} from "../utils/queryMapper";

export class BookRepository {
  async findAll(query: Record<string, any> = {}): Promise<Book[]> {
    const where = mapQueryToPrismaOptions(query);
    return prisma.book.findMany(where);
  }

  async findManyWithPagination(
    query: Record<string, any> = {},
    page: number,
    limit: number
  ): Promise<Book[]> {
    const where = mapQueryToPrismaOptionsWithPagination(query, page, limit);
    return prisma.book.findMany(where);
  }

  async count(query: Record<string, any> = {}): Promise<number> {
    const where = mapQueryToPrismaOptionsWithOutPagination(query);
    return prisma.book.count(where);
  }

  async create(data: Book): Promise<Book> {
    return prisma.book.create({ data });
  }
}
