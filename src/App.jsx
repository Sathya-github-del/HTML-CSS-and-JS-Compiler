import React, { useState, useEffect } from "react";
import axios from "axios";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { javascript, xml, css } from 'react-syntax-highlighter/dist/esm/languages/hljs'; // Import xml instead of html
import Navbar from './Navbar';
import CodeEditor from './CodeEditor';
import OutputPanel from './OutputPanel';
import './App.css';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('xml', xml);  // Use xml for HTML
SyntaxHighlighter.registerLanguage('css', css);

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("xml"); // Default to xml for HTML
  const [consoleOutput, setConsoleOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      compileCode();
    }, 500);

    return () => clearTimeout(timer);
  }, [code, language]);

  const compileCode = async () => {
    try {
      setError("");
      if (language === "javascript") {
        runJSCode(code);
      } else {
        const response = await axios.post(`http://localhost:5000/compile`, {
          code,
          language,
        });
        setOutput(response.data.output);
      }
    } catch (error) {
      console.error("Error compiling code:", error);
      setError("Error compiling code. Please check your syntax.");
    }
  };

  const runJSCode = (jsCode) => {
    const originalLog = console.log;
    setConsoleOutput("");

    console.log = (message) => {
      setConsoleOutput((prevOutput) => prevOutput + JSON.stringify(message) + "\n");
      originalLog(message);
    };

    try {
      // eslint-disable-next-line no-new-func
      new Function(jsCode)();
    } catch (error) {
      setConsoleOutput("Error: " + error.message);
    }

    console.log = originalLog;
  };

  return (
    <div className="container">
      <Navbar language={language} setLanguage={setLanguage} />
      <div className="editor-container">
        <CodeEditor
          code={code}
          setCode={setCode}
          placeholder={language === "javascript" ? "console.log('Hello World!');" : "Write your code here..."}
          language={language}
        />
        <OutputPanel
          output={output}
          consoleOutput={consoleOutput}
          error={error}
          language={language}
        />
      </div>
    </div>
  );
}

export default App;