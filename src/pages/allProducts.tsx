import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import LayoutContainer from "../components/common/Layout/LayoutContainer";
import db from "../hooks/db";
import Product from "../model/Product";

const AllProducts: NextPage<{ allProducts: IProduct[] | any[] }> = ({
  allProducts,
}) => {
  // all products state
  // const [products, setProducts] = useState<IProduct[]>(allProducts);

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

  console.log(allProducts);
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
        {/* {allProducts?.map((product: IProduct, idx: number) => (
          <TableData key={idx} product={product} />
        ))} */}
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
