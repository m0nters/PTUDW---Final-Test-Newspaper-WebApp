import connection from "../config/database.js";

export async function deleteArticle(req, res) {
    try {
        const { id } = req.params;
        await connection.query("DELETE FROM articles WHERE id = ?", [id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
}