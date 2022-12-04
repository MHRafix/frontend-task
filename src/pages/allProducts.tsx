import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { useEffect } from "react";
import LayoutContainer from "../components/common/Layout/LayoutContainer";
import httpReq from "../hooks/axiosInstance";
import db from "../hooks/db";

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

const AllProducts: NextPage<{ allProducts: IProduct[] }> = ({
  allProducts,
}) => {
  const columns: readonly Column[] = [
    { id: "id", label: "Id" },
    { id: "title", label: "Title" },
    {
      id: "price",
      label: "Price",
    },
    {
      id: "image",
      label: "Image",
    },
    {
      id: "actions",
      label: "Actions",
    },
  ];
  // take user info
  const userCookie: string | undefined = Cookies.get("user_information");
  const user = userCookie && JSON.parse(userCookie);

  useEffect(() => {
    if (!user?.user_email) {
      // redirect to chat
      Router.push("/");
    }
  }, [user?.user_email]);

  return (
    <LayoutContainer title="All products">
      <>
        <Box
          sx={{
            width: "700px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            borderBottom: "1px solid #333",
            textAlign: "center",
          }}
        >
          <Box>Id</Box>
          <Box>Title</Box>
          <Box>Price</Box>
          <Box>Thumbnail</Box>
          <Box>Actions</Box>
        </Box>
        <Box>
          {allProducts.map((product: IProduct) => (
            <Box
              key={product.title}
              sx={{
                width: "700px",
                margin: "auto",
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                textAlign: "center",
              }}
            >
              <Box>{product._id?.slice(0, 5)}</Box>
              <Box>{product.title}</Box>
              <Box>{product.regular_price}</Box>
              <Box>
                {product.thumbnail && (
                  <Image
                    src={product?.thumbnail}
                    alt="thumbnail"
                    width={50}
                    height={50}
                  />
                )}
              </Box>
              <Box>Delete | Edit</Box>
            </Box>
          ))}
        </Box>
      </>
    </LayoutContainer>
  );
};

export default AllProducts;

export async function getServerSideProps() {
  db.connect();
  // all products
  // const allProducts: IProduct | null = await Product.findOne({});
  const allProducts = await httpReq.get(
    "http:localhost:3000/api/product/allProducts"
  );
  db.disconnect();

  return { props: { allProducts } };
}
