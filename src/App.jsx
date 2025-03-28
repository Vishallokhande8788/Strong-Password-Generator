import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  // State management
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState("");
  
  // DOM reference
  const passwordRef = useRef(null);

  // Add these functions to the App component

const passwordGenerator = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if (numberAllowed) str += "0123456789";
  if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length);
    pass += str.charAt(char);
  }

  setPassword(pass);
  calculateStrength(pass);
}, [length, numberAllowed, charAllowed, setPassword]);

const calculateStrength = (pass) => {
  let score = 0;
  score += Math.min(50, (pass.length / 20) * 50);

  const hasLower = /[a-z]/.test(pass);
  const hasUpper = /[A-Z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);
  const hasSpecial = /[^A-Za-z0-9]/.test(pass);
  
  let varietyCount = 0;
  if (hasLower) varietyCount++;
  if (hasUpper) varietyCount++;
  if (hasNumber) varietyCount++;
  if (hasSpecial) varietyCount++;
  
  score += (varietyCount / 4) * 30;
  
  const uniqueChars = new Set(pass.split("")).size;
  score += Math.min(20, (uniqueChars / pass.length) * 20);
  
  if (score < 40) {
    setStrength("Weak");
  } else if (score < 70) {
    setStrength("Medium");
  } else {
    setStrength("Strong");
  }
  
};
// Add to App component
const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 999);
  window.navigator.clipboard.writeText(password);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
}, [password]);

// Add this useEffect for auto-generation
useEffect(() => {
  passwordGenerator();
}, [length, numberAllowed, charAllowed, passwordGenerator]);

  // Add to return statement
return (
  <div className="relative w-full min-h-screen flex justify-center items-center p-5 bg-slate-900 overflow-hidden">
    {/* Main Card Container */}
    <div className="relative z-10 w-full max-w-md bg-slate-800 bg-opacity-80 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white border-opacity-10 animate-fade-in">
      <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-500 to-blue-300 bg-clip-text text-transparent">
        Password Generator
      </h1>
      
      {/* Password Display */}
      <div className={`flex mb-6 rounded-lg overflow-hidden transition-all duration-300 ${copied ? 'ring-2 ring-emerald-500' : ''}`}>
        <input
          type="text"
          value={password}
          className="flex-1 px-4 py-3 bg-slate-900 bg-opacity-50 text-white outline-none"
          placeholder="Generating..."
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className={`px-4 font-medium transition-colors duration-300 ${copied ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
        >
          {copied ? "✓" : "Copy"}
        </button>
      </div>

      {/* Controls Section */}
      <div className="space-y-5 mb-6">
        {/* Length Slider */}
        <div>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Toggle Switches */}
        <div className="flex gap-4">
          {/* Number toggle */}
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
            />
            <span>Numbers</span>
          </label>

          {/* Special chars toggle */}
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
            />
            <span>Special Chars</span>
          </label>
        </div>
      </div>

      <button
        onClick={passwordGenerator}
        className="generate-button"
      >
        Generate Password
      </button>
    </div>
  </div>
);
}

export default App;