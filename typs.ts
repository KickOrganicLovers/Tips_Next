import {Document} from "mongodb";


export interface LoginStatusScheme {
    isLoggedIn: boolean
    errorMessage: string
    userStatus: UserStatusScheme
}

export interface UserStatusScheme {
    userNumber: number
    userName: string
    profileImageUrl: string
    introduction: string
}

export interface CategoryScheme {
    cardName: string
    details: string[]
}

export interface ArticleScheme extends Document{
    title: string
    thumbnailImgUrl: string
    sentence: string
    author: string
}