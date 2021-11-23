import * as React from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import * as yup from "yup";

import Button from "../../Components/Button";
import useData from "./data";

const RegisterForm: React.FC = () => {
  const { state, handleSubmit } = useData();
  const { loading } = state;

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: yup.string().when("password", {
      is: (password: string) =>
        password && password.length > 0 ? true : false,
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match"),
    }),
  });

  return (
    <div className="h-screen grid grid-rows-6 grid-flow-col bg-gray-50">
      <div className="row-start-2 md:row-start-1 md:grid md:grid-cols-8 md:mt-9">
        <div className="m-6 p-6 shadow-md bg-white rounded md:col-start-4 md:col-span-2">
          <div className="text-3xl grid grid-col-1 text-center mb-6">
            <b>Register</b>
          </div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values, actions) => handleSubmit(values)}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="my-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Field
                    required
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Type your name"
                    autoComplete="given-name"
                    className="mt-1 block w-full py-2 px-3 border-0 border-b-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>

                <div className="my-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Type your email address"
                    autoComplete="email"
                    className="mt-1 block w-full py-2 px-3 border-0 border-b-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>
                <div className="my-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Type your password"
                    className="mt-1 block w-full py-2 px-3 border-0 border-b-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  />
                  {errors.password && touched.password ? (
                    <div className="text-red-600 rounded border-dashed border-2 border-gray-300 mt-2 p-2 text-center text-xxs text-opacity-75">
                      {errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="my-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <Field
                    required
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    className="mt-1 block w-full py-2 px-3 border-0 border-b-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="text-red-600 rounded border-dashed border-2 border-gray-300 mt-2 p-2 text-center text-xxs text-opacity-75">
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
                <div className="my-8 grid grid-cols-1 text-center">
                  <Button classes="px-3 py-1" type="submit" loading={loading}>
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
