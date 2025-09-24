import {Suspense} from "react";
import SearchClient from "@/app/search/searchClient";

export default function Page() {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <SearchClient />
        </Suspense>
    )
}
