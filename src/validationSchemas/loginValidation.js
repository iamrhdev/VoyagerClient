import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email("Must be a valid Email").required("Required"),
  password: yup.string().required("Required"),
});
