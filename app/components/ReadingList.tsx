import { Link } from "react-router";
import styles from "~/styles/ReadingList.module.css";

interface ReadingListProps {
    list: {
        id: number;
        name: string;
        thumbnail: string;
    }
}

export default function ReadingList({ list }: ReadingListProps) {

    return (
        <Link
            to={`/lists/${list.id}`}
            key={list.id}
            className={styles.card}
            title={`${list.name}`}
            aria-description={`${list.name}`}
        >
            <img
                src={list.thumbnail}
                alt={`${list.name} thumbnail`}
            />

            <p>{list.name}</p>

            <span
                className={styles.btn}
                aria-hidden="true"
            >
                View List
            </span>
        </Link>
    );
}