import axios from "axios";
import { GetServerSideProps } from "next";
import { Layout } from "../components/layout/layout";
import LoginComponent from "../components/loginComponent";
import nookies from "nookies";

export default function Auth() {
  return (
    <Layout>
      <div className="mt-10">
        <LoginComponent />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  let user = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get(`${process.env.API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};
