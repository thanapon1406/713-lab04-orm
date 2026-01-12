import { Router, type Request, type Response } from "express";
import { bookService } from "../services/BookService";
import multer from "multer";
import { uploadFile } from "../services/UploadFileService";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
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
  res.setHeader("x-total-count", result.total.toString());
  res.json(result);
});

router.get("/search", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const keyword = (req.query.keyword as string) || "";

  const result =
    await bookService.getAllBoooksWithPaginationAndKeywordByUsingOr(
      page,
      limit,
      keyword,
      req.query as Record<string, any>
    );

  if (result.data.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }
  res.setHeader("x-total-count", result.total.toString());
  res.json(result);
});

router.get("/search-with-relations", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const keyword = (req.query.keyword as string) || "";

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required" });
  }

  const result = await bookService.searchBooksWithRelations(
    keyword,
    page,
    limit
  );

  if (result.data.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.setHeader("x-total-count", result.total.toString());
  res.json(result);
});

router.post("/upload", upload.single("file"), async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const bucket = "images";
    const filePath = `uploads`;

    // await uploadFile(bucket, filePath, file);
    const fileKey = await uploadFile(bucket, filePath, file);
    res.status(200).send(fileKey);
  } catch (error) {
    res.status(500).send("Error uploading file.");
  }
});

export default router;
