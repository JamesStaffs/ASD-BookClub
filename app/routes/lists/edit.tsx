import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import ReadingList from "~/components/ReadingList";
import ReadingListFormWithPreview from "~/components/ReadingListFormWithPreview";
import { getUserId } from "~/services/session.server";
import type { List } from "~/types/List";

export async function loader({ request, params }: LoaderFunctionArgs): Promise<List> {
    const userId = await getUserId(request);
    if (!userId) {
        throw redirect("/auth/login");
    }

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

// TODO: Add return type
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
            <ReadingListFormWithPreview
                actionData={actionData}
                list={list}
                actionText="Update List"
            />
        </>
    )
}