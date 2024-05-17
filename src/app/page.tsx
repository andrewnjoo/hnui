import { Body } from './body';

export default async function Home() {
  return (
    <main className='flex flex-col sm:p-12'>
      <Body />
    </main>
  );
}
