import { User } from "firebase/auth";

export interface IAuthContext {
  user: null | "loading" | User;
  googleSignIn: () => Promise<void>;
  logOut: () => Promise<void>;
}

export enum Domain {
  web = "web",
  ios = "ios",
  android = "android",
  ml = "ml",
  blockchain = "blockchain",
  design = "design",
}

export enum ManagementDomain {
  sponsorship = "sponsorship",
  publicity = "publicity",
  operations = "operations",
  general = "general",
}

export type IDomainIcons = {
  [key in Domain]?: any;
};

export interface ISubjective {
  questionId: string;
  domain: ManagementDomain;
  question: {
    questionText: string;
  };
}

export interface IMCQ {
  questionId: string;
  domain: ManagementDomain;
  question: {
    questionText: string;
    options: { optionId: number; optionText: string }[];
  };
}

export function instanceOfIMCQ(object: IMCQ | ISubjective): object is IMCQ {
  return "options" in object.question;
}

export interface ITestStatus {
  isGivingTest: boolean;
  questions: (IMCQ | ISubjective)[];
  testStartEpoch: number;
  isTestCompleted: boolean;
  currentQuestion: number;
}

export interface IResponseMCQ {
  questionId: string;
  domain: ManagementDomain;
  chosenOptionId: number;
}

export interface IResponseSub {
  questionId: string;
  domain: ManagementDomain;
  responseText: string;
}
