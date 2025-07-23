export interface Book {
    createdAt: string;
    name: string;
    thumbnail: string;
    isbn: string;
    description: string;
    rating: number;
    approved: boolean;
    author: string;
    id: number;
    listId: number;
}