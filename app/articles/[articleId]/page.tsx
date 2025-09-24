import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import {ArticleScheme} from "@/types";
import ArticleClient from "@/app/articles/[articleId]/articleClient";
import {prisma} from "@/lib/lib-server/prisma";
import {Metadata} from "next";
import {stripTags} from "@/lib/lib-client/processing";
import {replaceAllDatesToIsoString} from "@/lib/lib-server/processing";


export async function generateMetadata({ params }: { params: Promise<{ articleId: string }> }): Promise<Metadata> {
    const {articleId} = await params

    const article = await prisma.article.findUnique({
        where: { id: articleId },
        include: { author: true, category: true, tags: true },
    })

    if (!article) {
        return {
            title: "記事が見つかりません",
            description: "指定された記事は存在しません。",
        }
    }

    return {
        title: 'Cluee - ' + article.title,
        description: article.contents.replace(/<[^>]+>/g, "").slice(0, 150),
        openGraph: {
            title: 'Cluee - ' + article.title,
            description: article.contents.replace(/<[^>]+>/g, "").slice(0, 150),
            url: `https://givemetips.net/articles/${article.id}`,
            siteName: "Cluee",
            images: [
                {
                    url: article.thumbnailImageUrl || "https://tips-image.s3.ap-northeast-1.amazonaws.com/tips-image/initial-thumbnail.jpeg",
                    width: 600,
                    height: 400,
                    alt: article.title,
                },
            ],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: 'Cluee - ' + article.title,
            description: article.contents.replace(/<[^>]+>/g, "").slice(0, 150),
            images: [article.thumbnailImageUrl || "https://tips-image.s3.ap-northeast-1.amazonaws.com/tips-image/initial-thumbnail.jpeg"],
        },
    }
}


export default async function Page({ params }: { params: Promise<{ articleId: string }>}) {
    const { articleId } = await params

    const article = await prisma.article.findUnique({
        where: { id: articleId },
        include: {
            author: {
                include: {
                    followers: true,
                    followings: true
                }
            },
            likes: true,
            comments: {
                include: {
                    user: true,
                    likes: true,
                },
            },
            watchHistories: true,
            category: true,
            tags: true,
        }
    })

    if (!article) {
        return <p>記事が存在しません。</p>
    }

    return (
        <ArticleClient article={replaceAllDatesToIsoString(article as unknown as ArticleScheme)} />
    )
}
