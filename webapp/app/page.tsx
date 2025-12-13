import RootClient from "@/app/rootClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cluee",
    description: "Clueeは知識やノウハウを共有する記事投稿サイトです。最新の技術情報や生活の知恵を見つけられます。",
    openGraph: {
        title: "Cluee",
        description: "Clueeは知識やノウハウを共有する記事投稿サイトです。",
        url: "https://givemetips.net/",
        siteName: "Cluee",
        images: [
            {
                url: "https://tips-image.s3.ap-northeast-1.amazonaws.com/tips-image/page-thumbnail.jpeg",
                width: 600,
                height: 400,
                alt: "Cluee Top Page",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Cluee",
        description: "Clueeは知識やノウハウを共有する記事投稿サイトです。",
        images: ["https://tips-image.s3.ap-northeast-1.amazonaws.com/tips-image/page-thumbnail.jpeg"],
    },
};

export default function Page() {
    return <RootClient />;
}
