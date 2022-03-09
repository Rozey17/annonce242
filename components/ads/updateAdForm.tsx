import { useRouter } from "next/dist/client/router";
import { Formik, Form, Field } from "formik";
import { string, object } from "yup";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

async function uploadImage(image: File) {
  const formData = new FormData();
  formData.append("files", image);
  const res = await fetch(`${process.env.API_URL}/upload`, {
    method: "POST",
    body: formData,
  });
}

const phoneRegEx =
  /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

export const UpdateAdForm = ({ token }) => {
  // export const UpdateAdForm = () => {
  const router = useRouter();

  const id = router.query.id as string;

  const [data, setData] = useState(null);
  const [adSubCategories, setAdSubCategories] = useState([]);
  useEffect(() => {
    fetch(`${process.env.API_URL}/ads/${id}`).then(async (res) =>
      setData(await res.json())
    );
  }, [id]);
  useEffect(() => {
    fetch(`${process.env.API_URL}/ad-sub-categories`).then(async (res) =>
      setAdSubCategories(await res.json())
    );
  }, []);
  const validationSchema = object().shape({
    title: string()
      .required("Le nom est obligatoire")
      .min(2, "Le nom trop court")
      .max(100, "Le nom trop long"),
    ad_sub_category: string().required("La catégorie est obligatoire"),
    image: string().min(1, "Le lien trop court"),
    description: string()
      .required("obligatoire")
      .min(10, "min 10 caractères")
      .max(300),
    phone: string()
      // .required("obligatoire")
      .matches(phoneRegEx, "Numéro de téléphone invalide"),
    // .nullable(),
  });

  if (data) {
    const ad = data;
    const initialValues = {
      ad_sub_category: ad!.ad_sub_category.id,
      description: ad!.description,
      image: ad!.image,
      title: ad!.title,
      phone: ad!.phone,
    };
    return (
      <Formik
        enableReinitialize
        validateOnChange
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (input) => {
          try {
            await axios
              .put(`${process.env.API_URL}/ads/${id}`, input, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                router.push(`/offres/${res.data.id}`);
                console.log(res.data);
              });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        {({
          touched,
          isSubmitting,
          errors,
          handleBlur,
          handleChange,
          values,
          handleSubmit,
          setFieldValue,
          submitForm,
          isValid,
          dirty,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div className="container justify-center max-w-md p-10 my-auto mt-4 text-center border-2 border-gray-200 bg-gray-50">
                <div className="flex justify-center text-xl font-semibold text-gray-700">
                  Modifier une annonce
                </div>

                <label className="block mt-6 mb-2 text-gray-600 dark:text-gray-400">
                  Titre
                </label>

                <div>
                  <Field
                    as="input"
                    type="text"
                    className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    name="title"
                    value={values.title}
                    placeholder="Titre de l'offre"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.title && errors.title && (
                    <div className="text-red-500">{errors.title}</div>
                  )}
                </div>
                <div>
                  <label className="block mt-6 mb-2 text-gray-600 dark:text-gray-400">
                    Catégories
                  </label>
                  <Field
                    as="select"
                    className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    id="adSubCategory"
                    name="ad_sub_category"
                    value={values.ad_sub_category}
                    placeholder="Selectionner une catégorie"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option aria-label="None" value="" />

                    {adSubCategories.map((x, index) => (
                      <option key={index} value={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </Field>
                  {touched.ad_sub_category && errors.ad_sub_category && (
                    <div className="text-red-500">{errors.ad_sub_category}</div>
                  )}
                </div>
                <label className="block mt-6 mb-2 text-gray-600 dark:text-gray-400">
                  Description
                </label>

                <div>
                  <Field
                    as="textarea"
                    type="text"
                    className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    id="ad-description"
                    name="description"
                    value={values.description}
                    placeholder="Entrer une description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.description && errors.description && (
                    <div className="text-red-500">{errors.description}</div>
                  )}
                </div>
                <label className="block mt-6 mb-2 text-gray-600 dark:text-gray-400">
                  Contact
                </label>
                <div>
                  <Field
                    as="input"
                    type="text"
                    className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    id="ad-contact"
                    name="phone"
                    value={values.phone}
                    placeholder="Numéro de téléphone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.phone && errors.phone && (
                    <div className="text-red-500">{errors.phone}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="image">
                    <label className="block mb-2 text-gray-600 dark:text-gray-400">
                      Ajouter une image
                    </label>
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="file"
                    // value={ad.image}
                    accept="image/*"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      if (event?.target?.files?.[0]) {
                        const file = event.target.files[0];
                        uploadImage(file).then((res) => {
                          setFieldValue("image", res);
                        });
                      }
                    }}
                  />
                </div>
                <div>
                  <button
                    className="w-full p-2 mt-6 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
                    type="submit"
                    // disabled={!(isValid && dirty)}
                  >
                    {isSubmitting ? "Chargement..." : " Modifier"}
                  </button>{" "}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  } else {
    return null;
  }
};
