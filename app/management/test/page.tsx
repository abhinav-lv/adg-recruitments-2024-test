"use client";

import CountDown from "@/app/components/CountDown";
import Loader from "@/app/components/Loader";
import NavBar from "@/app/components/NavBar";
import Question from "@/app/components/Question";
import { UserAuth } from "@/app/context/AuthContext";
import useCheckTest from "@/app/hooks/useCheckTest";
import {
  getTimeDifferenceInMinutes,
  writeDataToDatabase,
} from "@/lib/functions";
import { ITestStatus } from "@/lib/types";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const hasTestExpired = (testStatus: ITestStatus) => {
  return getTimeDifferenceInMinutes(Date.now(), testStatus.testStartEpoch) > 45;
};

export default function Test() {
  const { user } = UserAuth();
  const router = useRouter();

  // check for ongoing test
  const { testStatus } = useCheckTest();
  useEffect(() => {
    if (user === "loading" || testStatus === "loading") return;
    if (user === null) {
      router.push("/");
      return;
    }
    if (testStatus === null) {
      router.push("/management");
      return;
    }
    if (testStatus.isGivingTest) {
      if (testStatus.isTestCompleted) router.push("/dashboard");
      if (hasTestExpired(testStatus)) {
        writeDataToDatabase<ITestStatus>(`users/${user.uid}/testStatus`, {
          ...testStatus,
          isGivingTest: false,
          isTestCompleted: true,
        });
      }
    } else router.push("/dashboard");
  }, [testStatus, user]);

  return user === "loading" ||
    user === null ||
    testStatus === "loading" ||
    testStatus === null ||
    hasTestExpired(testStatus) ? (
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
      <CountDown
        user={user}
        startTime={testStatus.testStartEpoch}
        timeLimit={45}
      />
      <Question user={user} />
    </Flex>
  );
}
