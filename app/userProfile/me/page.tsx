'use client'

import {redirect} from "next/navigation";
import LoginStatusStore from "@/lib/lib-client/stores/loginStatusStore";

export default function Page() {
    const loginStatus = LoginStatusStore((state) => state.loginStatus)

    if (loginStatus.userProfile.userId) {
        redirect(`/userProfile/${loginStatus.userProfile.userId}`);
    }else {
        redirect('/login');
    }
}
