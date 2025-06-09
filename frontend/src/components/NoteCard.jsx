import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  //   console.log("🚀 ~ NoteCard ~ note:", note);
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behaviour ページ遷移を止めて削除処理だけ行われる

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      //   setNotes((prev) => prev.filter((note) => note._id !== id))

      //api.deleteの後即座にステート更新で削除が画面にすぐ反映
      setNotes((previousNotes) => {
        return previousNotes.filter((note) => note._id !== id);
      });

      toast.success("Note deleted successfully");
    } catch (error) {
      console.lofg("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;

/*
| クラス名                          | 意味                                         |
| ----------------------------- | ------------------------------------------ |
| `card`                        | Tailwind UI や DaisyUI などのコンポーネントスタイル（カード枠） |
| `bg-base-100`                 | 明るい背景色（テーマに依存）                             |
| `hover:shadow-lg`             | ホバー時に大きな影を表示                               |
| `transition-all duration-200` | 全体に200msのアニメーション効果                         |
| `border-t-4`                  | 上のボーダーを4pxにする                              |
| `border-solid`                | 実線のボーダー                                    |
| `border-[#00FF9D]`            | 上ボーダーの色を #00FF9D に                         |
*/
