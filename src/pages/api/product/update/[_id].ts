// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../../hooks/db";
import Product from "../../../../model/Product";

const handler = nc();

handler.put(
  async (
    req: NextApiRequest,
    res: NextApiResponse<{ success: string } | { error: string }>
  ) => {
    const { _id } = req.query;
    await db.connect();
    let product = await Product.findOne({ _id });
    if (product) {
      product = req.body;
      await product.save();
      await db.disconnect();
      res.status(200).json({ success: "Product update successfully!" });
    } else {
      res.json({ error: "Opps, something went wrong!" });
    }
  }
);

export default handler;
