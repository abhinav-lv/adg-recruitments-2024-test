import { Flex, Image } from "@chakra-ui/react";
import adggif from "../assets/img/adggif.gif";

export default function Loader() {
  return (
    <Flex
      bg="black"
      bgImage="/background.png"
      bgSize="cover"
      h="100vh"
      w="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Image w="15rem" src="/loader-gif.gif" />
    </Flex>
  );
}
