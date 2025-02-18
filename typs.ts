

export interface LoginStatusScheme{
    isLoggedIn: boolean
    error: string
    userProfile: UserProfileScheme
}

export interface UserProfileScheme {
    userId: number
    username: string
    profileImageUrl: string
    introduction: string
}

export interface CategoryScheme {
    cardName: string
    details: string[]
}

export interface ArticleScheme {
    id: number
    title: string
    thumbnailImageUrl: string
    contents: string
    tags: string[]
    categoryId: number
    authorId: number
    authorName?: string
    authorProfileImageUrl?: string
}

export interface Category {
    id: number
    category: string
    parentId?: number
    children?: Category[]
}

