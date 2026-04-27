import saleService from "../services/saleService.js";

const createSale = async (req, res, next) => {
  try {
    const sale = await saleService.createSale(req.body);
    res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const sales = await saleService.getAllSales();
    res.json(sales);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const sale = await saleService.getSaleById(req.params.id);
    res.json(sale);
  } catch (error) {
    next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const sale = await saleService.updateSale(req.params.id, req.body);
    res.json(sale);
  } catch (error) {
    next(error);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const sale = await saleService.deleteSale(req.params.id);
    res.json({ message: "Venda deletada com sucesso", sale });
  } catch (error) {
    next(error);
  }
};

const getSalesByUser = async (req, res, next) => {
  try {
    const sales = await saleService.getSalesByUser(req.params.userId);
    res.json(sales);
  } catch (error) {
    next(error);
  }
};

const getSalesByCar = async (req, res, next) => {
  try {
    const sales = await saleService.getSalesByCar(req.params.carId);
    res.json(sales);
  } catch (error) {
    next(error);
  }
};

const updateSaleStatus = async (req, res, next) => {
  try {
    const sale = await saleService.updateSaleStatus(req.params.id, req.body.status);
    res.json(sale);
  } catch (error) {
    next(error);
  }
};

const getSalesByValueRange = async (req, res, next) => {
  try {
    const sales = await saleService.getSalesByValueRange(req.params.min, req.params.max);
    res.json(sales);
  } catch (error) {
    next(error);
  }
};

const getSalesByDate = async (req, res, next) => {
  try {
    const sales = await saleService.getSalesByDate(req.params.date);
    res.json(sales);
  } catch (error) {
    next(error);
  }
};

const countSales = async (req, res, next) => {
  try {
    const total = await saleService.countSales();
    res.json({ total });
  } catch (error) {
    next(error);
  }
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
