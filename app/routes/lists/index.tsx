import { Link, redirect, useLoaderData, type LoaderFunctionArgs } from "react-router";
import CardGrid from "~/components/CardGrid";
import ReadingList from "~/components/ReadingList";
import { getUserId } from "~/services/session.server";
import type { List } from "~/types/List";

export async function loader({ request }: LoaderFunctionArgs): Promise<List[]> {
  const userId = await getUserId(request);
  if (!userId) {
    throw redirect("/auth/login");
  }

  const response = await fetch("https://687a1addabb83744b7eb7154.mockapi.io/api/v1/lists");
  if (!response.ok) {
    throw new Error("Failed to fetch lists");
  }

  const data: List[] = await response.json();
  return data;
}

export default function ListIndex() {
  const lists = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-3xl font-bold">Reading Lists</h1>

      <Link
        to={`/lists/new`}
        className="btn"
      // role="button"
      >
        New List
      </Link>

      <p className="text-lg text-gray-600">
        Welcome to the Lists page. Here you can view and manage your lists.
      </p>

      <CardGrid>
        {lists.map((list) => <ReadingList key={list.id} list={list} />)}
      </CardGrid>
    </>
  );
}