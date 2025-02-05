import { PrismaClient } from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const prisma = new PrismaClient()

    try{
        const updatedUserProfile = await prisma.userProfile.update({
            where: {
                userId: body.userId,
            },
            data: {
                username: body.username,
                profileImageUrl: body.profileImageUrl,
                introduction: body.introduction,
                ...(body.profileImageUrl !== undefined && { profileImageUrl: body.profileImageUrl }),
            }
        })

        if(updatedUserProfile){
            return NextResponse.json({updatedUserProfile: updatedUserProfile, error: undefined}, {status: 200})
        }else {
            return NextResponse.json({updatedUserProfile: undefined, error: 'user not found'}, {status: 404})
        }


    }catch (error){
        console.error(error)
        return NextResponse.json({updatedUserProfile: undefined, error: error}, {status: 404})
    }

}
