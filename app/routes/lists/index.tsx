import * as config from "~/config";
import { Link, useLoaderData, type ClientLoaderFunctionArgs,  } from "react-router";
import { Authenticated } from "~/components/Authenticated";
import CardGrid from "~/components/CardGrid";
import ReadingList from "~/components/ReadingList";
import { fetchAuthenticated } from "~/utils/authentication";
import type { List } from "~/types/List";

export async function clientLoader({ request }: ClientLoaderFunctionArgs): Promise<List[]> {
  const response = await fetchAuthenticated("/v1/lists");
  if (!response.ok) {
    throw new Error("Failed to fetch lists");
  }

  const data: List[] = await response.json();
  return data;
}

export default function ListsIndex() {
  const lists = useLoaderData<typeof clientLoader>();

  return (
    <Authenticated>
      <h1 className="text-3xl font-bold">Reading Lists</h1>

      <Link
        to={config.ROUTES.LISTS.NEW}
        className="btn"
      >
        New List
      </Link>

      <p className="text-lg text-gray-600">
        Welcome to the Lists page. Here you can view and manage your lists.
      </p>

      <CardGrid>
        {lists.map((list) => <ReadingList key={list.id} list={list} />)}
      </CardGrid>
    </Authenticated>
  );
}