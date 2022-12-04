// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../hooks/db";
import Product from "../../../model/Product";

// product interface
interface IProduct {
  title: string;
  slug: string;
  thumbnail?: string;
  regular_price: number;
  sale_price: number;
  short_desc: string;
  desc: string;
}

const handler = nc();

handler.get(
  async (
    req: NextApiRequest,
    res: NextApiResponse<IProduct | { error: string }>
  ) => {
    await db.connect();
    db.connect();
    // all products
    const allProducts: IProduct[] | null = await Product.find({});
    db.disconnect();
    await db.disconnect();

    // conditionaly send response
    if (allProducts) {
      res.status(200).send(allProducts);
    } else {
      res.json({ error: "Opps, something wrong!" });
    }
  }
);

export default handler;
