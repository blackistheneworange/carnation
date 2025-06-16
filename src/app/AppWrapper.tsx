'use client'

import { Toast } from "@/components/Toast";
import { hideNotification } from "@/lib/features/notification/notificationSlice";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";


export default function AppWrapper({ children }: any) {
  const notification = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  const handleNotificationClose = () => {
    dispatch(hideNotification());
  }

  return (
    <main>
      {children}
      <Toast open={notification.open} message={notification.message} handleClose={handleNotificationClose} type={notification.type} />
    </main>
  );
}