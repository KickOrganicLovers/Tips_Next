'use client';

import { usePathname } from 'next/navigation';
import {useEffect, useRef} from 'react';
import NProgress from 'nprogress';
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";


export default function RouteProgress() {
    const pathname = usePathname();
    const previousPath = useRef(pathname)
    const whereIam = useWhereIamStore(state => state.whereIam);

    useEffect(() => {
        if(pathname !== previousPath.current) {
            NProgress.configure({ showSpinner: false, parent: 'header'});
            NProgress.start();
        }
    }, [pathname]);


    useEffect(() => {
        // ページ描画後（＝この useEffect のレンダリング後）に done
        const handle = requestAnimationFrame(() => {
            NProgress.done();
        });

        return () => cancelAnimationFrame(handle); // クリーンアップ
    }, [whereIam])

    return null;
}
