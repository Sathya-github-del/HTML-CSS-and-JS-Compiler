const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Enable CORS for requests from the React front-end
app.use(cors({
  origin: "http://localhost:5173", // Adjust this if your front-end URL is different
  methods: ["GET", "POST"],
}));

app.use(express.json());

// Endpoint to compile HTML, CSS, and JS dynamically based on content
app.post("/compile", (req, res) => {
  const { code, language } = req.body;

  // Create a temporary directory to store the files
  const tempDir = path.join(__dirname, "temp");

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  let output = '';

  // Handling each language based on the type of content
  switch (language) {
    case 'html':
      const htmlFilePath = path.join(tempDir, "index.html");
      fs.writeFileSync(htmlFilePath, code);
      output = fs.readFileSync(htmlFilePath, "utf-8");
      break;

    case 'javascript':
      const jsFilePath = path.join(tempDir, "script.js");
      fs.writeFileSync(jsFilePath, code);
      output = `
        <html>
          <head>
            <script>
              // Capture console.log output
              (function() {
                var old = console.log;
                var logger = document.getElementById('log');
                console.log = function () {
                  for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] == 'object') {
                        logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
                    } else {
                        logger.innerHTML += arguments[i] + '<br />';
                    }
                  }
                }
              })();
            </script>
          </head>
          <body>
            <h1>JavaScript Output</h1>
            <pre id="log"></pre>
            <script>${fs.readFileSync(jsFilePath, "utf-8")}</script>
          </body>
        </html>
      `;
      break;

    default:
      output = " <span style='color: #fff'>Unsupported language type, please use html or javascript.</span>";
  }

  // Return the output as the compiled result
  res.json({ output });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});