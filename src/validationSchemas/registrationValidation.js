import * as yup from "yup";

export const registrationValidation = yup.object().shape({
  UserName: yup.string().required(),
  FirstName: yup
    .string()
    .required("Required")
    .max(30)
    .matches(
      /^[a-zA-Z]+$/,
      "First name must contain only letters and have a maximum length of 30 characters."
    ),
  LastName: yup
    .string()
    .required()
    .max(50)
    .matches(
      /^[a-zA-Z]+$/,
      "Last name must contain only letters and have a maximum length of 50 characters."
    ),

  Email: yup.string().required().email("Valid email is required"),

  Password: yup
    .string()
    .required()
    .min(8)
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[0-9]/, "Password must contain at least one digit.")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character."
    ),

  PasswordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref("Password")], "Passwords must match.")
    .min(8)
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[0-9]/, "Password must contain at least one digit.")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character."
    ),
});
