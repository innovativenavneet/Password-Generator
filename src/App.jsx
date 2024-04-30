import { useCallback, useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // Options
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  // Entering password
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  // Function to generate password
  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ANCGhfdssfhdajfadshfdsfdasjxjfjADs';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '@#$$%%^&^&$';

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Generate password when component mounts or dependencies change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Function to copy password to clipboard
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-3xl font-bold mb-2 text-center">Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Enter your Password"
          readOnly
          ref={passwordRef}
        />
        <button
          type="button"
          onClick={copyPasswordToClipboard}
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>

        <div className="flex text-sm gap-x-2">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="number">Number</label>
        </div>

        <div className="flex text-sm gap-x-2">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
3