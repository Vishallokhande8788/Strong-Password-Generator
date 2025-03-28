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

  return (
    <div className="app-container">
    </div>
  );
}

export default App;