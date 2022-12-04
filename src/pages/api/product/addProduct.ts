// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../hooks/db";
import Product from "../../../model/Product";

const handler = nc();

handler.post(
  async (
    req: NextApiRequest,
    res: NextApiResponse<{ success: string } | { error: string }>
  ) => {
    await db.connect();
    if (req.body) {
      // create product
      const newProduct = new Product(req.body);
      const added = await newProduct.save();
      await db.disconnect();

      // conditionaly send response
      if (added) {
        res.status(201).json({ success: "Product added successfully!" });
      } else {
        res.json({ error: "Opps, something wrong!" });
      }
    } else {
      res.json({ error: "Please check your internet!" });
    }
  }
);

export default handler;
