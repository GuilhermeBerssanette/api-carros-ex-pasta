import saleService from "../services/saleService.js";

const createSale = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const sale = await saleService.createSale(userId, req.body);

    res.status(201).json({
      message: "Venda criada com sucesso",
      data: sale,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const sales = await saleService.getAllSales();

    res.status(200).json({
      message: "Vendas encontradas com sucesso",
      total: sales.length,
      data: sales,
    });
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const sale = await saleService.getSaleById(req.params.id);

    res.status(200).json({
      message: "Venda encontrada com sucesso",
      data: sale,
    });
  } catch (error) {
    next(error);
  }
};

const getMySales = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const sales = await saleService.getSalesByUser(userId);

    res.status(200).json({
      message: "Minhas vendas encontradas com sucesso",
      total: sales.length,
      data: sales,
    });
  } catch (error) {
    next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const sale = await saleService.updateSale(req.params.id, req.body);

    res.status(200).json({
      message: "Venda atualizada com sucesso",
      data: sale,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const sale = await saleService.deleteSale(req.params.id);

    res.status(200).json({
      message: "Venda deletada com sucesso",
      data: sale,
    });
  } catch (error) {
    next(error);
  }
};

const getSalesByUser = async (req, res, next) => {
  try {
    const sales = await saleService.getSalesByUser(req.params.userId);

    res.status(200).json({
      message: "Vendas do usuário encontradas com sucesso",
      total: sales.length,
      data: sales,
    });
  } catch (error) {
    next(error);
  }
};

const getSalesByCar = async (req, res, next) => {
  try {
    const sales = await saleService.getSalesByCar(req.params.carId);

    res.status(200).json({
      message: "Vendas do carro encontradas com sucesso",
      total: sales.length,
      data: sales,
    });
  } catch (error) {
    next(error);
  }
};

const updateSaleStatus = async (req, res, next) => {
  try {
    const sale = await saleService.updateSaleStatus(
      req.params.id,
      req.body.status
    );

    res.status(200).json({
      message: "Status da venda atualizado com sucesso",
      data: sale,
    });
  } catch (error) {
    next(error);
  }
};

const getSalesByValueRange = async (req, res, next) => {
  try {
    const sales = await saleService.getSalesByValueRange(
      req.params.min,
      req.params.max
    );

    res.status(200).json({
      message: "Vendas encontradas por faixa de valor com sucesso",
      total: sales.length,
      data: sales,
    });
  } catch (error) {
    next(error);
  }
};

const getSalesByDate = async (req, res, next) => {
  try {
    const sales = await saleService.getSalesByDate(req.params.date);

    res.status(200).json({
      message: "Vendas encontradas por data com sucesso",
      total: sales.length,
      data: sales,
    });
  } catch (error) {
    next(error);
  }
};

const countSales = async (req, res, next) => {
  try {
    const total = await saleService.countSales();

    res.status(200).json({
      message: "Quantidade de vendas encontrada com sucesso",
      total,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createSale,
  getAllSales,
  getSaleById,
  getMySales,
  updateSale,
  deleteSale,
  getSalesByUser,
  getSalesByCar,
  updateSaleStatus,
  getSalesByValueRange,
  getSalesByDate,
  countSales,
};