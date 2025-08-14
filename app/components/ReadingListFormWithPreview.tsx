import { useState } from "react";
import { Form } from "react-router";
import ReadingList from "./ReadingList";
import type { List } from "~/types/List";

interface ReadingListFormWithPreviewProps {
    // TODO: Update actionData type
    actionData: any,
    list: List,
    actionText: string,
    showPreviewViewButton?: boolean;
}

export default function ReadingListFormWithPreview({
    actionData,
    list,
    actionText,
    showPreviewViewButton = true,
}: ReadingListFormWithPreviewProps) {
    const [listName, setListName] = useState(list?.name || "");
    const listPreview: List = { ...list, name: listName };

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
                <h2 className="text-2xl font-bold">{actionText}</h2>
                
                <Form
                    method="post"
                    className="shadow-md border border-gray-200 p-6 rounded-lg"
                >
                    <p className="my-4">
                        <label htmlFor="name" className="block text-lg font-medium">
                            List name:
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="border border-gray-300 text-lg p-2 mt-2"
                            defaultValue={list?.name}
                            onChange={(e) => setListName(e.target.value)}
                        />
                    </p>

                    {actionData?.error && (
                        <p>{actionData.error}</p>
                    )}

                    <p>
                        <input
                            type="submit"
                            value={actionText}
                            className="bg-blue-500 text-white text-sm font-medium rounded px-4 py-2 hover:bg-blue-600 transition text-center"
                        />
                    </p>
                </Form>
            </div>

            <div className="flex-1">
                <h2 className="text-2xl font-bold">Preview</h2>

                <ReadingList
                    list={listPreview}
                    showPreviewViewButton={showPreviewViewButton}
                />
            </div>
        </div>
    );
}
