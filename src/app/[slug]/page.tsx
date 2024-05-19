import React, { Suspense } from 'react';
import { Story } from '@/app/api/hn/route';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const getDomainFromUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain.replace(/^www\./, '');
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};

const getColorClass = (points: number) => {
  if (points >= 100) {
    return 'text-red-500';
  } else if (points >= 50) {
    return 'text-orange-500';
  } else {
    return 'text-gray-500';
  }
};

export default async function Home({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data } = await fetch(`${process.env.BASE_URL}/api/hn?p=${slug}`, {
    cache: 'no-store',
  }).then((res) => res.json());

  return (
    <main className='flex flex-col'>
      <Suspense>
        <div className='flex min-h-[80vh] flex-col justify-between p-4 sm:p-8'>
          <a href='/1'>
            <img
              src='/y18.svg'
              alt='y18'
              className='w-4 h-4 border border-white border-[0.5px]'
            />
          </a>
          {data && data?.length > 0 && (
            <div className='lg:w-[800px]'>
              <Table>
                <TableBody>
                  {data.map((story: Story) => (
                    <TableRow key={story.id}>
                      <TableCell>{story.comments}</TableCell>
                      <TableCell className={getColorClass(+story.points)}>
                        {story.points}
                      </TableCell>
                      <TableCell>
                        <a href={story.link}>{story.title}</a>
                        <span className='ml-1'>
                          {getDomainFromUrl(story.link)}
                        </span>
                        <span className='ml-1 text-gray-500'>
                          {story.timeAgo}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <a className='w-8 text-slate-300 text-sm ' href={`/${+slug + 1}`}>
                More
              </a>
            </div>
          )}
        </div>
      </Suspense>
    </main>
  );
}
