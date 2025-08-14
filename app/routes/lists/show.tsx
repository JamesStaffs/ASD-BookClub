import { Form, Link, redirect, useActionData, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import type { List } from "~/types/List";
import type { Book } from "~/types/Book";
import CardWithImage from "~/components/CardWithImage";
import CardGrid from "~/components/CardGrid";

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
      <h1 className="text-3xl font-bold">
        { list.name }
      </h1>

      <Link
        to={`/lists/${ list.id }/edit`}
        className="btn mr-2"
      >
        Edit
      </Link>

      <Form
        method="post"
        className="inline-block"
      >
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
            className="btn btn-danger"
          />
        </p>
      </Form>

      <h2 className="text-2xl font-medium mt-6 my-2 underline">
        Books in this list
      </h2>

      { list.books.length > 0 ? (
        <CardGrid>
          { list.books.map(book => (
            // TODO: Create book show view?
            <CardWithImage
              key={book.id}
              linkHref={`/books/${book.id}`}
              linkAriaDescription={`View details for ${book.name}`}
              linkTitle={`Details for ${book.name}`}
              img={<img src={book.thumbnail} alt={book.name} />}
            >
              <h3 className="text-lg font-semibold">{ book.name }</h3>
              <p>by { book.author }</p>
              <p>{ book.description }</p>
            </CardWithImage>
          )) }
        </CardGrid>
      ) : (
        <p>There are currently no books to display for this list.</p>
      ) }
    </>
  );
}