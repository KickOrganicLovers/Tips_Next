import {NextResponse} from "next/server";
import {meili} from "@/lib/lib-server/meili";
import {handleServerError} from "@/lib/lib-server/processing";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = decodeURIComponent(searchParams.get("search_query") as string) || "";


    if(!query.startsWith('#')){
        if (query.length < 1) return NextResponse.json({suggestions: []}, {status: 200});
        const index_searchHistory = meili.index("search_history")
        try{
            // 人気度順で検索
            const results_searchHistory = await index_searchHistory.search(query, {
            });

            const suggestions = results_searchHistory.hits.map((hit) => hit.query);


            return NextResponse.json({suggestions, isTag: false}, {status: 200});

        }catch(error) {
            return handleServerError(error)
        }
    }else{
        if (query.length < 2) return NextResponse.json({suggestions: []}, {status:200});

        const index_tags = meili.index("tags")
        try{
            const results_tags = await index_tags.search(query.slice(1), {})
            const suggestions = results_tags.hits.map((hit) => hit.name);
            console.log(suggestions)
            return NextResponse.json({suggestions, isTag: true}, {status: 200});
        }
        catch(error) {
            return handleServerError(error)
        }
    }
}
