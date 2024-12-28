import {Document} from "mongodb";


export interface LoginStatusScheme {
    isLoggedIn: boolean
    error: string
    userStatus: UserStatusScheme
}

export interface UserStatusScheme {
    id: number
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
