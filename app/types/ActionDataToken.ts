import type { Jwt } from "./Jwt";

export type ActionDataToken = {
  error?: string;
  token?: Jwt;
};