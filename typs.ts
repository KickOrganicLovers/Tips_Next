import {Document} from "mongodb";


export interface LoginStatusScheme {
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

export interface ArticleScheme extends Document {
    title: string
    thumbnailImgUrl: string
    sentence: string
    author: string
}
