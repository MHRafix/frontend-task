// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../../hooks/db";
import Product from "../../../../model/Product";

const handler = nc();

handler.patch(
  async (
    req: NextApiRequest,
    res: NextApiResponse<{ success: string } | { error: string }>
  ) => {
    const { _id } = req.query;
    await db.connect();
    const updated = await Product.findByIdAndUpdate({ _id }, req.body);
    if (updated) {
      res.status(200).json({ success: "Product updated successfully!" });
    } else {
      res.json({ error: "Opps, something went wrong!" });
    }
  }
);

export default handler;
