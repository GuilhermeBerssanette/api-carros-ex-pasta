import express from "express";
import saleController from "../controllers/saleController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Usuário logado cria uma venda
router.post(
  "/",
  authMiddleware,
  saleController.createSale
);

// Usuário logado vê as próprias vendas
router.get(
  "/my",
  authMiddleware,
  saleController.getMySales
);

// Rotas de admin
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  saleController.getAllSales
);

router.get(
  "/count",
  authMiddleware,
  adminMiddleware,
  saleController.countSales
);

router.get(
  "/user/:userId",
  authMiddleware,
  adminMiddleware,
  saleController.getSalesByUser
);

router.get(
  "/car/:carId",
  authMiddleware,
  adminMiddleware,
  saleController.getSalesByCar
);

router.get(
  "/value/:min/:max",
  authMiddleware,
  adminMiddleware,
  saleController.getSalesByValueRange
);

router.get(
  "/date/:date",
  authMiddleware,
  adminMiddleware,
  saleController.getSalesByDate
);

// Rota protegida para usuário logado
router.get(
  "/:id",
  authMiddleware,
  saleController.getSaleById
);

// Rotas de admin
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  saleController.updateSale
);

router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  saleController.updateSaleStatus
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  saleController.deleteSale
);

export default router;