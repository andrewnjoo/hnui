'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
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

export const Body = () => {
  const [data, setData] = React.useState<Story[]>([]);
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const p = Number(searchParams.get('p')) || 1;
      const { data } = await fetch(`/api/hn?p=${p}`).then((res) => res.json());
      setData(data);
    };
    fetchData();
  }, [searchParams]);

  const nextPage = () => {
    const p = searchParams.get('p');
    return p ? +p + 1 : 2;
  };

  return (
    <div className='flex min-h-[80vh] flex-col justify-between p-4'>
      {data && data?.length > 0 && (
        <div className='lg:w-[800px]'>
          <Table>
            <TableBody>
              <img
                src='/y18.svg'
                alt='y18'
                className='w-4 h-4 border border-white border-[0.5px]'
              />
              {data.map((story: Story) => (
                <TableRow key={story.id}>
                  <TableCell>{story.comments}</TableCell>
                  <TableCell className={getColorClass(+story.points)}>
                    {story.points}
                  </TableCell>
                  <TableCell>
                    <a
                      href={story.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {story.title}
                    </a>
                    <span className='ml-2'>{getDomainFromUrl(story.link)}</span>
                    <span className='ml-2'>{story.timeAgo}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <a
            className='w-8 text-slate-300 text-sm '
            href={`?p=${nextPage()}`}
          >
            More
          </a>
        </div>
      )}
    </div>
  );
};
