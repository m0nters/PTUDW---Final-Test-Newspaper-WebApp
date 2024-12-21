import connection from "../config/database.js";

export async function getEditForm(req, res) {
  try {
    const { id } = req.query;

    // Get article data
    const [article] = await connection.query(
      `SELECT * FROM articles WHERE id = ?`,
      [id]
    );

    if (!article.length) {
      return res.render("articleNotFound");
    }

    // Get categories for dropdown
    const [categories] = await connection.query("SELECT * FROM categories");

    res.render("articlesForm", {
      article: article[0],
      categories,
      isEditing: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading article");
  }
}

export async function updateArticle(req, res) {
  try {
    const { id } = req.query;
    const {
      title,
      author,
      abstract,
      content,
      is_premium,
      img_url,
      category_id,
    } = req.body;

    const sql = `
            UPDATE articles 
            SET title = ?, 
                author = ?, 
                abstract = ?, 
                content = ?, 
                is_premium = ?, 
                img_url = ?, 
                category_id = ?
            WHERE id = ?
        `;

    await connection.query(sql, [
      title,
      author,
      abstract,
      content,
      is_premium === "true",
      img_url,
      category_id,
      id,
    ]);

    res.redirect("/articles");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating article");
  }
}
