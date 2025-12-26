import { Router, type Request, type Response } from "express";
import { memberService } from "../services/MemberService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const members = await memberService.getAllMembers(
    req.query as Record<string, any>
  );
  if (members.length === 0) {
    return res.status(404).json({ message: "No members found" });
  }
  res.json(members);
});

export default router;
