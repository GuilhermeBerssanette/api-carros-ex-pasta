import carService from "../services/carService.js";

const createCar = async (req, res, next) => {
  try {
    const car = await carService.createCar(req.body);

    res.status(201).json({
      message: "Carro criado com sucesso",
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCars = async (req, res, next) => {
  try {
    const cars = await carService.getAllCars();

    res.status(200).json({
      message: "Carros encontrados com sucesso",
      total: cars.length,
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

const getCarById = async (req, res, next) => {
  try {
    const car = await carService.getCarById(req.params.id);

    res.status(200).json({
      message: "Carro encontrado com sucesso",
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const car = await carService.updateCar(req.params.id, req.body);

    res.status(200).json({
      message: "Carro atualizado com sucesso",
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const car = await carService.deleteCar(req.params.id);

    res.status(200).json({
      message: "Carro deletado com sucesso",
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

const getCarsByBrand = async (req, res, next) => {
  try {
    const cars = await carService.getCarsByBrand(req.params.brand);

    res.status(200).json({
      message: "Carros encontrados por marca com sucesso",
      total: cars.length,
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

const getAvailableCars = async (req, res, next) => {
  try {
    const cars = await carService.getAvailableCars();

    res.status(200).json({
      message: "Carros disponíveis encontrados com sucesso",
      total: cars.length,
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

const updateAvailability = async (req, res, next) => {
  try {
    const car = await carService.updateAvailability(
      req.params.id,
      req.body.disponivel
    );

    res.status(200).json({
      message: "Disponibilidade do carro atualizada com sucesso",
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

const getCarsByPriceRange = async (req, res, next) => {
  try {
    const cars = await carService.getCarsByPriceRange(
      req.params.min,
      req.params.max
    );

    res.status(200).json({
      message: "Carros encontrados por faixa de preço com sucesso",
      total: cars.length,
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

const getCarByPlate = async (req, res, next) => {
  try {
    const car = await carService.getCarByPlate(req.params.plate);

    res.status(200).json({
      message: "Carro encontrado pela placa com sucesso",
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

const countAvailableCars = async (req, res, next) => {
  try {
    const totalDisponiveis = await carService.countAvailableCars();

    res.status(200).json({
      message: "Quantidade de carros disponíveis encontrada com sucesso",
      totalDisponiveis,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getCarsByBrand,
  getAvailableCars,
  updateAvailability,
  getCarsByPriceRange,
  getCarByPlate,
  countAvailableCars,
};