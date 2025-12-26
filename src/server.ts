import express, { type Request, type Response } from "express";
import { bookService } from "./services/BookService";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.get("/books", async (_: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  if (books.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }
  res.json(books);
});
