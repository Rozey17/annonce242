import Head from "next/head";
import React, { FC, ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

interface Props {
  children?: ReactNode;
  title?: string;
}

export const Layout: FC<Props> = ({ children, title }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Annonce 242",
};
