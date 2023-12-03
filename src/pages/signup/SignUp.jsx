"use client";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { getUserByName, registerUser } from "../../api/apiConfig";
import { registrationValidation } from "../../validationSchemas/registrationValidation";
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const mapRoleToEnum = (roleString) => {
    switch (roleString) {
      case "HotelManager":
        return 2;
      case "Visitor":
        return 3;
      default:
        return null;
    }
  };
  const formik = useFormik({
    initialValues: {
      UserName: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      PasswordConfirm: "",
      PhoneNumber: "",
      UserRole: "",
    },
    validationSchema: registrationValidation,
    onSubmit: (values) => {
      const enumValue = mapRoleToEnum(values.UserRole);
      if (enumValue != null) {
        handleSignUp({ ...values, UserRole: enumValue });
      }
    },
  });
  function handleGetUserName(userName) {
    const res = getUserByName(userName);
    if (res) {
      return true;
    } else {
      return false;
    }
  }

  function handleSignUp(userRegisterDto) {
    const result = handleGetUserName(userRegisterDto.UserName);
    if (result === false) {
      registerUser(userRegisterDto)
        .then((response) => {
          console.log(response);
        })
        .catch((errors) => {
          console.log(errors);
        })
        .finally(() => {
          console.log("Registered");
        });
    }
    return;
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <Box>
                <FormControl id="UserName" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.UserName}
                    onChange={formik.handleChange}
                    name="UserName"
                  />
                </FormControl>
                {formik.errors.UserName ? (
                  <Text color={"red.500"}>{formik.errors.UserName}</Text>
                ) : null}
              </Box>
              <HStack>
                <Box>
                  <FormControl id="FirstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={formik.values.FirstName}
                      onChange={formik.handleChange}
                      name="FirstName"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="LastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={formik.values.LastName}
                      onChange={formik.handleChange}
                      name="LastName"
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="Email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                  name="Email"
                />
              </FormControl>
              {formik.errors.Email ? (
                <Text color={"red.500"}>{formik.errors.Email}</Text>
              ) : null}
              <FormControl id="Password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formik.values.Password}
                    onChange={formik.handleChange}
                    name="Password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.errors.Password ? (
                  <Text color={"red.500"}>{formik.errors.Password}</Text>
                ) : null}
              </FormControl>
              <FormControl id="PasswordConfirm" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formik.values.PasswordConfirm}
                    onChange={formik.handleChange}
                    name="PasswordConfirm"
                  />
                </InputGroup>
                {formik.errors.PasswordConfirm ? (
                  <Text color={"red.500"}>{formik.errors.PasswordConfirm}</Text>
                ) : null}
              </FormControl>
              <Box>
                <FormControl id="PhoneNumber" isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="text"
                    value={formik.values.PhoneNumber}
                    onChange={formik.handleChange}
                    name="PhoneNumber"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="UserRole" isRequired>
                  <FormLabel>Role</FormLabel>
                  <Select
                    value={formik.values.UserRole}
                    onChange={formik.handleChange}
                    placeholder="Select a role"
                  >
                    <option value="HotelManager">Hotel Manager</option>
                    <option value="Visitor">Visitor</option>
                  </Select>
                </FormControl>
              </Box>

              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  textTransform={"uppercase"}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link
                    onClick={() => {
                      navigate("/login");
                    }}
                    color={"blue.400"}
                  >
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
