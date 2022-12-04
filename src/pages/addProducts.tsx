import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useReqSender } from "../hooks/postReq";
import useImageUploader from "../hooks/uploadImg";
import {
  SubmitButton,
  TextAreaField,
  TextField,
} from "./components/common/Fields/AllFields";
import LayoutContainer from "./components/common/Layout/LayoutContainer";

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

const AddProducts: NextPage = () => {
  // take user info
  const userCookie: string | undefined = Cookies.get("user_information");
  const user = userCookie && JSON.parse(userCookie);

  useEffect(() => {
    if (!user?.user_email) {
      // redirect to chat
      Router.push("/");
    }
  }, [user?.user_email]);

  const [processing, setProcessing] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<any>("");

  // initial vlaue of form
  const initialValues = {
    title: "",
    slug: "",
    regular_price: 10,
    sale_price: 5,
    short_desc: "",
    desc: "",
  };

  // validation schema using formik yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Required! "),
    slug: Yup.string().required("Required! "),
    regular_price: Yup.number().min(1).required("Required!"),
    sale_price: Yup.number(),
    short_desc: Yup.string().max(50),
    desc: Yup.string().max(250),
  });

  // send req
  const { imgUpload } = useImageUploader();
  const { sendReq } = useReqSender();

  // on submit function here
  const onSubmit = async (
    values: IProduct,
    { resetForm }: { resetForm: () => void }
  ) => {
    setProcessing((state: boolean) => !state);
    if (thumbnail && values) {
      const imageUrl: string | undefined = await imgUpload(thumbnail);

      // push to values
      values.thumbnail = imageUrl;

      sendReq({
        reqData: values,
        resetForm,
        setProcessing,
        endPoint: "product/addProduct",
      });
    }
  };

  return (
    <LayoutContainer title="Add products">
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form
            style={{
              width: "90%",
              background: "#f1f1f1",
              padding: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: 25,
                fontWeight: 700,
                margin: "20px 0px",
                fontFamily: "Poppins",
              }}
            >
              Create New Product
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField type="text" name="title" label="Product title" />
              &nbsp; &nbsp;
              <TextField type="text" name="slug" label="Product slug" />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                type="number"
                name="regular_price"
                label="Regular price"
              />
              &nbsp; &nbsp;
              <TextField type="number" name="sale_price" label="Sale price" />
            </Box>

            <input
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid rgb(51 51 51 / 20%)",
                borderRadius: "2px",
                fontSize: "16px",
                outline: "none",
                margin: "5px 0px",
                fontFamily: "Poppins",
                background: "#fff",
              }}
              type="file"
              id="file"
              accept="image/*"
              onChange={(e: any) => setThumbnail(e.target.files[0])}
              required
            />
            <TextAreaField
              type="text"
              name="short_desc"
              label="Short description"
            />
            <TextAreaField type="text" name="desc" label="Description" />

            <SubmitButton processing={processing}>Create Product</SubmitButton>
          </Form>
        </Formik>
      </Box>
    </LayoutContainer>
  );
};

export default AddProducts;
