import { Input } from "@chakra-ui/react";

export default function TextInput({
  handleInputChange,
}: {
  handleInputChange: (content: string) => void;
}) {
  return (
    <Input
      mt="1rem"
      color="white"
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
}
