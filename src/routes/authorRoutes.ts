import { Router, type Request, type Response } from "express";
import { authorService } from "../services/AuthorService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const authors = await authorService.getAllAuthors(
    req.query as Record<string, any>
  );
  if (authors.length === 0) {
    return res.status(404).json({ message: "No authors found" });
  }
  res.json(authors);
});

export default router;
