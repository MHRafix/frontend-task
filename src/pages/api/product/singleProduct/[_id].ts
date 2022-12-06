// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../../hooks/db";
import { isAuthentic } from "../../../../middleware/generateToken";
import Product from "../../../../model/Product";

const handler = nc();

handler.get(
  isAuthentic,
  async (req: NextApiRequest, res: NextApiResponse<IProduct | [{}]>) => {
    await db.connect();

    // all products
    const product: IProduct | null = await Product.findOne({ _id: req.query });

    await db.disconnect();

    // conditionaly send response
    if (product !== null) {
      res.status(200).json(product);
    } else {
      res.json([{}]);
    }
  }
);

export default handler;
