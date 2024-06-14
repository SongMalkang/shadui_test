import React, { useEffect, useState } from 'react';
import './AkeyGen.css';

const AkeyGen = (props) => {
  const [keyArray, setKeyArray] = useState([]);
  const [InitialDvad, setInitialDvad] = useState('FF0006F5');
  const [generateAmount, setGenerateAmount] = useState(16);

  const [action, setAction] = useState('POST')
  const [targetUrl, setTargetUrl] = useState('http://10.92.104.22:30400')

  const [updatedRows, setUpdatedRows] = useState([]);

  useEffect(() => {
    const newUpdates = {};
    keyArray.forEach((item, index) => {
      Object.keys(item).forEach((key) => {
        newUpdates[`${index}-${key}`] = true;
      });
    });
    setUpdatedRows(newUpdates);

    const timeout = setTimeout(() => {
      setUpdatedRows({});
    }, 500);

    return () => clearTimeout(timeout);
  }, [keyArray]);


  useEffect(() => {
    const generatedKeys = keyGenUtils(InitialDvad, generateAmount);
    setKeyArray(generatedKeys);
  }, [InitialDvad, generateAmount]);

  const keyGenUtils = (deui, count) => {
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push(testingFunction(deui, i));
    }
    return result;
  };

  const dec2hex = (dec) => {
    return dec.toString(16).toUpperCase();
  };

  const hex2dec = (hex) => {
    return parseInt(hex, 16);
  };

  const hex2bytes = (hex) => {
    let bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
  };

  const bytes2wordarray = (bytes) => {
    let words = [];
    for (let i = 0; i < bytes.length; i++) {
      words[i >>> 2] |= bytes[i] << (24 - (i % 4) * 8);
    }
    return CryptoJS.lib.WordArray.create(words, bytes.length);
  };

  const encryptWithAES = (hexCode, key) => {
    let wordArray = bytes2wordarray(hex2bytes(hexCode));
    let encrypted = CryptoJS.AES.encrypt(wordArray, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Hex.stringify(encrypted.ciphertext).toUpperCase().substring(0,32);
  };

  const stringToHex = (str) => {
    return str.split('')
              .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
              .join('')
              .toUpperCase();
  };

  const testingFunction = (dvad, index) => {

    let newDec = hex2dec(dvad) + index;
    let newHex = dec2hex(newDec).padStart(8, '0');
    let newDeui = `010000FF${newHex}`

    let key = bytes2wordarray(hex2bytes(stringToHex(newDeui)))
  
    let encrypedHex = encryptWithAES("75620E0E0E0E0E0E0E0E0E0E0E0E0E0E", key);
    let encrypedHex2 = encryptWithAES("61730E0E0E0E0E0E0E0E0E0E0E0E0E0E", key);
    let encrypedHex3 = encryptWithAES("6E730E0E0E0E0E0E0E0E0E0E0E0E0E0E", key);
  
    console.log(encrypedHex, encrypedHex2, encrypedHex3);
  
    return { dvad: newHex, deui: newDeui, akey: encrypedHex, askey: encrypedHex2, nskey: encrypedHex3 };
  };

  return (
    <div className='flex flex-row w-full h-[94vh] px-[0.5vw] py-[1vh] bg-zinc-100'>
      <div className='flex flex-col w-full h-full px-[0.5vw] py-[1vh] justify-start bg-zinc-50 border-slate-200 border-[1px] rounded-2xl space-y-[1vh]'>
        <div className='flex flex-row w-full h-[8vh] justify-center items-center space-x-[2vw]'>
          <div className='flex flex-row justify-between w-[12vw] items-center'>
            <span>DVAD</span>
            <input
              type="text"
              maxLength="8"
              onChange={(e) => setInitialDvad(e.target.value)}
              pattern="^[0-9A-Fa-f]{8}$"
              title="FF000XXX Hex code only"
              className={`${(InitialDvad.length !== 8) && 'border-red-600 text-red-600 font-bold'} border-[1px] border-slate-200 rounded-xl w-[8vw] h-[4vh]`}
              defaultValue={InitialDvad}
            />
          </div>

        
          <div className='flex flex-row justify-between w-[12vw] items-center'>
            <span>수량</span>
            <input
              type="number"
              onChange={(e) => setGenerateAmount(e.target.value)}
              pattern="^[0-9A-Fa-f]{8}$"
              title="Counter"
              className='border-[1px] border-slate-200 rounded-xl w-[8vw] h-[4vh]'
              defaultValue={generateAmount}
            />
          </div>

        </div>


        <div className='flex flex-col w-full h-full bg-zinc-50 rounded-xl border-slate-200 border-[1px] overflow-y-scroll'>
          <table>
            <thead className='bg-zinc-800 text-white text-center'>
              <tr>
                <th className='py-[1vh] text-[1vw] w-[4vw]'>연번</th>
                {/* <th className='py-[1vh] text-[1vw]'>시리얼</th> */}
                <th className='py-[1vh] text-[1vw] w-[5vw]'>DVAD</th>
                <th className='py-[1vh] text-[1vw]'>DEUI</th>
                <th className='py-[1vh] text-[1vw] w-[18vw]'>A-Key</th>
                <th className='py-[1vh] text-[1vw] w-[18vw]'>AS-Key</th>
                <th className='py-[1vh] text-[1vw] w-[18vw]'>NS-Key</th>
                <th className='py-[1vh] text-[1vw]'>chirpAPI (작업중)</th>
                <th className='py-[1vh] text-[1vw]'>SnipeAPI (작업중)</th>
              </tr>
            </thead>
            <tbody>
              {keyArray.map((item, index) => (
                <tr key={index} className={`border-y-[1px] border-slate-200`}>
                  <td className='text-center py-[0.5vh]'>{index + 1}</td>
                  {/* <td className='text-center py-[0.5vh]'>1602PL-Exi-01180{index}</td> */}
                  <td className='text-center py-[0.5vh]'>{item.dvad}</td>
                  <td className='text-center py-[0.5vh]'>{item.deui}</td>
                  <td className='text-center py-[0.5vh] border-x-[1px] border-slate-200'>{item.akey}</td>
                  <td className='text-center py-[0.5vh] border-x-[1px] border-slate-200'>{item.askey}</td>
                  <td className='text-center py-[0.5vh] border-x-[1px] border-slate-200'>{item.nskey}</td>
                  <td className='text-center py-[0.5vh] border-x-[1px] border-slate-200'>curl -X POST --header ...</td>
                  <td className='text-center py-[0.5vh] border-x-[1px] border-slate-200'>curl -X POST --header ...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}

export default AkeyGen;
