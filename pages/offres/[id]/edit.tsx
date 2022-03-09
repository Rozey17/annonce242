import * as React from "react";
import { GetServerSideProps } from "next";
import { Layout } from "@components/layout/layout";
import { UpdateAdForm } from "@components/ads/updateAdForm";
import axios from "axios";
import nookies from "nookies";

const EditPage = ({ token, ad }) => {
  if (!ad) {
    return (
      <Layout>
        <h1> {`Pas d'annonce trouvée`}</h1>
      </Layout>
    );
  }
  return (
    <Layout>
      {/* <UpdateAdForm /> */}
      <UpdateAdForm token={token} />
    </Layout>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const id = ctx.params.id;
//   let ad = null;
//   try {
//     const { data } = await axios.get(`${process.env.API_URL}/ads/${id}`, {});
//     ad = data;
//   } catch (e) {
//     console.log(e);
//   }

//   return {
//     props: {
//       ad,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  let user = null;

  if (cookies?.token) {
    try {
      const { data } = await axios.get(`${process.env.API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  const id = ctx.params.id;
  let ad = null;
  let token = "";
  if (cookies?.token) {
    try {
      const { data } = await axios.get(`${process.env.API_URL}/ads/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      ad = data;
      token = cookies.token;
    } catch (e) {
      console.log(e);
    }
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };
  }

  return {
    props: {
      user,
      token,
      ad,
    },
  };
};

export default EditPage;
