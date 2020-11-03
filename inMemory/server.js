const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(express.static(join(__dirname, "public")));

app.post("/secret", (req, res) => {
  res.json({})
})

app.get("/secret", (req, res) => {
  res.json({secret: "secretKey"})
})

app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

process.on("SIGINT", function() {
  process.exit();
});

app.listen(3000, () => console.log(`Server running on port 3000`));
