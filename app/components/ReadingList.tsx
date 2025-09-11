import * as config from "~/config";
import CardWithImage from "./CardWithImage";
interface ReadingListProps {
    list: {
        id: number;
        name: string;
        thumbnail: string;
    },
    showPreviewViewButton?: boolean;
}

export default function ReadingList({ list, showPreviewViewButton = true }: ReadingListProps) {
    return (
        <CardWithImage
            linkHref={config.ROUTES.LISTS.SHOW.PATH(list.id)}
            linkAriaDescription={`${list.name} reading list`}
            linkTitle={`${list.name} reading list`}
            img={
                <img
                    src={list.thumbnail}
                    alt={`${list.name} thumbnail`}
                />
            }
        >
            <div className="flex flex-col h-full">
                <p>{list.name}</p>

                {showPreviewViewButton && (
                    <span
                        className="btn mt-auto"
                        aria-hidden="true"
                    >
                        View List
                    </span>
                )}
            </div>
        </CardWithImage>
    );
}