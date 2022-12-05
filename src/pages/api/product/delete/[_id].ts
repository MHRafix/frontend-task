// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../../hooks/db";
import Product from "../../../../model/Product";

const handler = nc();

handler.delete(
  async (
    req: NextApiRequest,
    res: NextApiResponse<{ success: string } | { error: string }>
  ) => {
    const { _id } = req.query;
    await db.connect();
    const deleteProduct = await Product.deleteOne({ _id });
    await db.disconnect();

    if (deleteProduct.acknowledged) {
      res.status(200).json({ success: "Product deleted successfully!" });
    } else {
      res.json({ error: "Opps, something went wrong!" });
    }
  }
);

export default handler;
