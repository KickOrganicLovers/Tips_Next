import {NextResponse} from "next/server";
import {meili} from "@/lib-server/meili";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = decodeURIComponent(searchParams.get("search_query") as string) || "";

    console.log(query);

    if (query.length < 1) return NextResponse.json({ suggestions: [] });

    if(!query.startsWith('#')){
        console.log('hey!')
        const index_searchHistory = meili.index("search_history")
        try{
            // 人気度順で検索
            const results_searchHistory = await index_searchHistory.search(query, {
            });

            const suggestions = results_searchHistory.hits.map((hit) => hit.query);

            // console.log(`suggestions: ${suggestions}`)

            return NextResponse.json({suggestions, isTag: false, error: null}, {status: 200});

        }catch(error) {
            return NextResponse.json({suggestions: null, error: error}, {status: 400})
        }
    }else{
        console.log('wtf')

        const index_tags = meili.index("tags")
        try{
            const results_tags = await index_tags.search(query.slice(1), {})
            const suggestions = results_tags.hits.map((hit) => hit.name);
            console.log(suggestions)
            return NextResponse.json({suggestions, isTag: true, error: null}, {status: 200});
        }
        catch(error) {
            console.log('error' + error)
            return NextResponse.json({suggestions: null, error: error}, {status: 400})
        }
    }
}
