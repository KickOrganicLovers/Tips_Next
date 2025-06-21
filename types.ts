
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

export interface ArticleEditorStatusScheme {
    decorations : {
        bold: {
            isActive: boolean
            variable: boolean
        }
        underline: {
            isActive: boolean
            variable: boolean
        }
        italic: {
            isActive: boolean
            variable: boolean
        }
        strike: {
            isActive: boolean
            variable: boolean
        }
        heading_1: {
            isActive: boolean
            variable: boolean
        }
        heading_2: {
            isActive: boolean
            variable: boolean
        }
        highlight: {
            isActive: boolean
            variable: boolean
        }
        codeBlock: {
            isActive: boolean
            variable: boolean
        }
        bulletList: {
            isActive: boolean
            variable: boolean
        }
        orderedList: {
            isActive: boolean
            variable: boolean
        },
        textAlign_left: {
            isActive: boolean
            variable: boolean
        }
        textAlign_center: {
            isActive: boolean
            variable: boolean
        }
        textAlign_right: {
            isActive: boolean
            variable: boolean
        }
        blockQuote: {
            isActive: boolean
            variable: boolean
        }
    }
    controls: {
        image: {
            isActive?: boolean
            variable: boolean
        }
        link: {
            isActive?: boolean
            variable: boolean
        }
        settings: {
            isActive?: boolean
            variable: boolean
        }
        upload: {
            isActive?: boolean
            variable: boolean
        }
        cancel: {
            isActive?: boolean
            variable: boolean
        }

    }
}
