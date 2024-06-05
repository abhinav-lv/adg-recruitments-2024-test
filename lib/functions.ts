import { User } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "./firebase/config";
import { Domain } from "./types";

export const grayOutDomains = async (
  user: User,
  setDomainsToBeGrayed: Dispatch<SetStateAction<Domain[] | "loading">>
) => {
  const docSnaps = await Promise.all(
    Object.values(Domain).map((domain) => getDoc(doc(db, user.uid, domain)))
  );
  const domainsToBeGrayed: Domain[] = [];
  docSnaps.forEach((doc) => {
    const docKey = doc.id as Domain;
    if (doc.exists()) domainsToBeGrayed.push(docKey);
  });
  setDomainsToBeGrayed(domainsToBeGrayed);
};
