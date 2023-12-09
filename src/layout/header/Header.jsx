import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
} from "@chakra-ui/react";
import logo from "../../assets/logoVoyage.png";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logOut, selectCurrentUser } from "../../features/auth/authSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { createApiWithAuth } from "../../api/apiConfigAuth";
import { useUser } from "../../helpers/useUser";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useUser();
  const { logoutUser } = createApiWithAuth(token);
  useEffect(() => {
    handleTokenAdded();
    window.addEventListener("tokenAdded", handleTokenAdded);
    window.addEventListener("tokenRemoved", handleTokenRemoved);
    return () => {
      window.removeEventListener("tokenAdded", handleTokenAdded);
      window.removeEventListener("tokenRemoved", handleTokenRemoved);
    };
  }, [dispatch]);
  const handleTokenAdded = () => {
    const updatedToken = localStorage.getItem("Token");
    if (updatedToken) {
      dispatch(setCredentials({ user: jwtDecode(updatedToken) }));
    }
  };
  const handleTokenRemoved = () => {
    const token = localStorage.getItem("Token");
    if (token) {
      dispatch(logOut());
    }
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Stack direction={"row"} spacing={7}>
              <Image
                onClick={() => {
                  navigate(`/`);
                }}
                cursor={"pointer"}
                height={"50px"}
                src={logo}
              />
              <Button
                onClick={() => {
                  navigate(`/feed?page=1`);
                }}
              >
                Feed
              </Button>
            </Stack>
          </Box>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                {user ? (
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    Welcome, {user.name}
                  </MenuButton>
                ) : (
                  <Button
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                )}
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={logoutUser}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
