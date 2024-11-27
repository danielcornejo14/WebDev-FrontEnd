export interface Category {
    id: number | string;
    name: string;
    selected?: boolean;
    subcategories: Category[];
}