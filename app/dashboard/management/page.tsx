"use client";
import Loader from "@/app/components/Loader";
import NavBar from "@/app/components/NavBar";
import { UserAuth } from "@/app/context/AuthContext";
import { getDataFromDatabase } from "@/lib/functions";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const fetchData = async () => {
  const questions = await getDataFromDatabase(`questions/management`);
};

export default function Management() {
  const { user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/");
    else {
      // get mgmt questions
      fetchData();
    }
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
      <Heading mt="2rem" ml="2rem" color="white">
        Management Domain Tasks
      </Heading>
    </Flex>
  );
}
