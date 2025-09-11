export type FetchAuthenticated = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export type FetchAuthenticatedHandleUnauthorizedResponse = (response: Response) => Response;