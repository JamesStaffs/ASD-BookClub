import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");

    if (!name || typeof name !== "string") {
        return {
            error: "List name is required"
        };
    }

    let response;
    try {
        response = await fetch("https://687a1addabb83744b7eb7154.mockapi.io/api/v1/lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                thumbnail: `https://placehold.co/400x400?text=${encodeURIComponent(name)}`
            })
        });
    } catch (e) {
        return {
            error: "Failed to create list"
        };
    }

    if (!response.ok) {
        return {
            error: "Failed to create list"
        };
    }

    const list = await response.json();

    return redirect(`/lists/${list.id}`);
}

export default function NewList() {
    const actionData = useActionData<typeof action>();

    return (
        <>
            <h1>Create a List</h1>

            <Form method="post">
                <p>
                    <label htmlFor="name">
                        List name:
                    </label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                    />
                </p>

                { actionData?.error && (
                    <p>{ actionData.error }</p>
                )}

                <p>
                    <input
                        type="submit"
                        value="Create List"
                    />
                </p>
            </Form>
        </>
    )
}