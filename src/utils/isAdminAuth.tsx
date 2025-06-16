"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setAuthData, setLoadingState } from "@/lib/features/auth/authSlice";
import { FullPageLoader } from "@/components/FullPageLoader";
import axios from "axios";

export default function isAdminAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth_data = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!auth_data.attempted_auth && !auth_data.loading){
            dispatch(setLoadingState(true));

            axios.get('/api/auth/status')
            .then(res => {
                const { authenticated, user_type } = res.data;
                dispatch(setAuthData({ authenticated, user_type }));
            })
            .catch(() => {
                return redirect("/admin/login");
            })
            .finally(() => {
                dispatch(setLoadingState(false));
            })
        }
        else if (!auth_data.loading && !auth_data.authenticated) {
            return redirect("/admin/login");
        }
    }, [auth_data.attempted_auth, auth_data.authenticated]);

    if (auth_data.loading) {
      return <FullPageLoader />;
    }

    if(!auth_data.authenticated){
        return null;
    }

    if(auth_data.user_type === 'user'){
        return redirect("/");
    }

    return <Component {...props} />;
  };
}