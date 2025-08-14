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
            linkHref={`/lists/${list.id}`}
            linkAriaDescription={`${list.name} reading list`}
            linkTitle={`${list.name} reading list`}
            img={
                <img
                    src={list.thumbnail}
                    alt={`${list.name} thumbnail`}
                />
            }
        >
            <p>{list.name}</p>

            {showPreviewViewButton && (
                <span
                    className="btn my-4 mt-auto"
                    aria-hidden="true"
                >
                    View List
                </span>
            )}
        </CardWithImage>
    );
}