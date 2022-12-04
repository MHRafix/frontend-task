import Cookies from "js-cookie";
import Router from "next/router";
import httpReq from "./axiosInstance";

interface Data {
  user_email: string;
  success: string;
  token: string;
}

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

export const useReqSender = () => {
  const sendReq = async (reqConfig: {
    reqData: { user_email: string; user_password: string } | IProduct;
    resetForm: any;
    setProcessing: (value: boolean) => void;
    endPoint: string;
  }) => {
    const { reqData, resetForm, setProcessing, endPoint } = reqConfig;
    try {
      const data: any = await httpReq.post(`/api/${endPoint}`, reqData);

      // server success
      if (data?.success) {
        alert(data.success);
        Cookies.set("user_information", JSON.stringify(data), {
          expires: 1, // 30 days
          secure: true,
          sameSite: "strict",
          path: "/",
        });

        setProcessing(false);
        resetForm({ values: "" });
        setTimeout(() => {
          Router.push("/allProducts");
        }, 1000);
        alert(data.success);
        // server error
      } else if (data.error) {
        alert(data.error);

        setProcessing(false);
        resetForm({ values: "" });
      }

      // try catch error
    } catch (err: any) {
      alert(err.message);

      setProcessing(false);
      resetForm({ values: "" });
    }
  };
  return { sendReq };
};
