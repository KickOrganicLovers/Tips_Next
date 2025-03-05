import {Article, Category, Like, UserProfile} from "@prisma/client";


export interface LoginStatusScheme{
    isLoggedIn: boolean
    error: string
    userProfile: UserProfileScheme
}

export interface UserProfileScheme extends UserProfile{
    userId: number
    username: string
    profileImageUrl: string
    introduction: string
}


export interface ArticleScheme extends Article{
    id: number
    title: string
    thumbnailImageUrl: string
    contents: string
    tags: string[]
    categoryId: number
    authorId: number
    authorProfile: UserProfileScheme
    likes: LikeScheme[]
    comments: CommentScheme[]
}

export interface CategoryScheme extends Category{
    id: number
    category: string
    parentId: number | null
    children: CategoryScheme[] | null
}

export interface LikeScheme extends Like {
    id: string
    userId: number
    userProfile?: UserProfileScheme
    articleId: number
    article?: ArticleScheme
    createdAt: Date
}

export interface CommentScheme extends Comment {
    id: string
    userId: number
    userProfile?: UserProfileScheme
    articleId: number
    article?: ArticleScheme
    contents: string
    createdAt: Date
}
