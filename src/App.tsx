import { useState } from 'react';
import clsx from 'clsx';

const categories = [30, 11, 9, 27, 18];

const animations = [
  'animate-[wiggle_1s_ease-in-out_infinite]',
  'animate-[wiggle_2s_ease-in-out_infinite]',
  'animate-[wiggle_3s_ease-in-out_infinite]',
];

const numbers: { num: number; anim: string }[] = [];
for (let i = 0; i < 7 * 24; i++) {
  numbers.push({
    num: randomNum(0, 9),
    anim: animations[randomNum(0, 2)],
  });
}

function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  return (
    <div className='bg-[#112243] text-[#d6e2fd] w-screen h-screen flex flex-col'>
      <header className='border-b py-4'>
        <div className='mx-auto border border-[#d6e2fd] py-2 px-1 w-full lg:w-11/12 flex flex-row'>
          <div className='flex-1'>Siena</div>
          <div className='mr-10'>19% Complete</div>
          <div className='relative mr-2'>
            <div className='absolute -top-[18px] -left-[14px] rounded-[50%] border-2 border-[#d6e2fd] w-[120px] h-[60px]' />
            <div className='absolute -top-[18px] left-[0px] rounded-[50%] border-2 border-[#d6e2fd] w-[94px] h-[60px]' />
            <div className='absolute -top-[18px] left-[16px] rounded-[50%] border-2 border-[#d6e2fd] w-[60px] h-[60px]' />
            <span className='font-bold bg-[#112243] block px-2 z-10 relative'>
              L U M O N
            </span>
          </div>
        </div>
      </header>
      <main className='flex-1 border-t-2 border-[#d6e2fd] mt-1 grid grid-cols-[repeat(24,_minmax(0,_1fr))] grid-rows-7 px-4'>
        {numbers.map((number, index) => (
          <div
            key={index}
            className={clsx(
              'flex justify-center items-center text-2xl transition-all cursor-pointer',
              {
                'text-8xl':
                  hoveredIndex === index || selectedIndexes.includes(index),
                'text-5xl':
                  (hoveredIndex === index + 1 ||
                    hoveredIndex === index - 1 ||
                    hoveredIndex === index + 24 ||
                    hoveredIndex === index - 24 ||
                    hoveredIndex === index + 25 ||
                    hoveredIndex === index - 25 ||
                    hoveredIndex === index + 23 ||
                    hoveredIndex === index - 23) &&
                  !selectedIndexes.includes(index),
              }
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => {
              if (selectedIndexes.includes(index)) {
                setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
              } else {
                setSelectedIndexes([...selectedIndexes, index]);
              }
            }}
          >
            <span className={number.anim}>{number.num}</span>
          </div>
        ))}
      </main>
      <footer className='border-t border-[#d6e2fd]'>
        <div className='grid grid-cols-5 w-full lg:w-11/12 mx-auto py-4'>
          {categories.map((progress, index) => (
            <div key={index} className='flex flex-col gap-2 text-center'>
              <div className='border border-[#d6e2fd]'>0{index + 1}</div>
              <div className='border border-[#d6e2fd] relative'>
                <div
                  className='bg-[#d6e2fd] h-full absolute top-0 left-0'
                  style={{ width: `${progress}%` }}
                />
                {progress}%
              </div>
            </div>
          ))}
        </div>
        <div className='text-center border-t border-[#d6e2fd] py-1'>
          0x 150B4A : 0x 0AEAFC
        </div>
      </footer>
    </div>
  );
}

export default App;
