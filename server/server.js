import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.json({ test: "test" });
});

app.listen(5000);
