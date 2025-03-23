

export interface LoginStatusScheme{
    isLoggedIn: boolean
    error: string
    userProfile: UserProfileScheme
}

export interface UserProfileScheme{
    userId: string
    username: string
    profileImageUrl: string
    introduction: string
    likes: LikeScheme[]
    followings: FollowScheme[]
    followers: FollowScheme[]
    articleCreatedBy: ArticleScheme[]
    watchHistories: WatchHistoryScheme[]
    createdAt: string
}


export interface ArticleScheme{
    id: string
    title: string
    thumbnailImageUrl: string
    contents: string
    tags: string[]
    categoryId: number
    authorId: string
    authorProfile: UserProfileScheme
    likes: LikeScheme[]
    comments: CommentScheme[]
    watchHistories: WatchHistoryScheme[]
    category: CategoryScheme
    createdAt: string
}

export interface CategoryScheme{
    id: number
    categoryName: string
    parentId: number | null
    children: CategoryScheme[] | null
}

export interface LikeScheme{
    id: string
    userId: string
    userProfile?: UserProfileScheme
    articleId: string
    article?: ArticleScheme
    createdAt: string
}

export interface CommentScheme{
    id: string
    userId: string
    userProfile?: UserProfileScheme
    articleId: string
    article?: ArticleScheme
    contents: string
    createdAt: Date
}

export interface FollowScheme{
    id: string,
    following: string,
    followingWithProfile?: UserProfileScheme
    follower: string,
    followerWithProfile?: UserProfileScheme
    createdAt: string
}

export interface WatchHistoryScheme{
    id: string
    userId: string
    userProfile?: UserProfileScheme
    articleId: string
    article?: ArticleScheme
    contents: string
    createdAt: string
}
