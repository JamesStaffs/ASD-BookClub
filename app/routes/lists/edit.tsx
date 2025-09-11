import * as config from "~/config";
import { redirect, useActionData, useLoaderData, type ClientActionFunctionArgs, type ClientLoaderFunctionArgs } from "react-router";
import ReadingListFormWithPreview from "~/components/ReadingListFormWithPreview";
import { fetchAuthenticated } from "~/utils/authentication";
import type { List } from "~/types/List";
import { Authenticated } from "~/components/Authenticated";

export async function clientLoader({ request, params }: ClientLoaderFunctionArgs): Promise<List> {
    const { id } = params;
    if (!id) {
        throw new Response("List ID is required", { status: 400 });
    }

    const listResponse = await fetchAuthenticated(`/v1/lists/${id}`);
    if (!listResponse.ok) {
        throw new Response("Failed to fetch list", { status: listResponse.status });
    }

    const list: List = await listResponse.json();
    return list;
}

export async function clientAction({ params, request }: ClientActionFunctionArgs) {
    const { id } = params;
    const formData = await request.formData();
    const name = formData.get("name");

    if (!id) {
        return {
            error: "List ID is required"
        };
    }

    if (!name) {
        return {
            error: "Name is required"
        };
    }

    const response = await fetchAuthenticated(`/v1/lists/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name })
    });

    if (!response.ok) {
        return {
            error: "Failed to update list"
        };
    }

    return redirect(config.ROUTES.LISTS.SHOW.PATH(id));
}

export default function EditList() {
    const list = useLoaderData<typeof clientLoader>();
    const actionData = useActionData<typeof clientAction>();

    return (
        <Authenticated>
            <ReadingListFormWithPreview
                actionData={actionData}
                list={list}
                actionText="Update List"
            />
        </Authenticated>
    )
}