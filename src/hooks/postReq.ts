import Cookies from "js-cookie";
import Router from "next/router";
import httpReq from "./axiosInstance";

export const useReqSender = () => {
  // post req sender
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
        setProcessing(false);
        resetForm({ values: "" });

        if (endPoint === "authentication/auth") {
          Cookies.set("user_information", JSON.stringify(data), {
            expires: 900000, // 15 min
            secure: true,
            sameSite: "strict",
            path: "/",
          });
          setTimeout(() => {
            Router.push("/allProducts");
          }, 1000);
        }

        alert(data.success);
        // server error
      } else if (data.error) {
        setProcessing(false);
        resetForm({ values: "" });
        alert(data.error);
      }

      // try catch error
    } catch (err: any) {
      setProcessing(false);
      resetForm({ values: "" });
      alert(err.message);
    }
  };

  // update req sender
  const patchReq = async (reqConfig: {
    reqData: { user_email: string; user_password: string } | IProduct;
    resetForm: any;
    setProcessing: (value: boolean) => void;
    endPoint: string;
  }) => {
    const { reqData, resetForm, setProcessing, endPoint } = reqConfig;
    console.log(reqData, endPoint);
    try {
      const data: any = await httpReq.update(`/api/${endPoint}`, reqData);

      // server success
      if (data?.success) {
        setProcessing(false);
        resetForm({ values: "" });
        Router.push("/allProducts");

        // server error
      } else if (data.error) {
        setProcessing(false);
        resetForm({ values: "" });
        alert(data.error);
      }

      // try catch error
    } catch (err: any) {
      setProcessing(false);
      resetForm({ values: "" });
      alert(err.message);
    }
  };

  return { sendReq, patchReq };
};
