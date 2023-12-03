import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  WrapItem,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../validationSchemas/loginValidation";
import { loginUser } from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
    validationSchema: loginValidationSchema,
  });
  function handleLogin(userSignInDto) {
    loginUser(userSignInDto)
      .then((response) => {
        localStorage.setItem("Token", response.data.jwt);
        window.dispatchEvent(new Event("tokenAdded"));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Completed");
      });
  }

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Not registered yet?</Heading>
            <Text
              fontSize={"14px"}
              onClick={() => {
                navigate("/signup");
              }}
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
              color={"blue.500"}
            >
              Click to sign up
            </Text>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <Text color={"red.500"}>{formik.errors.email}</Text>
              ) : null}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.500"}>Forgot password?</Text>
              </Stack>
              <WrapItem>
                <Button
                  type="submit"
                  textTransform={"uppercase"}
                  letterSpacing={"1px"}
                  colorScheme={"blue"}
                  variant="solid"
                >
                  Sign in
                </Button>
              </WrapItem>
            </Stack>
          </Stack>
        </form>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
