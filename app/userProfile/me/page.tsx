'use client'

import {redirect} from "next/navigation";
import {useUserProfileStore} from "@/lib/lib-client/stores/userProfileStore";
import {useSession} from "next-auth/react";

export default function Page() {
    const userProfile = useUserProfileStore(state => state.userProfile);
    const session = useSession();

    if (session.status ==='authenticated' && userProfile.userId) {
        redirect(`/userProfile/${userProfile.userId}`);
    }else {
        redirect('/login');
    }
}
