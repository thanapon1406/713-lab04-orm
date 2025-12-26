import type { History } from "../generated/prisma/client";
import { prisma } from "../lib/Prisma";

export class HistoryRepository {
  async findAll(query: Record<string, any> = {}): Promise<History[]> {
    const where: Record<string, any> = {};
    Object.keys(query).forEach((key) => {
      if (query[key] !== undefined) {
        where[key] =
          typeof query[key] === "string"
            ? { contains: query[key], mode: "insensitive" }
            : query[key];
      }
    });

    return prisma.history.findMany({ where });
  }
  async create(data: History): Promise<History> {
    return prisma.history.create({ data });
  }
}
