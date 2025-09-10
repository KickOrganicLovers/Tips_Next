import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const tech = await prisma.category.upsert({
        where: { categoryName: 'Test1' },   // 一意制約があるフィールドを指定
        update: {},                         // 既存なら何も更新しない
        create: { categoryName: 'Test1' },  // なければ作成
    })

    const science = await prisma.category.upsert({
        where: { categoryName: 'Test2' },
        update: {},
        create: { categoryName: 'Test2' },
    })

    await prisma.category.upsert({
        where: { categoryName: 'Test1-1' },
        update: {},
        create: { categoryName: 'Test1-1', parentId: tech.id },
    })

    await prisma.category.upsert({
        where: { categoryName: 'Test2-1' },
        update: {},
        create: { categoryName: 'Test2-1', parentId: science.id },
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
