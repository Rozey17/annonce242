import { Formik, Form, Field } from "formik";
import { string, object, mixed } from "yup";
import Link from "next/link";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const initialValues = {
  ad_sub_category: "",
  phone: "",
  title: "",
  description: "",
  image: "",
};

const validationSchema = object().shape({
  title: string()
    .required("Le nom est obligatoire")
    .min(2, "Le nom trop court")
    .max(50, "Le nom trop long"),
  ad_sub_category: string().required(),
  //   image: mixed().test("fileSize", "The file is too large", (value) => {
  //     if (!value.length) return true; // attachment is optional
  //     return value[0].size <= 2000000;
  //   }),
  description: string()
    .required("Une description est obligatoire")
    .min(10)
    .max(300),
  phone: string(),
  // .matches(phoneRegEx, "Numéro de téléphone invalide"),
});

async function uploadImage(image: File) {
  const formData = new FormData();
  formData.append("files", image);
  const res = await fetch(`${process.env.API_URL}/upload`, {
    method: "POST",
    body: formData,
  });
}

// const phoneRegEx =
//   /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

export const CreateAdForm = ({ token }: { token: string }) => {
  // export const CreateAdForm = () => {
  const [adSubCategories, setAdSubCategories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.API_URL}/ad-sub-categories`).then(async (res) =>
      setAdSubCategories(await res.json())
    );
  }, []);
  const router = useRouter();

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (input) => {
        try {
          await axios
            .post(`${process.env.API_URL}/ads`, input, {
              headers: {
                Authorization: `Bearer ${token}`,
                // "Content-Type": "application/json",
              },
            })
            .then((res) => {
              router.push(`/offres/${res.data.id}`);
              console.log(res.data);
            });
          // console.log(input);
        } catch (e) {
          console.log(e);
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
        <Form onSubmit={handleSubmit}>
          <div className="flex justify-center ">
            <div className="create-ad-form">
              <div className="create-ad-title">Publier une annonce</div>
              <label className="label-title">Titre</label>
              <div>
                <Field
                  as="input"
                  type="text"
                  className="input"
                  name="title"
                  value={values.title || undefined}
                  placeholder="Titre de l'offre"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.title && errors.title && (
                  <div className="text-red-500">{errors.title}</div>
                )}
              </div>
              <div>
                <label className="label-title">Catégories</label>
                <Field
                  as="select"
                  className="input"
                  id="adSubCategory"
                  name="ad_sub_category"
                  value={values.ad_sub_category || undefined}
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
              <label className="label-title">Description</label>
              <div>
                <Field
                  as="textarea"
                  type="text"
                  className="input"
                  id="ad-description"
                  name="description"
                  value={values.description || undefined}
                  placeholder="Entrer une description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.description && errors.description && (
                  <div className="text-red-500">{errors.description}</div>
                )}
              </div>
              <label className="label-title">Contact</label>
              <div>
                <Field
                  as="input"
                  type="text"
                  className="input"
                  id="ad-contact"
                  name="phone"
                  value={values.phone || undefined}
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
                  <label className="label-title">Ajouter une image</label>
                </label>

                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event?.target?.files?.[0]) {
                      const file = event.target.files[0];
                      uploadImage(file).then((res) => {
                        setFieldValue("image", res);
                        console.log(res);
                      });
                    }
                  }}
                />
              </div>
              <button
                className="w-full p-2 mt-6 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
                type="submit"
              >
                {isSubmitting ? "Chargement..." : " Publier"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
