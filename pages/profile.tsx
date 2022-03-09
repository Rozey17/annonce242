import { useRouter } from "next/router";
import axios from "axios";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import { Layout } from "../components/layout/layout";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../utils/context";
const Profile = (props: {
  user: { email: any; username: any };
  ads;
  token;
}) => {
  const router = useRouter();
  const {
    user: { email, username },
    ads,
    token,
  } = props;

  const { logout } = useContext(AuthContext);

  return (
    <Layout>
      <div>
        <div className="text-center text-lg">
          <div className="">
            {`Nom d'utilisateur`} : {username}{" "}
          </div>
          <div className="">Email: {email}</div>
        </div>

        {/* <div className=" text-center mt-8">
          <a className="text-lg">Liste des annonces</a>
          {ads.map((ad) => (
            <ul key={ad.id}>
              <li
                key={ad.id}
                className="flex items-baseline justify-center mt-6 "
              >
                <>
                  <Link href={`/offres/${ad.id}`}>
                    <a className="hover:underline">{ad.title}</a>
                  </Link>
                  <Link href={`/offres/${ad.id}/edit`}>
                    <a className="flex items-baseline ml-4 hover:underline text-indigo-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Modifier
                    </a>
                  </Link>
                  <button
                    className="ml-6 text-red-500"
                    onClick={() => {
                      if (confirm("Êtes-vous sûr de supprimer ?")) {
                        axios
                          .delete(`${process.env.API_URL}/ads/${ad!.id}`, {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          })
                          .then(() => router.push("/profile"));
                      }
                    }}
                  >
                    Supprimer
                  </button>
                </>
              </li>
            </ul>
          ))}
        </div> */}

        <button
          className="flex mt-16 m-auto items-center h-10 px-3 bg-indigo-500 hover:bg-indigo-600 text-white  rounded-lg shadow-lg"
          onClick={logout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          Déconnexion
        </button>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  let user = null;
  let ads = null;
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

  if (cookies?.token) {
    try {
      const { data } = await axios.get(`${process.env.API_URL}/ads/me`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      ads = data;
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
      //   ads,
      //   token,
    },
  };
};

export default Profile;
