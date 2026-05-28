import express from "express";
import carController from "../controllers/carController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Rotas públicas
router.get("/", carController.getAllCars);

router.get("/available/count", carController.countAvailableCars);
router.get("/available", carController.getAvailableCars);
router.get("/brand/:brand", carController.getCarsByBrand);
router.get("/price/:min/:max", carController.getCarsByPriceRange);
router.get("/plate/:plate", carController.getCarByPlate);

router.get("/:id", carController.getCarById);

// Rotas protegidas para admin
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  carController.createCar
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  carController.updateCar
);

router.patch(
  "/:id/availability",
  authMiddleware,
  adminMiddleware,
  carController.updateAvailability
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  carController.deleteCar
);

export default router;