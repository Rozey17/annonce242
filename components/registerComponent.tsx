import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Field, Formik } from "formik";
import { string, object } from "yup";
const RegisterComponent = () => {
  // const [loading, setLoading] = useState(false);

  const router = useRouter();
  // const [userData, setUserData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     await axios.post("/api/register", userData);
  //     router.replace("/profile");
  //   } catch (err) {
  //     console.log(err.response.data);
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  // };

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const validationSchema = object().shape({
    username: string()
      .required("Ce champ est obligatoire")
      .min(6, "min 6 caractères")
      .max(30, "max 30 caractères"),
    email: string()
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
          await axios.post("/api/register", input);
          router.replace("/profile");
        } catch (err) {
          console.log(err.response.data);
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
        <div className="flex justify-center mt-8 ">
          <div className="container my-auto max-w-md border-2 border-gray-200 p-3 bg-gray-50">
            <div className="text-center my-6">
              <h1 className="text-3xl font-semibold text-gray-700">
                Création de compte
              </h1>
              <p className="text-gray-500">{`S'enregistrer`}</p>
            </div>

            <div className="m-6">
              <form className="mb-4" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                    {`Nom d'utilisateur`}
                  </label>
                  <Field
                    value={values.username || undefined}
                    as="input"
                    type="text"
                    name="username"
                    onChange={(e) => handleChange(e)}
                    placeholder="Votre nom d'utilisateur"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                  {touched.username && errors.username && (
                    <div className="text-red-500">{errors.username}</div>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                    Email
                  </label>
                  <Field
                    value={values.email || undefined}
                    as="input"
                    type="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    placeholder="Votre email"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Mot de passe
                    </label>
                  </div>
                  <Field
                    value={values.password || undefined}
                    as="input"
                    type="password"
                    name="password"
                    placeholder="Votre mot de passe"
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
                    {isSubmitting ? "Chargement..." : "Créer compte"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegisterComponent;
