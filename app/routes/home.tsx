import * as config from "~/config";
import { redirect, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({}: LoaderFunctionArgs) {
  return redirect(config.ROUTES.LISTS.INDEX);
}
