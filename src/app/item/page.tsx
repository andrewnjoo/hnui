'use client';

import { redirect, useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  redirect(`https://news.ycombinator.com/item?id=${id}`);
}
