import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import LayoutContainer from "../components/common/Layout/LayoutContainer";
import db from "../hooks/db";
import { handleDelete } from "../hooks/deleteReq";
import Product from "../model/Product";

const AllProducts: NextPage<{ allProducts: IProduct[] }> = ({
  allProducts,
}) => {
  // all products state
  const [products, setProducts] = useState<IProduct[]>(allProducts);

  // take user info
  const userCookie: string | undefined = Cookies.get("user_information");
  const user = userCookie && JSON.parse(userCookie);

  // prevent fake user
  useEffect(() => {
    if (!user?.user_email) {
      // redirect to chat
      Router.push("/");
    }
  }, [user?.user_email]);

  return (
    <LayoutContainer title="All products">
      <Box>
        <Box
          sx={{
            width: "700px",
            margin: "auto",
            padding: "5px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #333",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          <Box
            sx={{
              width: "20%",
              textAlign: "center",
            }}
          >
            Id
          </Box>
          <Box
            sx={{
              width: "20%",
              textAlign: "center",
            }}
          >
            Title
          </Box>
          <Box
            sx={{
              width: "20%",
              textAlign: "center",
            }}
          >
            Price
          </Box>
          <Box
            sx={{
              width: "20%",
              textAlign: "center",
            }}
          >
            Thumbnail
          </Box>
          <Box
            sx={{
              width: "20%",
              textAlign: "center",
            }}
          >
            Actions
          </Box>
        </Box>
        {allProducts?.length ? (
          <Box>
            {allProducts?.map((product: IProduct, idx: number) => (
              <Box
                key={idx}
                sx={{
                  width: "700px",
                  margin: "15px auto",
                  background: "#f1f1f1",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  {product._id?.slice(0, 5)}
                </Box>
                <Box
                  sx={{
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  {product.title}
                </Box>
                <Box
                  sx={{
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  ${product.regular_price}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  {product.thumbnail && (
                    <Image
                      src={product?.thumbnail}
                      alt="thumbnail"
                      width={50}
                      height={50}
                      style={{
                        borderRadius: "100px",
                      }}
                    />
                  )}
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      handleDelete(
                        products,
                        setProducts,
                        product._id,
                        `product/delete/${product._id}`
                      )
                    }
                  >
                    <MdDelete size={20} />
                  </Button>
                  &nbsp;
                  <Link href={`/editProduct/${product._id}`} passHref>
                    <Button variant="contained" color="secondary">
                      <AiFillEdit size={20} />
                    </Button>
                  </Link>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              width: "700px",
              margin: "15px auto",
              padding: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "red",
            }}
          >
            No products found!
          </Box>
        )}
      </Box>
    </LayoutContainer>
  );
};

export default AllProducts;

export async function getServerSideProps() {
  await db.connect();
  // // all products
  const allProducts: IProduct[] | any[] = await Product.find({});
  // const allProducts: IProduct[] = await fetcher('product/allProducts');

  await db.disconnect();

  return { props: { allProducts } };
}
