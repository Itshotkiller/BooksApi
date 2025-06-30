import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { AppDataSource } from "./data-source";
import bookRoutes from "./routes/books";
import reviewRoutes from "./routes/reviews";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/books", bookRoutes);
app.use("/", reviewRoutes);

AppDataSource.initialize().then(() => {
    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
