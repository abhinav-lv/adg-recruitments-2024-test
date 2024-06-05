"use client";
import { Flex, Heading } from "@chakra-ui/react";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import DomainCard from "../components/DomainCard";
import { Domain } from "@/lib/types";
import { grayOutDomains } from "@/lib/functions";

export default function Dashboard() {
  const { user } = UserAuth();
  const router = useRouter();
  const [domainsToBeGrayed, setDomainsToBeGrayed] = useState<
    Domain[] | "loading"
  >("loading");

  useEffect(() => {
    if (user === null) {
      router.push("/");
      return;
    }
    if (user !== "loading") grayOutDomains(user, setDomainsToBeGrayed);
  }, [user]);

  return user === "loading" ||
    user === null ||
    domainsToBeGrayed === "loading" ? (
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
      <Flex flexDir="column" p="2rem">
        <Heading color="#9FB4B6">Technical Domains</Heading>
        <Flex gap="1rem" wrap="wrap" mt="2rem">
          {Object.values(Domain).map((domain, idx) => (
            <DomainCard
              key={idx}
              domain={domain}
              toBeGrayed={domainsToBeGrayed.includes(domain)}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
