'use client'

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {

    axios.post('/api/auth/logout')
    .then(() => {
        dispatch(login({ authenticated: false, user_type:'guest' }));
        router.push('/login');
    })
    .catch(() => {
        router.push('/');
    });
  }, []);

  return null;
}