import { BunFile } from "bun";

export type Plan = {
  id: number;
  name: string;
  file: string;
};

export type PhoneNumbers = {phoneNumbers: string[]};

export type Authorized = {
  authorized: boolean;
};

export type Active = {
  active: boolean;
};

export type PlanFile = undefined | BunFile;

export type Dependent = { phoneNumber: string }

export type PlanTravel = {
  phoneNumber: string;
  dependents: Dependent[];
};
