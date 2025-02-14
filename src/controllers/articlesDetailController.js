import connection from "../config/database.js";

export async function getArticleDetail(req, res) {
    try {
        const { id } = req.query;
        
        const sql = `
            SELECT a.*, c.category_name 
            FROM articles a
            LEFT JOIN categories c ON a.category_id = c.id
            WHERE a.id = ?
        `;
        
        const [article] = await connection.query(sql, [id]);
        
        if (!article.length) {
            return res.render("articleNotFound");
        }
        
        res.render("articlesDetail", {
            article: article[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching article");
    }
}