import express from "express"; //"type": "module", is requireed in package.json
// const express = require("express");

import cors from "cors";
import dotenv from "dotenv";

import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express(); //Expressアプリ作成
const PORT = process.env.PORT || 5001; //ポート番号決定

// middleware
app.use(cors({ origin: "http://localhost:5173" })); //CORS 最初に書く
app.use(express.json()); //JSONのリクエストボディをパース
app.use(rateLimiter); //回数制限
app.use("/api/notes", noteRoutes); //各エンドポイントルーティングの定義

// connect DB → 成功したら起動
connectDB().then(() => {
  app.listen(PORT, () => {
    //app.listen アプリを 指定したポート番号で起動させる命令
    console.log("Server started on PORT:", PORT);
  });
});

// our simple custom middleware
/* app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
}); */

// app.get("/api/notes", (req, res) => {
//   // res.send("you got 5 notes");
//   res.status(200).send("You got 20 notes");
// ↓↓↓↓ここのラインが１００行になることがあるのでnoteRoutesを作成↓↓↓↓↓
// });
