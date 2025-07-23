import { Form, redirect, useActionData, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import type { List } from "~/types/List";

export async function loader({ params }: LoaderFunctionArgs): Promise<List> {
    const { id } = params;

    if (!id) {
        throw new Response("List ID is required", { status: 400 });
    }
    
    const listResponse = await fetch(`https://687a1addabb83744b7eb7154.mockapi.io/api/v1/lists/${id}`);

    if (!listResponse.ok) {
        throw new Response("Failed to fetch list", { status: listResponse.status });
    }

    const list: List = await listResponse.json();
    return list;
}

export async function action({ params, request }: ActionFunctionArgs) {
    const { id } = params;
    const formData = await request.formData();
    const name = formData.get("name");

    if (!name) {
        return {
            error: "Name is required"
        };
    }

    const response = await fetch(`https://687a1addabb83744b7eb7154.mockapi.io/api/v1/lists/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    if (!response.ok) {
        return {
            error: "Failed to update list"
        };
    }

    return redirect(`/lists/${id}`);
}

export default function EditList() {
    const list = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();

    return (
        <>
            <h1>Edit List</h1>

            <Form method="post">
                <p>
                    <label htmlFor="name">
                        List name:
                    </label>

                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={list.name}
                    />
                </p>

                { actionData?.error && (
                    <p>{ actionData.error }</p>
                ) }

                <p>
                    <input type="submit" value="Update List" />
                </p>
            </Form>
        </>
    )
}