import Cookies from "js-cookie";
import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import LayoutContainer from "./components/common/Layout/LayoutContainer";

const AllProducts: NextPage = () => {
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
      <h1>allProducts</h1>
    </LayoutContainer>
  );
};

export default AllProducts;
