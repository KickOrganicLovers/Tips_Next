import {MeiliSearch} from "meilisearch";

const globalForMeili = globalThis as unknown as { meili?: MeiliSearch };

export const meili = globalForMeili.meili ?? new MeiliSearch({
    host: 'http://meilisearch:7700',
    apiKey: process.env.MEILI_PASSWORD
});

if (process.env.NODE_ENV !== "production") globalForMeili.meili = meili;
