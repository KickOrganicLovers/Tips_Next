import {CategoryScheme} from "@/types";

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

export const isToday = (date: string | Date): boolean => {
    const target = new Date(date);
    const today =  new Date();

    return target.getFullYear() === today.getFullYear() &&
        target.getMonth() === today.getMonth() &&
        target.getDate() === today.getDate();
}

export const stripTags = (htmlString: string)=> {
    let doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
}
