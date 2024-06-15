"use client";
import {
  Flex,
  Heading,
  Text,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import { Menu } from "@mui/icons-material";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { user, logOut } = UserAuth();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return user === null || user === "loading" ? (
    <></>
  ) : (
    <Flex
      p="1rem 2rem"
      justifyContent="space-between"
      bg="rgba(100, 0, 255, 0.7)"
      alignItems="center"
    >
      <Heading>{`ADG Recruitments '24`}</Heading>
      <Flex
        p="0.5rem"
        _hover={{ bg: "rgba(0,0,0,0.5)", transition: "all 100ms" }}
        cursor="pointer"
        borderRadius="8px"
      >
        <Icon as={Menu} onClick={onOpen} color="white" />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mt="0.5rem" />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody p="0%">
            <Flex flexDir="column" w="100%" p="1rem" justifyContent="center">
              <Flex
                gap="0.5rem"
                alignItems="center"
                p="0.5rem"
                borderRadius="8px"
                bg="rgba(0,0,0,0.2)"
              >
                <Avatar size="sm" src={user.photoURL || ""} />
                <Text>{user.displayName}</Text>
              </Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Flex flexDir="column" w="100%" gap="1rem">
              <Button
                onClick={() => router.push("/dashboard")}
                w="100%"
                colorScheme="blue"
              >
                Go to dashboard
              </Button>
              <Button onClick={logOut} w="100%" colorScheme="red">
                Log Out
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
