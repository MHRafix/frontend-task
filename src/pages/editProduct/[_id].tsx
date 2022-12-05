import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import {
  SubmitButton,
  TextAreaField,
  TextField,
} from "../../components/common/Fields/AllFields";
import LayoutContainer from "../../components/common/Layout/LayoutContainer";
import db from "../../hooks/db";
import { useReqSender } from "../../hooks/postReq";
import useImageUploader from "../../hooks/uploadImg";
import Product from "../../model/Product";

const EditProduct: NextPage<{ singleProduct: IProduct }> = ({
  singleProduct,
}) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string>("");
  const router = useRouter();
  console.log(router.query._id);
  // initial vlaue of form
  const initialValues = {
    title: singleProduct.title,
    slug: singleProduct.slug,
    regular_price: singleProduct.regular_price,
    sale_price: singleProduct.sale_price,
    short_desc: singleProduct.short_desc,
    desc: singleProduct.desc,
  };

  // validation schema using formik yup
  const validationSchema = Yup.object({
    title: Yup.string().required("*"),
    slug: Yup.string().required("*"),
    regular_price: Yup.number().min(1).required("*"),
    sale_price: Yup.number(),
    short_desc: Yup.string().max(50),
    desc: Yup.string().max(250),
  });

  // send req
  const { imgUpload } = useImageUploader();
  const { patchReq } = useReqSender();

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

      patchReq({
        reqData: values,
        resetForm,
        setProcessing,
        endPoint: `product/update/${router.query}`,
      });
    }
  };
  return (
    <LayoutContainer title="Edit product">
      <Box
        sx={{
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
                fontSize: { xs: 20, md: 25 },
                fontWeight: 700,
                margin: { xs: "10px 0px", md: "20px 0px" },
                fontFamily: "Poppins",
              }}
            >
              Edit Product
            </Typography>
            <Box
              sx={{
                display: { xs: "block", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <TextField type="text" name="title" label="Product title" />
              <TextField type="text" name="slug" label="Product slug" />
            </Box>

            <Box
              sx={{
                display: { xs: "block", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                type="number"
                name="regular_price"
                label="Regular price"
              />
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
            {singleProduct.thumbnail && (
              <Image
                src={singleProduct.thumbnail}
                alt="thumbnail"
                width={40}
                height={40}
                style={{
                  borderRadius: "100px",
                }}
              />
            )}
            <TextAreaField
              type="text"
              name="short_desc"
              label="Short description"
            />
            <TextAreaField type="text" name="desc" label="Description" />

            <SubmitButton processing={processing}>Update Product</SubmitButton>
          </Form>
        </Formik>
      </Box>
    </LayoutContainer>
  );
};

export default EditProduct;

export async function getServerSideProps({
  params,
}: {
  params: { _id: string };
}) {
  db.connect();

  // all products
  const singleProduct: IProduct | null = await Product.findOne({
    _id: params._id,
  });

  db.disconnect();

  return { props: { singleProduct } };
}
