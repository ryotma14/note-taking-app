import { StrictMode } from "react"; //Reactの開発用チェック機能。問題のあるコードを警告してくれる。
import { createRoot } from "react-dom/client"; //ReactアプリをHTMLにマウントする新しい方法（React 18以降で使用）
import "./index.css"; //全体のスタイルシートを読み込む（reset.cssや共通デザインなど）
import App from "./App.jsx";
import { BrowserRouter } from "react-router"; //ルーティング機能
import { Toaster } from "react-hot-toast"; //トースト通知を表示するUIコンポーネント。toast.success()など

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
