import { Router, type Request, type Response } from "express";
import { historyService } from "../services/HistoryService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const histories = await historyService.getAllHistorys(
    req.query as Record<string, any>
  );
  if (histories.length === 0) {
    return res.status(404).json({ message: "No histories found" });
  }
  res.json(histories);
});

router.get("/paginated", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = await historyService.getAllHistorysWithPagination(
    page,
    limit,
    req.query as Record<string, any>
  );

  if (result.data.length === 0) {
    return res.status(404).json({ message: "No histories found" });
  }

  res.setHeader("x-total-count", result.total.toString());
  res.json(result);
});

export default router;
