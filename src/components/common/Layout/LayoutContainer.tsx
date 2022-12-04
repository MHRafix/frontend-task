import Head from "next/head";
import React from "react";
import MiniDrawer from "../../custom/NavDrawer/Drawer";

const LayoutContainer: React.FC<{
  children: JSX.Element;
  title: string;
}> = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>Dashboard - {title}</title>
        <meta name="description" content="Frontend task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MiniDrawer>{children}</MiniDrawer>
      </main>
    </div>
  );
};

export default LayoutContainer;
