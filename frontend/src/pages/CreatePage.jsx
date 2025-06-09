import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  // ユーザー入力の状態を管理
  const [title, setTitle] = useState(""); // ノートのタイトル
  const [content, setContent] = useState(""); // ノートの内容
  const [loading, setLoading] = useState(false); // POST中のローディング状態

  const navigate = useNavigate(); // React Router の画面遷移機能

  // フォーム送信処理
  const handleSubmit = async (e) => {
    e.preventDefault(); // フォームのデフォルト送信（リロード）を防ぐ ページ遷移を止める

    // 入力チェック：どちらかが空白ならエラー表示
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required", { id: "required-fields" });
      return;
    }

    setLoading(true); // ローディング状態ON（ボタン無効化のため）

    try {
      // 新しいノートをサーバーにPOST
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!"); // 成功通知
      navigate("/"); // ホーム画面にリダイレクト
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          {/* 入力フォームカード */}
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                {/* タイトル入力 */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* 内容入力 */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Create Noteボタン */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
