import type { History } from "../generated/prisma/client";
import { HistoryRepository } from "../repositories/HistoryRepository";

export class HistoryService {
  constructor(private historyRepository: HistoryRepository) {}

  async getAllHistorys(query: Record<string, any> = {}): Promise<History[]> {
    const historys = await this.historyRepository.findAll(query);
    return historys;
  }

  async getAllHistorysWithPagination(
    page: number,
    limit: number,
    query: Record<string, any> = {}
  ): Promise<{ data: History[]; total: number; page: number; limit: number }> {
    const total = await this.historyRepository.count(query);
    const data = await this.historyRepository.findManyWithPagination(
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
const historyRepository = new HistoryRepository();
export const historyService = new HistoryService(historyRepository);
