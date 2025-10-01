import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { errorHandler } from "./app/middlewares/errorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome here in my portfolio",
  });
});

app.use(errorHandler);
app.use(notFound);

export default app;
