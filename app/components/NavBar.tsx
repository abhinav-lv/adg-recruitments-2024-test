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
  Image,
  Icon,
  Avatar,
  Link,
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
      bg="brand.blackAlpha"
      alignItems="center"
      color="brand.violet"
    >
      <Link textDecor="none" href="/dashboard">
        <Image w="4rem" src={"/ADG.jpg"} borderRadius="10px" />
      </Link>
      <Heading ml="1rem">{`ADG Domain Selections '24`}</Heading>
      <Flex
        p="0.5rem"
        _hover={{ bg: "brand.blackAlpha", transition: "all 100ms" }}
        cursor="pointer"
        borderRadius="8px"
        onClick={onOpen}
        ml="auto"
      >
        <Icon as={Menu} color="white" />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="brand.menuBg" color="brand.menuTxt">
          <DrawerCloseButton mt="1.5rem" />
          <DrawerHeader mt="1rem">Menu</DrawerHeader>

          <DrawerBody p="0%">
            <Flex flexDir="column" w="100%" p="1rem" justifyContent="center">
              <Flex
                mt="1rem"
                alignItems="center"
                justifyContent="space-between"
                p="1rem"
                borderRadius="8px"
                bg="brand.violet"
                color="brand.gray"
              >
                <Text fontWeight="600">{user.displayName}</Text>
                <Avatar size="sm" src={user.photoURL || ""} />
              </Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Flex flexDir="column" w="100%" gap="1rem">
              <Link textDecor="none" href="/dashboard">
                <Button
                  color="brand.menuTxt"
                  onClick={() => router.push("/dashboard")}
                  w="100%"
                  variant="outline"
                  _hover={{ bg: "brand.menuTxt", color: "black" }}
                >
                  Go to dashboard
                </Button>
              </Link>
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
