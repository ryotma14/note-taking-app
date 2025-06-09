import express from "express"; //"type": "module", is requireed in package.json
// const express = require("express");

import cors from "cors";
import dotenv from "dotenv";

import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import path from "path";

dotenv.config();

const app = express(); //Expressアプリ作成
const PORT = process.env.PORT || 5001; //ポート番号決定

const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  // 開発環境でだけCORSを許可（Reactのローカル開発環境用）
  app.use(cors({ origin: "http://localhost:5173" })); //CORS 最初のlineに書く
}

app.use(express.json()); //JSONのリクエストボディをパース
app.use(rateLimiter); //回数制限
app.use("/api/notes", noteRoutes); //各エンドポイントルーティングの定義

/*ViteやReactでnpm run buildした後に作られる dist フォルダ（HTML, CSS, JS が含まれる）
をExpress サーバーが / 経由でクライアント（ブラウザ）に配信できるようにする設定*/
if (process.env.NODE_ENV === "production") {
  // frontendのビルドファイルを公開フォルダとして扱う
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  // React Router対応：どのパスでも index.html を返す（SPAのため）
  app.get("*", (req, res) => {
    res.sendFile(path.join((__dirname, "../frontend", "dist", "index.html")));
  });
}

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
