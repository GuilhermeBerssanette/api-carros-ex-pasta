import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de loja de venda de carros funcionando" });
});

app.use("/users", userRoutes);
app.use("/cars", carRoutes);
app.use("/sales", saleRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.log("Erro ao iniciar o servidor:", error.message);
  }
};

startServer();
