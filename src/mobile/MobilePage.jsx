import React from 'react';


const MobilePage = (props) => {
  return (
    <div className='flex flex-col w-full h-[100vh] space-y-[1vh] bg-zinc-100'>

      <div className='w-full h-[5vh] bg-zinc-900 text-white font-bold items-center justify-center flex flex-row text-[5vw]'>
        <span>모바일 임시페이지</span>
      </div>

      <div className='flex flex-row justify-between items-center w-full h-[4vh] px-[5vw] bg-zinc-100'>
        <span>DVAD</span>
        <input />
      </div>

      <div className='flex flex-row justify-between items-center w-full h-[4vh] px-[5vw] bg-zinc-100'>
        <span>수량</span>
        <input />
      </div>

    </div>
  );
}
 
export default MobilePage;