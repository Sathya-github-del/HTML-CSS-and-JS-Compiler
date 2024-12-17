import React from 'react';

const OutputPanel = ({ output, consoleOutput, error, language }) => {
    return (
        <div className="output-panel">
            {language !== 'javascript' && (
                <div className="preview">
                    <h3>Preview:</h3>
                    <iframe
                        srcDoc={output}
                        title="Live Output"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                    />
                </div>
            )}
            <div className="console-output">
                <h3>Console Output:</h3>
                <pre>{consoleOutput}</pre>
            </div>
            {error && (
                <div className="error-message">
                    <h3>Error:</h3>
                    <pre>{error}</pre>
                </div>
            )}
        </div>
    );
};

export default OutputPanel;

