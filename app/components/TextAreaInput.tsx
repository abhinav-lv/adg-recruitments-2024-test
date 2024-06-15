// components/TextAreaInput.tsx
import { Textarea } from "@chakra-ui/react";

interface TextAreaInputProps {
  value: string;
  handleInputChange: (text: string) => void;
}

export default function TextAreaInput({
  value,
  handleInputChange,
}: TextAreaInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e.target.value);
  };

  return (
    <Textarea
      color="white"
      value={value}
      onChange={handleChange}
      placeholder="Enter your answer here..."
      size="lg"
    />
  );
}
