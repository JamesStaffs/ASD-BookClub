import { Link, useLoaderData } from "react-router";
import type { List } from "~/types/List";

export async function loader(): Promise<List[]> {
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
      <h1>Lists Index</h1>

      <ul>
        <li><Link to={`/lists/new`}>New List</Link></li>
      </ul>
      <hr />

      <p>Welcome to the Lists page. Here you can view and manage your lists.</p>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            {list.name} <Link to={`/lists/${list.id}`}>View</Link>
            <img src={list.thumbnail} alt={`${list.name} thumbnail`} />
          </li>
        ))}
      </ul>
    </>
  );
}