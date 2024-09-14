import React from 'react';
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

export async function LandingBody({ slug }: { slug: string }) {
  const { data } = await fetch(`${process.env.BASE_URL}/api/hn?p=${slug}`, {
    cache: 'no-store',
  }).then((res) => res.json());

  return (
    <>
      {data && data?.length > 0 && (
        <div className='lg:w-[800px] flex flex-col'>
          <Table>
            <TableBody>
              {data.map((story: Story) => (
                <TableRow key={story.id}>
                  <TableCell>
                    {/* TODO: link to item?id=... */}
                    <a
                      href={`https://news.ycombinator.com/item?id=${story.id}`}
                    >
                      {story.comments}
                    </a>
                  </TableCell>
                  <TableCell className={getColorClass(+story.points)}>
                    {story.points}
                  </TableCell>
                  <TableCell>
                    <a href={story.link}>{story.title}</a>
                    <span className='ml-1 text-gray-500'>
                      ({getDomainFromUrl(story.link)})
                    </span>
                    <span className='ml-1 text-gray-500'>{story.timeAgo}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <a
            className='w-8 text-slate-300 text-sm mt-4 relative'
            href={`/${+slug + 1}`}
          >
            More
          </a>
        </div>
      )}
    </>
  );
}
