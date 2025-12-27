import type { Book } from "../generated/prisma/client";
import { prisma } from "../lib/Prisma";
import {
  mapQueryToPrismaOptions,
  mapQueryToPrismaOptionsWithOutPagination,
  mapQueryToPrismaOptionsWithPagination,
  mapQueryToPrismaOptionsWithKeywordSearch,
  mapQueryToPrismaOptionsWithKeywordSearchWithoutPagination,
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

  async findManyWithPaginationAndKeywordByUsingOr(
    query: Record<string, any> = {},
    keyword: string,
    page: number,
    limit: number
  ): Promise<Book[]> {
    const options = mapQueryToPrismaOptionsWithKeywordSearch(
      query,
      keyword,
      ["name", "group"],
      page,
      limit
    );
    return prisma.book.findMany(options);
  }

  async count(query: Record<string, any> = {}): Promise<number> {
    const where = mapQueryToPrismaOptionsWithOutPagination(query);
    return prisma.book.count(where);
  }

  async countWithKeywordByUsingOr(
    query: Record<string, any> = {},
    keyword: string
  ): Promise<number> {
    const options = mapQueryToPrismaOptionsWithKeywordSearchWithoutPagination(
      query,
      keyword,
      ["name", "group"]
    );
    return prisma.book.count(options);
  }

  async create(data: Book): Promise<Book> {
    return prisma.book.create({ data });
  }
}
