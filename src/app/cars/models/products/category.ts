export interface Category {
    name: string;
    selected?: boolean;
    subcategories: Category[];
}