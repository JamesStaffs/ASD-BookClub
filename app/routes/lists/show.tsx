import { Form, Link, redirect, useActionData, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import type { List } from "~/types/List";
import type { Book } from "~/types/Book";

type ListWithBooks = List & { books: Book[] };

export async function loader({ params }: LoaderFunctionArgs): Promise<ListWithBooks> {
  const { id } = params;
  if (!id) {
    throw new Response("List ID is required", { status: 400 });
  }
  
  const [listResponse, booksResponse] = await Promise.all([
    fetch(`https://687a1addabb83744b7eb7154.mockapi.io/api/v1/lists/${id}`),
    fetch(`https://687a1addabb83744b7eb7154.mockapi.io/api/v1/lists/${id}/books`)
  ]);

  if (!listResponse.ok) {
    throw new Response("Failed to fetch list", { status: listResponse.status });
  }

  const [list, books] = await Promise.all([
    listResponse.json() as Promise<List>,
    booksResponse.ok ? booksResponse.json() : Promise.resolve([]) as Promise<Book[]>
  ]);

  return { ...list, books };
}

export async function action({ params, request}: ActionFunctionArgs) {
  const { id } = params;
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    const response = await fetch(`https://687a1addabb83744b7eb7154.mockapi.io/api/v1/lists/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      return {
        error: "Failed to delete list"
      }
    }

    return redirect(`/lists`);
  }

  return null;
}

export default function ListDetail() {
  const list = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  
  return (
    <>
      <h1>{ list.name }</h1>
      <ul>
        <li><Link to={`/lists/${ list.id }/edit`}>Edit</Link></li>
      </ul>

      <Form method="post">
        <input
          type="hidden"
          name="intent"
          value="delete"
        />

        { actionData?.error && (
          <p>{ actionData.error }</p>
        ) }

        <p>
          <input
            type="submit"
            value="Delete list"
            onClick={ e => {
              if (!confirm("Are you sure that you want to delete this list?")) {
                e.preventDefault();
              }
            }}
          />
        </p>
      </Form>

      <hr />

      { list.books.length > 0 ? (
        <>
          { list.books.map(book => (
            <div key={book.id}>
              <img
                src={book.thumbnail}
                alt={book.name}
                width={100}
                height={100}
              />

              <h3>{ book.name }</h3>
              <p>by { book.author }</p>
              <p>{ book.description }</p>
            </div>
          )) }
        </>
      ) : (
        <p>There are currently no books to display for this list.</p>
      ) }
    </>
  );
}