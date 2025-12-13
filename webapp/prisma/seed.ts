import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // 大カテゴリと子カテゴリの定義
    const categories = [
        {
            name: "テクノロジー",
            children: ["プログラミング","Web開発","モバイルアプリ","AI・機械学習","データサイエンス","サイバーセキュリティ","インフラ・DevOps","ガジェット・IoT"]
        },
        {
            name: "ビジネス",
            children: ["起業","マーケティング","経営","金融","働き方","法律"]
        },
        {
            name: "学問",
            children: ["数学","物理","化学","生物","医学","歴史","哲学","政治","社会学"]
        },
        {
            name: "アート",
            children: ["デザイン","イラスト","写真","音楽","映像","文学"]
        },
        {
            name: "ライフスタイル",
            children: ["健康","フィットネス","料理","グルメ","旅行","ファッション","住まい","美容"]
        },
        {
            name: "エンタメ",
            children: ["アニメ","マンガ","ゲーム","スポーツ","映画","ドラマ","本","レビュー","DIY"]
        },
        {
            name: "社会",
            children: ["ニュース","国際","地域","環境","SDGs","経済動向"]
        },
        {
            name: "教育",
            children: ["語学","資格","受験","学習法","教育論"]
        },
        {
            name: "ライフハック",
            children: ["時間管理","生産性","お金","ITツール","心理学"]
        }
    ]

    for (const cat of categories) {
        // 親カテゴリを upsert
        const parent = await prisma.category.upsert({
            where: { categoryName: cat.name },
            update: {},
            create: { categoryName: cat.name }
        })

        // 子カテゴリを upsert
        for (const child of cat.children) {
            await prisma.category.upsert({
                where: { categoryName: child },
                update: {},
                create: { categoryName: child, parentId: parent.id }
            })
        }
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
