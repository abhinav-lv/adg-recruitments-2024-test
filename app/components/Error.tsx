import { Flex, Heading, Image } from "@chakra-ui/react";

export default function Error() {
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
      <Heading color="red">
        Oops! That was an error. Please try again after some time.
      </Heading>
    </Flex>
  );
}
