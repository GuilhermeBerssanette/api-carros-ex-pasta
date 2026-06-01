import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    valorVenda: {
      type: Number,
      required: true,
    },
    formaPagamento: {
      type: String,
      required: true,
      enum: ["pix", "cartao", "boleto", "dinheiro", "financiamento"],
    },
    dataVenda: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pendente", "paga", "cancelada"],
      default: "paga",
    },
  },
  {
    collection: "sales",
    timestamps: true,
  }
);

export default mongoose.model("Sale", SaleSchema);
