import Note from "../models/Note.js";

// res.status(200).send("You just fetched the notes");
// ✅ 全てのノートを取得する
export async function getAllNotes(_, res) {
  try {
    // MongoDBからノートをすべて取得し、新しい順（createdAtが新しい）に並べ替え
    const notes = await Note.find().sort({ createdAt: -1 }); //-1 will sort in desc order, newest first
    res.status(200).json(notes); // 成功(200)したらノートを返す
  } catch (error) {
    console.log("Error in getAllNotes controller: ", error);
    res.status(500).json({ message: "Internal server error in getAllNotes" });
  }
}

// ✅ 特定のIDのノートを1件取得する
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res.status(404).json({ message: "Note not found in getNoteById" }); // 見つからなければ404
    res.json(note); // ノートを返す
  } catch (error) {
    console.log("Error in getNoteById controller: ", error);
    res.status(500).json({ message: "Internal server error in getNoteById" });
  }
}

// ✅ 新しいノートを作成する
export async function createNote(req, res) {
  try {
    // console.log("🚀 🚀 ~ createNote ~ req.body:", req.body);

    const { title, content } = req.body; // クライアントから送られてきたタイトルと内容を取得
    const note = new Note({ title, content }); // Noteインスタンスを作成   //title: "title", content: "content"  と同じ
    const savedNote = await note.save(); // MongoDBに保存
    res.status(201).json({ savedNote }); // 保存したノートを返す
  } catch (error) {
    console.log("Error in createNote controller: ", error);
    res.status(500).json({ message: "Internal server error in createNote" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id, // URLからidを取得
      { title, content }, // 更新する内容
      { new: true } // 更新後のデータを返すオプション
    ); //router.put("/:id", updateNote);と同じid

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote); // 更新したノートを返す
  } catch (error) {
    console.log("Error in updateNote controller: ", error);
    res.status(500).json({ message: "Internal server error in updateNote" });
  }
}

// ✅ ノートを削除する
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found to delete" }); // ID指定で削除
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteNote controller: ", error);
    res.status(500).json({ message: "Internal server error in deleteNote" });
  }
}
