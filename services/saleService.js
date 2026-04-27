import Sale from "../models/Sale.js";
import User from "../models/User.js";
import Car from "../models/Car.js";

const createSale = async (data) => {
  const { userId, carId, valorVenda, formaPagamento, dataVenda, status } = data;

  if (!userId || !carId || !formaPagamento) {
    const error = new Error("userId, carId e formaPagamento são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  const car = await Car.findById(carId);

  if (!car) {
    const error = new Error("Carro não encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (!car.disponivel) {
    const error = new Error("Este carro não está disponível para venda");
    error.statusCode = 400;
    throw error;
  }

  const sale = await Sale.create({
    userId,
    carId,
    valorVenda: valorVenda ?? car.preco,
    formaPagamento,
    dataVenda: dataVenda ?? Date.now(),
    status: status ?? "paga",
  });

  car.disponivel = false;
  await car.save();

  return Sale.findById(sale._id).populate("userId").populate("carId");
};

const getAllSales = async () => {
  return Sale.find().populate("userId").populate("carId");
};

const getSaleById = async (id) => {
  const sale = await Sale.findById(id).populate("userId").populate("carId");

  if (!sale) {
    const error = new Error("Venda não encontrada");
    error.statusCode = 404;
    throw error;
  }

  return sale;
};

const updateSale = async (id, data) => {
  const sale = await Sale.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate("userId")
    .populate("carId");

  if (!sale) {
    const error = new Error("Venda não encontrada");
    error.statusCode = 404;
    throw error;
  }

  return sale;
};

const deleteSale = async (id) => {
  const sale = await Sale.findById(id);

  if (!sale) {
    const error = new Error("Venda não encontrada");
    error.statusCode = 404;
    throw error;
  }

  await Sale.findByIdAndDelete(id);

  if (sale.status !== "cancelada") {
    await Car.findByIdAndUpdate(sale.carId, { disponivel: true });
  }

  return sale;
};

const getSalesByUser = async (userId) => {
  return Sale.find({ userId }).populate("userId").populate("carId");
};

const getSalesByCar = async (carId) => {
  return Sale.find({ carId }).populate("userId").populate("carId");
};

const updateSaleStatus = async (id, status) => {
  if (!status) {
    const error = new Error("O campo status é obrigatório");
    error.statusCode = 400;
    throw error;
  }

  const sale = await Sale.findById(id);

  if (!sale) {
    const error = new Error("Venda não encontrada");
    error.statusCode = 404;
    throw error;
  }

  sale.status = status;
  await sale.save();

  if (status === "cancelada") {
    await Car.findByIdAndUpdate(sale.carId, { disponivel: true });
  }

  return Sale.findById(id).populate("userId").populate("carId");
};

const getSalesByValueRange = async (min, max) => {
  const minValue = Number(min);
  const maxValue = Number(max);

  if (Number.isNaN(minValue) || Number.isNaN(maxValue)) {
    const error = new Error("Os valores min e max precisam ser números");
    error.statusCode = 400;
    throw error;
  }

  return Sale.find({
    valorVenda: { $gte: minValue, $lte: maxValue },
  })
    .populate("userId")
    .populate("carId");
};

const getSalesByDate = async (date) => {
  // Se receber apenas um ano, exemplo: /sales/date/2026
  if (/^\d{4}$/.test(date)) {
    const year = Number(date);
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return Sale.find({
      dataVenda: { $gte: startDate, $lt: endDate },
    })
      .populate("userId")
      .populate("carId");
  }

  // Se receber uma data completa, exemplo: /sales/date/2026-04-15
  const startDate = new Date(date);

  if (Number.isNaN(startDate.getTime())) {
    const error = new Error("Data inválida. Use o formato 2026 ou 2026-04-15");
    error.statusCode = 400;
    throw error;
  }

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);

  return Sale.find({
    dataVenda: { $gte: startDate, $lt: endDate },
  })
    .populate("userId")
    .populate("carId");
};

const countSales = async () => {
  return Sale.countDocuments();
};

export default {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  getSalesByUser,
  getSalesByCar,
  updateSaleStatus,
  getSalesByValueRange,
  getSalesByDate,
  countSales,
};
