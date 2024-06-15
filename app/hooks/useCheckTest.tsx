"use client";

import { getDataFromDatabase } from "@/lib/functions";
import { ITestStatus } from "@/lib/types";
import { User } from "firebase/auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";

async function checkForOngoingTest(user: User) {
  return await getDataFromDatabase<ITestStatus>(`users/${user.uid}/testStatus`);
}

async function handleOngoingTest(
  user: User,
  setTestStatus: Dispatch<SetStateAction<"loading" | ITestStatus | null>>
) {
  const testStatus = await checkForOngoingTest(user);
  setTestStatus(testStatus);
}

export default function useCheckTest() {
  const { user } = UserAuth();
  const [testStatus, setTestStatus] = useState<"loading" | ITestStatus | null>(
    "loading"
  );

  useEffect(() => {
    if (user !== "loading" && user !== null)
      handleOngoingTest(user, setTestStatus);
  }, [user]);

  return { testStatus, setTestStatus };
}
