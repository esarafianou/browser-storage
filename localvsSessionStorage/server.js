const express = require("express");
const { join } = require("path");
const app = express();

app.use(express.static(join(__dirname, "public")));

app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

process.on("SIGINT", function() {
  process.exit();
});

app.listen(4000, () => console.log(`Server running on port 4000`));
