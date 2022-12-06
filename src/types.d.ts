// product interface
interface IProduct {
  _id?: string;
  title: string;
  slug: string;
  thumbnail?: string;
  regular_price: number;
  sale_price: number;
  short_desc: string;
  desc: string;
}

interface Column {
  id: string;
  label: string;
}

interface Data {
  user_email: string;
  success: string;
  accessToken: string;
  refreshToken: string;
}

type IUser = {
  user_email: string;
  user_password: string;
};
