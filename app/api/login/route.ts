import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    console.log('chimpo')
    return NextResponse.json({test: 'chinpo'}, {status: 200})
}