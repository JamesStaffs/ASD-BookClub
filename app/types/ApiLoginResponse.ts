import type { Jwt } from "./Jwt";

export type ApiLoginResponse = {
    token?: Jwt;
    error?: string;
};