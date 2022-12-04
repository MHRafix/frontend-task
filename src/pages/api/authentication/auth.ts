// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { generateToken } from "../../../middleware/generateToken";

type Data = {
  user_email: string;
  success: string;
  token: string;
};

type IUser = {
  user_email: string;
  user_password: string;
};

const handler = nc();

handler.post(
  async (
    req: NextApiRequest,
    res: NextApiResponse<Data | { error: string }>
  ) => {
    const userInfo: IUser = {
      user_email: "john.doe@gmail.com",
      user_password: "johndoe123",
    };

    const { user_email, user_password }: IUser = req.body;

    if (
      userInfo.user_email === user_email &&
      userInfo.user_password === user_password
    ) {
      // generate jwt token here
      const token: string = generateToken(user_email);
      res.status(200).json({
        token,
        user_email: userInfo.user_email,
        success: "Login successful!",
      });
    } else {
      res.status(202).json({ error: "Invalid email and password!" });
    }
  }
);

export default handler;
