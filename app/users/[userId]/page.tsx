import {prisma} from "@/lib/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import UserClient from "@/app/users/[userId]/userClient";
import {UserScheme} from "@/types";
import {Metadata} from "next";


export async function generateMetadata({ params }: { params: Promise<{ userId: string }>}): Promise<Metadata> {
    const { userId } = await params
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            image: true,
            introduction: true,
        }
    })

    if (!user) {
        return {
            title: "ユーザーが見つかりません",
            description: "指定されたユーザーは存在しません。",
        }
    }

    return {
        title: 'Cluee - '+user.name,
        description: user.introduction?.replace(/<[^>]+>/g, "").slice(0, 150) || '',
        openGraph: {
            title: 'Cluee - '+user.name,
            description: user.introduction?.replace(/<[^>]+>/g, "").slice(0, 150) || '',
            url: `https://givemetips.net/user/${user.id}`,
            siteName: "Cluee",
            images: [
                {
                    url: user.image || "https://tips-image.s3.ap-northeast-1.amazonaws.com/tips-image/initial-profile.jpeg",
                    width: 400,
                    height: 400,
                    alt: user.name,
                },
            ],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: 'Cluee - '+user.name,
            description: user.introduction?.replace(/<[^>]+>/g, "").slice(0, 150) || '',
            images: user.image || "https://tips-image.s3.ap-northeast-1.amazonaws.com/tips-image/initial-profile.jpeg",
        },
    }
}



export default async function Page({ params }: { params: Promise<{ userId: string }>}) {
    const { userId } = await params

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            image: true,
            introduction: true,
            followers: true,
            followings: true,
        }
    })

    if (!user) {
        return <p>ユーザーが存在しません。</p>
    }

    return (
        <UserClient user={replaceAllDatesToIsoString(user as unknown as UserScheme)} />
    )
}
