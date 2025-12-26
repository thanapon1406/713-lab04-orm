import type { Member } from "../generated/prisma/client";
import { prisma } from "../lib/Prisma";

export class MemberRepository {
  async findAll(query: Record<string, any> = {}): Promise<Member[]> {
    const where: Record<string, any> = {};
    Object.keys(query).forEach((key) => {
      if (query[key] !== undefined) {
        where[key] =
          typeof query[key] === "string"
            ? { contains: query[key], mode: "insensitive" }
            : query[key];
      }
    });

    return prisma.member.findMany({ where });
  }
  async create(data: Member): Promise<Member> {
    return prisma.member.create({ data });
  }
}
