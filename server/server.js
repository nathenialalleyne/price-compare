import express from "express";
import bodyParser from "body-parser";

const app = express();

app.get("/test", (req, res) => {
  res.json({ test: "test" });
});

app.listen(5000, () => {
  console.log("running on port 5000");
});
