"use client";
import { Flex, Heading } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { UserAuth } from "./context/AuthContext";
import Loader from "./components/Loader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/");
  }, [user]);

  return user === "loading" || user === null ? (
    <Loader />
  ) : (
    <Flex
      h="100vh"
      flexDir="column"
      bg="black"
      bgImage="/background.png"
      bgSize="cover"
    >
      <NavBar />
      <Heading m="2rem" color="#9FB4B6">
        This page does not exist. Please return to the dashboard.
      </Heading>
    </Flex>
  );
}
