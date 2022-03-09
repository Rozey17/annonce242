import { useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import AuthContext from "../utils/context";
import Link from "next/link";
import { Field, Formik } from "formik";
import { string, object } from "yup";

const LoginComponent = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const initialValues = {
    identifier: "",
    password: "",
  };
  const validationSchema = object().shape({
    identifier: string()
      .required("Ce champ est obligatoire")
      .email("Email invalide"),
    password: string()
      .required("Ce champ est obligatoire")
      .min(6, "min 6 caractères")
      .max(20, "max 20 caractères"),
  });
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (input) => {
        try {
          // await axios.post("/api/login", { ...input });
          await axios.post("/api/login", input);
          router.push("/profile");
        } catch (err) {
          console.log(err.response.data);
          setError(err.response.data.message);
        }
      }}
    >
      {({
        handleChange,
        setFieldValue,
        values,
        isValid,
        dirty,
        handleSubmit,
        errors,
        touched,
        handleBlur,
        isSubmitting,
      }) => (
        <div className="flex justify-center ">
          <div className="container my-auto max-w-md border-2 border-gray-200 p-3 bg-white">
            <div className="text-center my-6">
              <h1 className="text-3xl font-semibold text-gray-700">
                Connexion
              </h1>
              <p className="text-gray-500">Se connecter</p>
            </div>

            <div className="m-6">
              <form className="mb-4" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                    Email
                  </label>
                  <Field
                    as="input"
                    value={values.identifier || undefined}
                    type="email"
                    name="identifier"
                    onChange={(e) => handleChange(e)}
                    placeholder="Votre email"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                  {touched.identifier && errors.identifier && (
                    <div className="text-red-500">{errors.identifier}</div>
                  )}
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Mot de passe
                    </label>
                    {/* <a
                  href="#!"
                  className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
                >
                  Forgot password?
                </a> */}
                  </div>
                  <Field
                    as="input"
                    value={values.password || undefined}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Mot de passe"
                    onChange={(e) => handleChange(e)}
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
                  >
                    {isSubmitting ? "Chargement..." : "Se connecter"}
                  </button>
                </div>
                <div className="text-red-500 text-center">{error}</div>
                <p className="text-sm text-center text-gray-400">
                  Pas de compte ?
                  <Link href="/register">
                    <a className="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline ml-2">
                      {`S'enregistrer`}
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginComponent;
