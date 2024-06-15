import { User } from "firebase/auth";
import { database } from "./firebase/config";
import { Domain } from "./types";
import { child, ref, get, set } from "firebase/database";

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
  console.log({ submittedDomains });
  return submittedDomains;
}
