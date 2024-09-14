import React, { Suspense } from 'react';
import { LandingBody } from './LandingBody';

export default async function Home({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <main className='flex flex-col'>
      <div className='flex min-h-[80vh] flex-col p-4 sm:p-8'>
        <a href='/1' className='mb-1'>
          <img
            src='/y18.svg'
            alt='y18'
            className='w-5 h-5 border border-white border-[0.5px]'
          />
        </a>
        <Suspense
          fallback={<div className='text-gray-500 mt-12'>Loading...</div>}
        >
          <LandingBody slug={slug} />
        </Suspense>
      </div>
    </main>
  );
}
