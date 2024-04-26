import { useState, useCallback, useEffect ,useRef } from 'react';
import './App.css';

function App() {

  const [Password, setPassword] = useState();
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  
  
  const PasswordRef = useRef(null)
  // usecallback
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])

  //useEffect
  useEffect(() => passwordGenerator(), [length, numAllowed, charAllowed, passwordGenerator])
  
  const copyPasswordToClipboard = useCallback(()=>{
    PasswordRef.current?.select()
    PasswordRef.current?.select("red")
    window.navigator.clipboard.writeText(Password)
  },[Password])
  
  return (
    <div className='w-full text-center max-w-md mx-auto shadow-md rounded-lg px-2 my-8 text-white bg-gray-800 '>

      <div className='shadow rounded-lg overflow-hidden px-2 py-5 '>
        <h1 className='text-white mb-3 text-lg'>Password Generator</h1>
        <div className='flex '>
          <input type="text"
            value={Password}
            className='outline-none w-full py-1 px-3 rounded-lg text-black text-wrap '
            placeholder='Password'
            readOnly
            ref={PasswordRef} />
          <button onClick={() =>{copyPasswordToClipboard(); } } className='ml-2 bg-blue-700 rounded-lg px-3 py-0.5 shrink-0 hover:bg-green-700 '>Copy</button>
        </div>
      </div>
      <div className='flex space-x-2'>
        <input type="range"
          min={8}
          max={100}
          value={length}
          className='cursor-pointer '
          onChange={(e) => {
            setLength(e.target.value)
          }}
        />
        <label className='ml-2 text-orange-500 text-lg  '>Length:{length}</label>
        <input type="checkbox"
          value={numAllowed}
          className='cursor-pointer '
          PasswordRef
          onChange={(e) => {
            setnumAllowed((prev) => !prev)
          }}
        />
        <label className='ml-2 text-orange-500 text-lg  '>Number</label>
        <input type="checkbox"
          value={charAllowed}
          className='cursor-pointer '
          onChange={(e) => {
            setcharAllowed((prev) => !prev)
          }}
        />
        <label className='ml-2 text-orange-500 text-lg  '>Character</label>
      </div>
    </div>
  );
}
export default App;
