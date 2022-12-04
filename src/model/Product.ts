import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    thumbnail: { type: String, required: true },
    regular_price: { type: Number },
    sale_price: { type: Number },
    short_desc: { type: String },
    desc: { type: String },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
