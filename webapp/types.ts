
export interface UserScheme{
    id: string
    name: string
    image: string
    introduction: string
    likesForArticle: LikeForArticleScheme[]
    likesForComment: LikeForCommentScheme[]
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
    tags: TagScheme[]
    categoryId: string
    authorId: string
    author: UserScheme
    likes: LikeForArticleScheme[]
    comments: CommentScheme[]
    watchHistories: WatchHistoryScheme[]
    category: CategoryScheme
    createdAt: string
}

export interface ArticleSchemeWithPrefix {
    id?: string
    title: string
    thumbnailImageAsBase64?: string
    thumbnailImageUrl?: string
    contents: string
    previousContents?: string
    tags: string[]
    categoryId: string,
    category?: CategoryScheme
    authorId: string
}

export interface TagScheme{
    id: string
    tagName: string
}

export interface CategoryScheme{
    id: string
    categoryName: string
    parentId: string | null
    children: CategoryScheme[] | null
}

export interface LikeForArticleScheme {
    id: string
    userId: string
    user?: UserScheme
    articleId: string
    article?: ArticleScheme
    createdAt: string
}

export interface LikeForCommentScheme {
    id: string
    userId: string
    user?: UserScheme
    commentId: string
    comment?: CommentScheme
    createdAt: string
}

export interface CommentScheme{
    id: string
    userId: string
    user?: UserScheme
    articleId: string
    article?: ArticleScheme
    contents: string
    likes: LikeForCommentScheme[]
    createdAt: Date
}

export interface FollowScheme{
    id: string,
    followingId: string,
    following?: UserScheme
    followerId: string,
    follower?: UserScheme
    createdAt: string
}

export interface WatchHistoryScheme{
    id: string
    userId: string
    user?: UserScheme
    articleId: string
    article?: ArticleScheme
    contents: string
    createdAt: string
}

export interface ErrorScheme {
    message: string,
    code: string
}

export interface ToolButtonStatusScheme {
    decorations : {
        bold: boolean,
        underline: boolean,
        italic: boolean,
        strike: boolean,
        heading_1: boolean,
        heading_2: boolean,
        highlight: boolean,
        codeBlock: boolean,
        bulletList: boolean,
        orderedList: boolean,
        textAlign_left: boolean,
        textAlign_center: boolean,
        textAlign_right: boolean,
        blockQuote: boolean,
    }
    controls: {
        image: boolean,
        link: boolean,
        settings: boolean,
        upload: boolean,
        cancel: boolean,
    }
}

export type SettingsMode = 'default' | 'logout' | 'changeTheme' | 'deleteAccount'
