'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import NProgress from 'nprogress';


export default function RouteProgress() {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.configure({ showSpinner: false, parent: 'header'});
        NProgress.start();

        // ページ描画後（＝この useEffect のレンダリング後）に done
        const handle = requestAnimationFrame(() => {
            NProgress.done();
        });

        return () => cancelAnimationFrame(handle); // クリーンアップ
    }, [pathname]);

    return null;
}
