// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../hooks/db";
import { isAuthentic } from "../../../middleware/generateToken";
import Product from "../../../model/Product";

const handler = nc();

handler.get(
  isAuthentic,
  async (
    req: NextApiRequest,
    res: NextApiResponse<IProduct[] | { error: string }>
  ) => {
    await db.connect();

    // all products
    const allProducts: IProduct[] = await Product.find({});

    await db.disconnect();

    // conditionaly send response
    if (allProducts?.length) {
      res.status(200).json(allProducts);
    } else {
      res.json({ error: "Opps, something wrong!" });
    }
  }
);

export default handler;
