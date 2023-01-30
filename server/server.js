import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.get("/test", cors(), (req, res) => {
  res.json({ test: "test" });
});

app.listen(5000, () => {
  console.log("running on port 5000");
});
