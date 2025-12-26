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

router.get("/paginated", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = await bookService.getAllBoooksWithPagination(
    page,
    limit,
    req.query as Record<string, any>
  );

  if (result.data.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.json(result);
});

export default router;
