import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeEditor = ({ code, setCode, language }) => {
    return (
        <div className="code-editor">
            <SyntaxHighlighter
                language={language}
                style={vs2015}
                customStyle={{
                    height: '100%',
                    margin: 0,
                    padding: '10px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    overflow: 'auto',
                }}
            >
                {code}
            </SyntaxHighlighter>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                autoCapitalize="off"
                autoCorrect="off"
                className="code-input"
            />
        </div>
    );
};

export default CodeEditor;

