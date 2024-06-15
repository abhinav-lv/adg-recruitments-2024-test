"use client";
import {
  getDataFromDatabase,
  getShuffledRandomQuestions,
  writeDataToDatabase,
} from "@/lib/functions";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { IMCQ, ISubjective, ITestStatus } from "@/lib/types";
import NavBar from "../components/NavBar";
import useCheckTest from "../hooks/useCheckTest";
import StartIcon from "@mui/icons-material/Start";

const fetchQuestions = async (
  setQuestions: Dispatch<SetStateAction<(IMCQ | ISubjective)[] | "loading">>
) => {
  const questions = await getDataFromDatabase<(IMCQ | ISubjective)[]>(
    `questions/management`
  );
  if (questions !== null) setQuestions(questions);
};

export default function Management() {
  const router = useRouter();
  const { user } = UserAuth();
  const [startLoad, setStartLoad] = useState(false);
  const [questions, setQuestions] = useState<
    (IMCQ | ISubjective)[] | "loading"
  >("loading");

  // check for ongoing test
  const { testStatus } = useCheckTest();
  useEffect(() => {
    if (testStatus === "loading" || testStatus === null) return;
    if (testStatus.isGivingTest) router.push("/management/test");
    else router.push("/dashboard");
  }, [testStatus]);

  useEffect(() => {
    if (user === null) router.push("/");
    else if (user !== "loading") {
      fetchQuestions(setQuestions);
    }
  }, [user]);

  const handleStart = async () => {
    if (user === null || user === "loading" || questions === "loading") return;
    setStartLoad(true);
    await writeDataToDatabase<ITestStatus>(`users/${user.uid}/testStatus`, {
      isGivingTest: true,
      currentQuestion: 0,
      questions: getShuffledRandomQuestions(questions),
      testStartEpoch: Date.now(),
      isTestCompleted: false,
    });
    router.push("/management/test");
    setStartLoad(false);
  };

  return user === "loading" ||
    questions === "loading" ||
    user === null ||
    testStatus !== null ? (
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
      <Button
        isLoading={startLoad}
        loadingText="Starting now..."
        onClick={handleStart}
        mt="2rem"
        ml="2rem"
        w="fit-content"
        color="brand.gray"
        bg="brand.btnBg"
        _hover={{ bg: "brand.btnBgHover" }}
        rightIcon={<StartIcon />}
      >
        Start Test
      </Button>
    </Flex>
  );
}
