'use client'

import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {redirect} from "next/navigation";

export default function Page() {
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>(state => state.LoginStatus);

    if(LoginStatus.userProfile.userId) {
        redirect(`/userProfile/${LoginStatus.userProfile.userId}`);
    }else {
        redirect('/login');
    }
}
