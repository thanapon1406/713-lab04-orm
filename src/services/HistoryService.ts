import type { History } from "../generated/prisma/client";
import { HistoryRepository } from "../repositories/HistoryRepository";

export class HistoryService {
  constructor(private historyRepository: HistoryRepository) {}

  async getAllHistorys(query: Record<string, any> = {}): Promise<History[]> {
    const historys = await this.historyRepository.findAll(query);
    return historys;
  }
}

// Export singleton instance
const historyRepository = new HistoryRepository();
export const historyService = new HistoryService(historyRepository);
