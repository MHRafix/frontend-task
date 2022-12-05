import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const TableData: React.FC<{ products: IProduct[] }> = ({ products }) => {
  return (
    <>
      {products?.map((product: IProduct, idx: number) => (
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
              // onClick={() =>
              // 	handleDelete(
              // 		products,
              // 		setProducts,
              // 		product._id,
              // 		`product/delete/${product._id}`
              // 	)
              // }
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
    </>
  );
};

export default TableData;
