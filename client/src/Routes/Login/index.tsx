import * as React from "react";
import { Formik, Form, Field } from "formik";

import Button from "../../Components/Button";
import useData from "./data";

const LoginForm: React.FC = () => {
  const { state, handleSubmit } = useData();
  const { loading } = state;

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-tr from-gray-100 to-gray-400">
      <div className="w-11/12 md:w-1/4 pb-8 shadow-md bg-white rounded">
        <div className="text-2xl text-center px-8 py-4 mb-3 text-white bg-gradient-to-br from-gray-700 to-gray-900 mb-6">
          Login to continue
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => handleSubmit(values)}
        >
          <Form className="px-8">
            <div className="my-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <i className="bx bx-user mr-2" />
                Email
              </label>
              <Field
                required
                type="email"
                name="email"
                id="email"
                placeholder="Type your email address"
                autoComplete="email"
                className="mt-1 block w-full py-2 px-3 rounded-md border-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="my-4">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  <i className="bx bx-hide mr-2" />
                  Password
                </label>
                <div className="text-xs text-indigo-800 hover:underline cursor-pointer">
                  Forgot password?
                </div>
              </div>
              <Field
                required
                type="password"
                name="password"
                id="password"
                placeholder="Type your password"
                autoComplete="password"
                className="mt-1 block w-full py-2 px-3 border-2 rounded-md border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="pt-4 pb-4 text-center">
              <Button
                classes="px-3 py-1"
                rounded="sm"
                type="submit"
                loading={loading}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
