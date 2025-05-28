// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectHome() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/Home');
  }, [router]);
  return null;
}
