import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    modelo: {
      type: String,
      required: true,
      trim: true,
    },
    marca: {
      type: String,
      required: true,
      trim: true,
    },
    ano: {
      type: Number,
      required: true,
    },
    cor: {
      type: String,
      required: true,
      trim: true,
    },
    preco: {
      type: Number,
      required: true,
    },
    placa: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    disponivel: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "cars",
    timestamps: true,
  }
);

export default mongoose.model("Car", CarSchema);
