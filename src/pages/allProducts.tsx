import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import LayoutContainer from "../components/common/Layout/LayoutContainer";
import TableData from "../components/custom/Table/TableData";
import db from "../hooks/db.js";
import Product from "../model/Product";

const AllProducts: NextPage<{
  allProducts: IProduct[] | any[];
}> = ({ allProducts }) => {
  const [currentItems, setCurrentItems] = useState<IProduct[]>(allProducts);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);

  useEffect(() => {
    const endOffset = itemOffset + 3;
    setCurrentItems(allProducts?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allProducts?.length / 3));
  }, [itemOffset, allProducts?.length, 3]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 3) % allProducts?.length;

    setItemOffset(newOffset);
  };
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

  const [itemsPerPage, setItemsPerPage] = useState(3);

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

        {allProducts?.length && (
          <TableData products={currentItems} setProducts={setCurrentItems} />
        )}
        {allProducts?.length > itemsPerPage && (
          <div className="pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              // renderOnZeroPageCount={null}
            />
          </div>
        )}
      </Box>
    </LayoutContainer>
  );
};

export default AllProducts;

export async function getServerSideProps({
  params,
}: {
  params: { page: number };
}) {
  await db.connect();
  // all products
  const allProducts: IProduct[] | any[] = await Product.find({});
  // const allProducts: IProduct[] = await fetcher('product/allProducts');

  await db.disconnect();

  return { props: { allProducts } };
}
