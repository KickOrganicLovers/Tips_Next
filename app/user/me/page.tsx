'use client'

import {redirect} from "next/navigation";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useSession} from "next-auth/react";

export default function Page() {
    const user = useUserStore(state => state.user);
    const session = useSession();

    if (session.status ==='authenticated' && user.id) {
        redirect(`/user/${user.id}`);
    }else {
        // redirect('/login');
    }
}
