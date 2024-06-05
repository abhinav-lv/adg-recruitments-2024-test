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

export type IDomainIcons = {
  [key in Domain]?: any;
};
