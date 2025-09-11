import { redirect, useActionData, type ClientActionFunctionArgs } from "react-router";
import ReadingListFormWithPreview from "~/components/ReadingListFormWithPreview";
import { fetchAuthenticated } from "~/utils/authentication";
import type { List } from "~/types/List";
import { Authenticated } from "~/components/Authenticated";
import * as config from "~/config";

export async function clientAction({ request }: ClientActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");

    if (!name || typeof name !== "string") {
        return {
            error: "List name is required"
        };
    }

    let response;
    try {
        response = await fetchAuthenticated("/v1/lists", {
            method: "POST",
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

    return redirect(config.ROUTES.LISTS.SHOW.PATH(list.id));
}

export default function NewList() {
    const actionData = useActionData<typeof clientAction>();
    const newList: List = { id: 0, name: "", thumbnail: `https://placehold.co/400x400?text=Preview` };

    // TODO: Update thumbnail on list name change?

    return (
        <Authenticated>
            <ReadingListFormWithPreview
                actionData={actionData}
                list={newList}
                actionText="Create New List"
                showPreviewViewButton={false}
            />
        </Authenticated>
    )
}