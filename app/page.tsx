"use client";
import { Button, Flex, Image } from "@chakra-ui/react";
import { UserAuth } from "./context/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./components/Loader";

export default function App() {
  const { googleSignIn, user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user !== null && user !== "loading") router.push("/dashboard");
  }, [user]);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.error(err);
    }
  };

  return user === "loading" || user !== null ? (
    <Loader />
  ) : (
    <Flex h="100vh" w="100%">
      <Image
        w="40%"
        h="100%"
        src="/landing-image.svg"
        objectFit="cover"
        display={["none", "none", "initial"]}
      />
      <Flex
        w={["100%", "100%", "60%"]}
        h="100%"
        bgImage="/background.png"
        bgSize="cover"
        alignItems="center"
        justifyContent="center"
      >
        <Flex bg="rgba(0,0,0,0.4)" borderRadius="1rem" p="2rem">
          <Button
            onClick={handleSignIn}
            leftIcon={<GoogleIcon />}
            colorScheme="purple"
          >
            Sign in with Google
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
