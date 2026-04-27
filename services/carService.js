import Car from "../models/Car.js";
import Sale from "../models/Sale.js";

const createCar = async (data) => {
  const { modelo, marca, ano, cor, preco, placa, disponivel } = data;

  if (!modelo || !marca || !ano || !cor || preco === undefined || !placa) {
    const error = new Error("Modelo, marca, ano, cor, preco e placa são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const carExists = await Car.findOne({ placa: placa.toUpperCase() });

  if (carExists) {
    const error = new Error("Já existe um carro cadastrado com essa placa");
    error.statusCode = 400;
    throw error;
  }

  return Car.create({
    modelo,
    marca,
    ano,
    cor,
    preco,
    placa,
    disponivel: disponivel ?? true,
  });
};

const getAllCars = async () => {
  return Car.find();
};

const getCarById = async (id) => {
  const car = await Car.findById(id);

  if (!car) {
    const error = new Error("Carro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return car;
};

const updateCar = async (id, data) => {
  const car = await Car.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!car) {
    const error = new Error("Carro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return car;
};

const deleteCar = async (id) => {
  const salesCount = await Sale.countDocuments({ carId: id });

  if (salesCount > 0) {
    const error = new Error("Não é possível deletar um carro que possui vendas cadastradas");
    error.statusCode = 400;
    throw error;
  }

  const car = await Car.findByIdAndDelete(id);

  if (!car) {
    const error = new Error("Carro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return car;
};

const getCarsByBrand = async (brand) => {
  return Car.find({ marca: { $regex: `^${brand}$`, $options: "i" } });
};

const getAvailableCars = async () => {
  return Car.find({ disponivel: true });
};

const updateAvailability = async (id, disponivel) => {
  if (disponivel === undefined) {
    const error = new Error("O campo disponivel é obrigatório");
    error.statusCode = 400;
    throw error;
  }

  const car = await Car.findByIdAndUpdate(
    id,
    { disponivel },
    { new: true, runValidators: true }
  );

  if (!car) {
    const error = new Error("Carro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return car;
};

const getCarsByPriceRange = async (min, max) => {
  const minValue = Number(min);
  const maxValue = Number(max);

  if (Number.isNaN(minValue) || Number.isNaN(maxValue)) {
    const error = new Error("Os valores min e max precisam ser números");
    error.statusCode = 400;
    throw error;
  }

  return Car.find({
    preco: { $gte: minValue, $lte: maxValue },
  });
};

const getCarByPlate = async (plate) => {
  const car = await Car.findOne({ placa: plate.toUpperCase() });

  if (!car) {
    const error = new Error("Carro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return car;
};

const countAvailableCars = async () => {
  return Car.countDocuments({ disponivel: true });
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
