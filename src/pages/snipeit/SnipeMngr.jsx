import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { z } from "zod";
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiZDdiZDExYmI3MmE4YWNhMjYwOTk4NjNkODBmZmVlMjlhNDU5YmZmMjZmZjZmZTUzZWIxMmE4OGFlNTkzNDNmOTAzMWVkZDU3MjYxMDdiYTgiLCJpYXQiOjE3MDY1OTA3NTIuMTY1Njk0LCJuYmYiOjE3MDY1OTA3NTIuMTY1Njk4LCJleHAiOjIzMzc3NDI3NTEuNzQ5MzE5LCJzdWIiOiIxMiIsInNjb3BlcyI6W119.IUEdCCIkITc7tf3GG-tYVB2FAyWcHHl5XFFJxU_xvvZD6oCMJY6SRukuVj1ekA97jcl6QEiQvvEfXdFnOyXVJldYTGO9ouVR_wWzheVN8P4Dl4IARY8cCie_e5VUf3kfDX9FoHowoSHVZnIhsuRzLXi1RZRsd31-Fe4PQjdaP87JJbR_AtFsHulAviDq-VqZ2Ktm1VuCyX5pwapCXMWP_JRJ6OoOm1VpbTwUPlZVZxDqfEYGysqTVZGKRag1-mHOLUtfCKUB-Z4CBAEBmp0rKqWq0CyyBwaId9F0GNjxntVJXVZdJn3Hb3D78fRSr67Ibv_7ugK63kAwWvqBt-d6JxxRkyjWzDVypr0o8dKneYfPL4A1qKlawmHey-1-FhwliZWA1YWKAGr5XRJNLY0sKGG18ZehwCorJj0wYvRc-bfq22HVMAZjxKcqPOPaz2NJmuI85MfZDlneBxoPT6NfnJN2qsRm4DD4YExybDECj8IJRwbKGLFzCzipyAEWnwgOn_uiHMWB0Zddob9MW3orF3ccMz5NqjsomXY3lg6VtL3kPSlhI41oFdtFIYDkArR32M-p-5bzSYlvq4or5qFTTKXFhtDjFKHwK4efFewScPB-gcpssYfQxrtlWCA_wdrGV25CSenWCQte-VrFIT-FT1qI_Tn6OwyH237sUFPzG7k'

const SnipeMngr = (props) => {
  const [modelList, setModelList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://snipe.hancomum.com:28081/api/v1/models?order=asc', {
          headers: {
            Authorization: TOKEN,
            accept: 'application/json',
          },
        });
        setModelList(response.data.rows)
        console.log(response.data.rows);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='w-full h-[94vh] px-[0.5vw] py-[1vh] bg-zinc-400'>
      <div className='flex flex-row justify-between items-center w-full h-full px-[0.5vw] py-[1vh] rounded-xl drop-shadow-xl bg-zinc-200'>
        <div className='flex flex-col justify-between w-[20vw] h-full px-[0.5vw] py-[1vh] bg-zinc-100 rounded-xl'>

          <div className='flex flex-col justify-between w-full h-[30vh] bg-zinc-400'>
            기본정보
          </div>

          <div className='flex flex-col justify-between w-full h-[40vh]'>
            <span>시작번호</span>
            <input />
            <span>모델</span>
            <input />
            <span>모델 번호</span>
            <input />
            <span>리피터 포함 여부</span>
            <input />
            <span>채널</span>
            <input />
          </div>
        </div>

        <div className='w-[57vw] h-full px-[0.5vw] py-[1vh] bg-zinc-100 rounded-xl'>
          <table>
            <thead>
              <tr>
                <th>연번</th>
                <th>자산번호</th>
                <th>DEUI</th>
                <th>연번</th>
                <th>연번</th>
              </tr>
            </thead>
          </table>
        </div>
        
        <div className='flex flex-col w-[20vw] h-full px-[0.5vw] py-[1vh] bg-zinc-100 rounded-xl'>
        </div>
      </div>
    </div>
  );
}
 
export default SnipeMngr;