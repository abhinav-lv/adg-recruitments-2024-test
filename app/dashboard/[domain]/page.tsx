"use client";
import Loader from "@/app/components/Loader";
import NavBar from "@/app/components/NavBar";
import TextInput from "@/app/components/TextInput";
import { UserAuth } from "@/app/context/AuthContext";
import useCheckTest from "@/app/hooks/useCheckTest";
import { domainToName, domainToTaskLink } from "@/lib/data";
import {
  getSubmittedTechnicalDomains,
  writeDataToDatabase,
} from "@/lib/functions";
import { Domain } from "@/lib/types";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const getSubmissions = async (
  user: User,
  setDomainsToBeGrayed: Dispatch<SetStateAction<"loading" | Domain[]>>
) => {
  const technicalDomains = await getSubmittedTechnicalDomains(user);
  setDomainsToBeGrayed(technicalDomains);
};

export default function DomainPage({ params }: { params: { domain: string } }) {
  const { user } = UserAuth();
  const router = useRouter();
  const domain = params.domain as Domain;
  const assignmentPlatform = domain === Domain.design ? "Figma" : "GitHub";
  const [assignmentLink, setAssignmentLink] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [domainsToBeGrayed, setDomainsToBeGrayed] = useState<
    Domain[] | "loading"
  >("loading");
  const [linkError, setLinkError] = useState({ status: false, message: "" });

  // check for ongoing test
  const { testStatus } = useCheckTest();
  useEffect(() => {
    if (
      testStatus === "loading" ||
      testStatus === null ||
      testStatus.isTestCompleted
    )
      return;
    if (testStatus.isGivingTest) router.push("/management/test");
    else router.push("/dashboard");
  }, [testStatus]);

  useEffect(() => {
    if (!(domain in Domain)) router.push("/dashboard");
  }, []);

  useEffect(() => {
    if (user === null) router.push("/");
    else if (user !== "loading") getSubmissions(user, setDomainsToBeGrayed);
  }, [user]);

  useEffect(() => {
    if (domainsToBeGrayed.includes(domain)) router.push("/");
  }, [domainsToBeGrayed]);

  const handleInputChange = (value: string) => {
    if (linkError.status) setLinkError({ status: false, message: "" });
    setAssignmentLink(value);
  };

  const handleSubmitTask = async () => {
    if (assignmentLink.length === 0) {
      setLinkError({ status: true, message: "Github link is required." });
      return;
    }
    if (user === null || user === "loading") return;
    setSubmitLoading(true);
    try {
      await writeDataToDatabase(
        `/users/${user.uid}/responses/technicalDomain/${domain}`,
        { assignmentLink }
      );
      router.push("/dashboard");
      setSubmitLoading(false);
    } catch (err) {
      setSubmitLoading(false);
      console.error(err);
    }
  };

  return user === "loading" ||
    user === null ||
    !(domain in Domain) ||
    domainsToBeGrayed === "loading" ||
    domainsToBeGrayed.includes(domain) ||
    testStatus === "loading" ||
    (testStatus !== null && testStatus.isGivingTest) ? (
    <Loader />
  ) : (
    <Flex
      flexDir="column"
      bg="black"
      h="100vh"
      bgImage="/background.png"
      bgSize="cover"
    >
      <NavBar />
      <Flex h="100%" flexDir={["column", "column", "column", "row"]}>
        {/* Link and info */}
        <Flex
          color="#9FB4B6"
          w={["100%", "100%", "100%", "40%"]}
          p="2rem"
          flexDir="column"
        >
          <Text fontWeight="600" fontSize="2rem">{`${
            domainToName[domain as Domain]
          } Task`}</Text>
          <OrderedList mt="2rem" color="white">
            <ListItem>
              Go through the task description given and understand what is
              required.
            </ListItem>
            <ListItem>
              {`${
                assignmentPlatform === "Figma" ? "Design" : "Push"
              } your solution on ${assignmentPlatform} and paste the ${assignmentPlatform} link in the box
              below.`}
            </ListItem>
          </OrderedList>
          <Text mt="2rem" fontWeight="600" color="#9FB4B6" fontSize="1rem">
            {`${assignmentPlatform} Link:`}
          </Text>
          <FormControl isInvalid={linkError.status}>
            <TextInput handleInputChange={handleInputChange} />
            <FormErrorMessage>{linkError.message}</FormErrorMessage>
          </FormControl>
          <Button
            mt="2rem"
            color="white"
            bg="rgba(100, 0, 255, 0.7)"
            _hover={{ bg: "rgba(100, 0, 255, 0.9)" }}
            isLoading={submitLoading}
            onClick={handleSubmitTask}
          >
            Submit Task
          </Button>
        </Flex>
        {/* PDF Embed */}
        <Flex
          w={["100%", "100%", "100%", "60%"]}
          h="100%"
          minH="16rem"
          p="2rem"
        >
          <iframe
            src={domainToTaskLink[domain as Domain]}
            width="100%"
            height="100%"
            style={{ minHeight: "23rem" }}
            allow="autoplay"
          ></iframe>
        </Flex>
      </Flex>
    </Flex>
  );
}
