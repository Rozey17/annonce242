import { CreateAdForm } from "@components/ads/createAdForm";
import { Layout } from "@components/layout/layout";
import axios from "axios";
import { GetServerSideProps } from "next";
import nookies from "nookies";
export default function CreateAd({ token }) {
  return (
    <Layout>
      <CreateAdForm token={token} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  let user = null;
  let token = "";
  if (cookies?.token) {
    try {
      const { data } = await axios.get(`${process.env.API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      user = data;
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
    },
  };
};
