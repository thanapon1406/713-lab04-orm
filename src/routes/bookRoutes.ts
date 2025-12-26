import { Router, type Request, type Response } from "express";
import { bookService } from "../services/BookService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks(req.query as Record<string, any>);
  if (books.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }
  res.json(books);
});

export default router;
