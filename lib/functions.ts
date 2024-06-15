import { User } from "firebase/auth";
import { database } from "./firebase/config";
import {
  Domain,
  IMCQ,
  IResponseMCQ,
  IResponseSub,
  ISubjective,
  ITestStatus,
  ManagementDomain,
} from "./types";
import { child, ref, get, set } from "firebase/database";
import { Dispatch, SetStateAction } from "react";

const dbRef = ref(database);

export async function getDataFromDatabase<T>(path: string): Promise<T | null> {
  try {
    const dataSnap = await get(child(dbRef, path));
    const data = dataSnap.exists() ? (dataSnap.val() as T) : null;
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function writeDataToDatabase<T>(
  path: string,
  data: T
): Promise<boolean> {
  try {
    await set(ref(database, path), data);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function checkPathExistsInDatabase(
  path: string
): Promise<boolean> {
  try {
    const dataSnap = await get(child(dbRef, path));
    return dataSnap.exists();
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function checkTechnicalDomainSubmission(
  user: User,
  domain: Domain
): Promise<boolean> {
  return checkPathExistsInDatabase(
    `users/${user.uid}/responses/technicalDomain/${domain}/assignmentLink`
  );
}

export async function getSubmittedTechnicalDomains(
  user: User
): Promise<Domain[]> {
  const submittedDomains: Domain[] = [];
  const checkDomainSubmissionPromises = Object.values(Domain).map(
    async (domain) => {
      const hasSubmitted = await checkTechnicalDomainSubmission(user, domain);
      if (hasSubmitted) {
        submittedDomains.push(domain);
      }
    }
  );
  await Promise.all(checkDomainSubmissionPromises);
  return submittedDomains;
}

export function getShuffledRandomQuestions(
  questions: (IMCQ | ISubjective)[]
): (IMCQ | ISubjective)[] {
  const generalQuestions = questions.filter(
    (q) => q.domain === ManagementDomain.general
  );
  const nonGeneralQuestions = questions.filter(
    (q) => q.domain !== ManagementDomain.general
  );
  const shuffledNonGeneralQuestions = nonGeneralQuestions.sort(
    () => 0.5 - Math.random()
  );
  const randomNonGeneralQuestions = shuffledNonGeneralQuestions.slice(0, 5);
  const combinedQuestions = [...generalQuestions, ...randomNonGeneralQuestions];
  const shuffledCombinedQuestions = combinedQuestions.sort(
    () => 0.5 - Math.random()
  );
  return shuffledCombinedQuestions;
}

export function getTimeDifferenceInMinutes(
  epoch1: number,
  epoch2: number
): number {
  const differenceInMilliseconds = Math.abs(epoch1 - epoch2);
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
  return differenceInMinutes;
}

export function getTimeRemainingInTest(testStatus: ITestStatus) {
  return 45 - getTimeDifferenceInMinutes(testStatus.testStartEpoch, Date.now());
}

export async function saveResponse(
  user: User,
  response: IResponseMCQ | IResponseSub
) {
  try {
    await writeDataToDatabase(
      `users/${user.uid}/responses/managementDomain/${response.questionId}`,
      response
    );
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function updateTestStatus(user: User, testStatus: ITestStatus) {
  try {
    await writeDataToDatabase(`users/${user.uid}/testStatus`, testStatus);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
