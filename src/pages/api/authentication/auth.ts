// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
  generateRefToken,
  generateToken,
} from "../../../middleware/generateToken";

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
      const accessToken: string = generateToken(user_email);
      const refreshToken: string = generateRefToken(user_email);

      res.status(200).json({
        accessToken,
        refreshToken,
        user_email: userInfo.user_email,
        success: "Login successful!",
      });
    } else {
      res.status(202).json({ error: "Invalid email and password!" });
    }
  }
);

export default handler;
