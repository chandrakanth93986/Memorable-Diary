'use client'

import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  const status = session.status

  if (status === 'loading') {
    return <div className='h-screen bg-diary text-white text-3xl flex justify-center items-center'>Loading...</div>
  }

  return (
    <div>

    </div>
  );
}
