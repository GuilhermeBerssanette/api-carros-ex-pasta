import express from "express";
import carController from "../controllers/carController.js";

const router = express.Router();

router.post("/", carController.createCar);
router.get("/", carController.getAllCars);

// Rotas específicas precisam vir antes de /:id
router.get("/available/count", carController.countAvailableCars);
router.get("/available", carController.getAvailableCars);
router.get("/brand/:brand", carController.getCarsByBrand);
router.get("/price/:min/:max", carController.getCarsByPriceRange);
router.get("/plate/:plate", carController.getCarByPlate);

router.get("/:id", carController.getCarById);
router.put("/:id", carController.updateCar);
router.patch("/:id/availability", carController.updateAvailability);
router.delete("/:id", carController.deleteCar);

export default router;
