import type { Member } from "../generated/prisma/client";
import { prisma } from "../lib/Prisma";
import {
  mapQueryToPrismaOptions,
  mapQueryToPrismaOptionsWithOutPagination,
  mapQueryToPrismaOptionsWithPagination,
} from "../utils/queryMapper";

export class MemberRepository {
  async findAll(query: Record<string, any> = {}): Promise<Member[]> {
    const where = mapQueryToPrismaOptions(query);
    return prisma.member.findMany(where);
  }

  async findManyWithPagination(
    query: Record<string, any> = {},
    page: number,
    limit: number
  ): Promise<Member[]> {
    const where = mapQueryToPrismaOptionsWithPagination(query, page, limit);
    return prisma.member.findMany(where);
  }

  async count(query: Record<string, any> = {}): Promise<number> {
    const where = mapQueryToPrismaOptionsWithOutPagination(query);
    return prisma.member.count(where);
  }

  async create(data: Member): Promise<Member> {
    return prisma.member.create({ data });
  }
}
