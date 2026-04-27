import express from "express";
import saleController from "../controllers/saleController.js";

const router = express.Router();

router.post("/", saleController.createSale);
router.get("/", saleController.getAllSales);

// Rotas específicas precisam vir antes de /:id
router.get("/count", saleController.countSales);
router.get("/user/:userId", saleController.getSalesByUser);
router.get("/car/:carId", saleController.getSalesByCar);
router.get("/value/:min/:max", saleController.getSalesByValueRange);
router.get("/date/:date", saleController.getSalesByDate);

router.get("/:id", saleController.getSaleById);
router.put("/:id", saleController.updateSale);
router.patch("/:id/status", saleController.updateSaleStatus);
router.delete("/:id", saleController.deleteSale);

export default router;
