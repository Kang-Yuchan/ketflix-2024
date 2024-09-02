'use server';

import Image from 'next/image';

export default async function Home() {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 dark:text-white">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Yuchan Kang
              </h1>
              <h2 className="text-xl font-medium">Front-End Developer</h2>
              {/* <p className="max-w-[600px] md:text-xl">
                
              </p> */}
            </div>
          </div>
          <Image
            src="/avatar.jpg"
            width="550"
            height="550"
            alt="Avatar"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </div>
    </div>
  );
}
