import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true },
    user_password: { type: String, required: true },
  }
  // { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", productSchema);
export default User;
