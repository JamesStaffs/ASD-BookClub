import { Link } from "react-router";
import styles from "~/styles/CardWithImage.module.css";

interface CardWithImageProps {
    linkHref: string;
    linkAriaDescription: string;
    linkTitle: string;
    img: React.ReactElement<HTMLImageElement>
    children: React.ReactNode;
}

export default function CardWithImage({ 
    linkHref,
    linkAriaDescription,
    linkTitle,
    img,
    children
 }: CardWithImageProps) {

    return (
        <Link
            to={linkHref}
            className={styles.card}
            title={linkTitle}
            aria-description={linkAriaDescription}
            // aria-label={linkAriaDescription}
        >
            {img}
            <span className={styles.container}>
                {children}
            </span>
        </Link>
    );
}