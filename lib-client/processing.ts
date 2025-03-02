import {CategoryScheme} from "@/typs";

export const findCategoryById = (categories: CategoryScheme[], id: number): CategoryScheme | undefined => {
    for (const category of categories) {
        if (category.id === id) {
            return category;
        }
        if (category.children) {
            const found = findCategoryById(category.children, id);
            if (found) {
                return found;
            }
        }
    }
    return
}
