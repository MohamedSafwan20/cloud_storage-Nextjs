import type { NextPage } from "next";
import Head from "next/head";
import SideNavbar from "./SideNavbar/SideNavbar";

const Root: NextPage = ({ children }) => {
  return (
    <>
      <Head>
        <title>Cloud Storage</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SideNavbar />
      <main className="lg:ml-[72px] md:ml-0 w-[100vw]">{children}</main>
    </>
  );
};

export default Root;
