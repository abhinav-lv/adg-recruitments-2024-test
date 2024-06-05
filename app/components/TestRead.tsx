import { db } from "@/lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useEffect } from "react";

const writeToDB = async () => {
  try {
    const docRef = await addDoc(collection(db, "abhinav"), {
      ios_github_link: "www.example.com",
      web_github_link: "www.ongotha.com",
    });
    console.log("Document written with doc ID: ", docRef.id);
  } catch (err) {
    console.error(err);
  }
};

export default function TestRead() {
  useEffect(() => {
    writeToDB();
  }, []);
  return <></>;
}
