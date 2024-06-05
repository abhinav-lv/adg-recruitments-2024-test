"use client";
import {
  Flex,
  Heading,
  Text,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
} from "@chakra-ui/react";
import { UserAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logOut } = UserAuth();

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
      <Popover>
        <PopoverTrigger>
          <Flex
            alignItems="center"
            color="white"
            bg="rgba(0,0,0,0.4)"
            p="0.5rem 1rem"
            borderRadius="1rem"
            gap="1rem"
            cursor="pointer"
            _hover={{ bg: "rgba(0,0,0,0.6)" }}
          >
            <Text fontWeight="600">
              {user.displayName?.split(" ")[0] || ""}
            </Text>
            <Avatar
              name={user.displayName || ""}
              src={user.photoURL || ""}
              size="sm"
            />
          </Flex>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>{user.displayName || ""}</PopoverHeader>
          <PopoverBody>
            <Button onClick={logOut}>Log Out</Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
