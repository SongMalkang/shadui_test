import React from 'react';
import logo from '../../assets/logo/logo.png';

const AppHeader = (props) => {
  return (
    <div className='flex flex-row justify-between items-center w-full h-[6vh] bg-zinc-900 bg-opacity-70 text-white'>
      <div className='flex flex-row w-[10vw] h-[5vh] px-[0.5vw] py-[0.5vh] items-center space-y-3'>
        <img className='object-fill' src={logo} alt={logo} />
      </div>

      <div className="flex flex-row w-[10vw] h-[5vh] px-[0.5vw] py-[0.25vh] items-center space-y-3 bg-zinc-800">
        {/* 라우팅 메뉴 */}
      </div>

      <div className="flex flex-row w-[50vw] h-[5vh] px-[0.5vw] py-[0.25vh] items-center space-y-3 font-bold align-middle text-center text-[1.3vw] justify-center">
        {/* 타이틀 정보 */}
        Online Akeygen
      </div>

      <div className="flex flex-row w-[10vw] h-[5vh] px-[0.5vw] py-[0.25vh] items-center space-y-3 bg-zinc-800">
        {/* 시간 정보 */}
      </div>
      
      <div className="flex flex-row w-[10vw] h-[5vh] px-[0.5vw] py-[0.25vh] items-center space-y-3 bg-zinc-800">
        {/* 로그인 정보 */}
      </div>
    </div>
  );
}
 
export default AppHeader;