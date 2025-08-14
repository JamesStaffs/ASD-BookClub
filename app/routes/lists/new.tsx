import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router";
import ReadingListFormWithPreview from "~/components/ReadingListFormWithPreview";
import type { List } from "~/types/List";

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
    const newList: List = { id: 0, name: "", thumbnail: `https://placehold.co/400x400?text=Preview` };

    // TODO: Update thumbnail on list name change?

    return (
        <>
            <ReadingListFormWithPreview
                actionData={actionData}
                list={newList}
                actionText="Create New List"
                showPreviewViewButton={false}
            />
        </>
    )
}