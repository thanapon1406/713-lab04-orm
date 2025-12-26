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

export default router;
