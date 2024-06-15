"use client";

import {
  Button,
  Flex,
  Skeleton,
  Tag,
  TagLabel,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import useCheckTest from "../hooks/useCheckTest";
import Error from "./Error";
import {
  IMCQ,
  IResponseMCQ,
  IResponseSub,
  ISubjective,
  ITestStatus,
  instanceOfIMCQ,
} from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { saveResponse, updateTestStatus } from "@/lib/functions";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { managementDomainToTagColorScheme } from "@/lib/data";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function MCQQuestion({
  user,
  testStatus,
  setTestStatus,
  questionBody,
}: {
  user: User;
  testStatus: ITestStatus;
  setTestStatus: Dispatch<SetStateAction<ITestStatus | "loading" | null>>;
  questionBody: IMCQ;
}) {
  const toast = useToast();
  const [saveLoad, setSaveLoad] = useState(false);
  const [response, setResponse] = useState<IResponseMCQ>({
    questionId: questionBody.questionId,
    domain: questionBody.domain,
    chosenOptionId: -1,
  });

  useEffect(() => {
    setResponse({
      questionId: questionBody.questionId,
      domain: questionBody.domain,
      chosenOptionId: -1,
    });
  }, [questionBody]);

  const handleSave = async () => {
    setSaveLoad(true);
    try {
      await saveResponse(user, response);
      const newTestStatus = {
        ...testStatus,
        currentQuestion: testStatus.currentQuestion + 1,
      };
      await updateTestStatus(user, newTestStatus);
      setTestStatus(newTestStatus);
      toast({
        status: "success",
        description: "Your response was saved!",
        duration: 3000,
      });
    } catch (err) {
      console.error(err);
      toast({
        status: "error",
        description: "Unable to save response.",
        duration: 3000,
      });
    }
    setSaveLoad(false);
  };

  return (
    <Flex flexDir="column" color="brand.gray" justifyContent="center" p="2rem">
      <Tag
        w="fit-content"
        ml="auto"
        mb="1rem"
        size="md"
        variant="outline"
        fontWeight="600"
        colorScheme={managementDomainToTagColorScheme[questionBody.domain]}
      >
        <TagLabel>{questionBody.domain}</TagLabel>
      </Tag>
      <Text mb="2rem">{questionBody.question.questionText}</Text>
      {questionBody.question.options.map((option, idx) => (
        <Flex
          key={idx}
          color="brand.gray"
          p="1rem"
          mb="1rem"
          bg={
            response.chosenOptionId === option.optionId
              ? "brand.btnBg"
              : "brand.blackAlpha"
          }
          border="1px solid white"
          cursor="pointer"
          onClick={() =>
            setResponse({ ...response, chosenOptionId: option.optionId })
          }
        >
          <Text>{option.optionText}</Text>
        </Flex>
      ))}
      <Button
        mt="2rem"
        w="fit-content"
        ml="auto"
        color="brand.gray"
        bg="brand.btnBg"
        _hover={{ bg: "brand.btnBgHover" }}
        onClick={handleSave}
        isLoading={saveLoad}
        rightIcon={<KeyboardArrowRightIcon />}
      >
        {testStatus.currentQuestion === 7 ? "Save and Submit" : "Save and Next"}
      </Button>
    </Flex>
  );
}

function SubQuestion({
  user,
  testStatus,
  setTestStatus,
  questionBody,
}: {
  user: User;
  testStatus: ITestStatus;
  setTestStatus: Dispatch<SetStateAction<ITestStatus | "loading" | null>>;
  questionBody: ISubjective;
}) {
  const toast = useToast();
  const [saveLoad, setSaveLoad] = useState(false);
  const [response, setResponse] = useState<IResponseSub>({
    questionId: questionBody.questionId,
    domain: questionBody.domain,
    responseText: "",
  });

  useEffect(() => {
    setResponse({
      questionId: questionBody.questionId,
      domain: questionBody.domain,
      responseText: "",
    });
  }, [questionBody]);

  const handleSave = async () => {
    setSaveLoad(true);
    try {
      await saveResponse(user, response);
      const newTestStatus = {
        ...testStatus,
        currentQuestion: testStatus.currentQuestion + 1,
      };
      await updateTestStatus(user, newTestStatus);
      setTestStatus(newTestStatus);
      toast({
        status: "success",
        description: "Your response was saved!",
        duration: 3000,
      });
    } catch (err) {
      console.error(err);
      toast({
        status: "error",
        description: "Unable to save response.",
        duration: 3000,
      });
    }
    setSaveLoad(false);
  };

  return (
    <Flex flexDir="column" color="brand.gray" justifyContent="center" p="2rem">
      <Tag
        w="fit-content"
        ml="auto"
        mb="1rem"
        size="md"
        variant="outline"
        fontWeight="600"
        colorScheme={managementDomainToTagColorScheme[questionBody.domain]}
      >
        <TagLabel>{questionBody.domain}</TagLabel>
      </Tag>
      <Text>{questionBody.question.questionText}</Text>
      <Textarea
        mt="2rem"
        h="18rem"
        size="md"
        resize="none"
        value={response.responseText}
        onChange={(e) =>
          setResponse({ ...response, responseText: e.target.value })
        }
      />
      <Button
        mt="2rem"
        w="fit-content"
        ml="auto"
        color="brand.gray"
        bg="brand.btnBg"
        _hover={{ bg: "brand.btnBgHover" }}
        onClick={handleSave}
        isLoading={saveLoad}
        rightIcon={<KeyboardArrowRightIcon />}
      >
        {testStatus.currentQuestion === 7 ? "Save and Submit" : "Save and Next"}
      </Button>
    </Flex>
  );
}

export default function Question({ user }: { user: User }) {
  const { testStatus, setTestStatus } = useCheckTest();
  const [currentQuestion, setCurrentQuestion] = useState<
    IMCQ | ISubjective | "loading"
  >("loading");

  const router = useRouter();

  const handleSubmit = async () => {
    if (testStatus === "loading" || testStatus === null) return;
    try {
      updateTestStatus(user, {
        ...testStatus,
        isGivingTest: false,
        isTestCompleted: true,
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  // set currentQuestion
  useEffect(() => {
    if (testStatus !== "loading" && testStatus !== null) {
      if (testStatus.currentQuestion === 8) {
        handleSubmit();
        return;
      } else
        setCurrentQuestion(testStatus.questions[testStatus.currentQuestion]);
    }
  }, [testStatus]);

  return testStatus === "loading" || currentQuestion === "loading" ? (
    <Skeleton />
  ) : testStatus === null ? (
    <Error />
  ) : (
    <Flex flexDir="column">
      {instanceOfIMCQ(currentQuestion) ? (
        <MCQQuestion
          user={user}
          testStatus={testStatus}
          setTestStatus={setTestStatus}
          questionBody={currentQuestion}
        />
      ) : (
        <SubQuestion
          user={user}
          testStatus={testStatus}
          setTestStatus={setTestStatus}
          questionBody={currentQuestion}
        />
      )}
    </Flex>
  );
}
