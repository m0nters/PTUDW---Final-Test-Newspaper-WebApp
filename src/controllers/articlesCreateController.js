import connection from "../config/database.js";

export async function createArticle(req, res) {
  try {
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
            INSERT INTO articles 
            (title, author, abstract, content, is_premium, img_url, category_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

    await connection.query(sql, [
      title,
      author,
      abstract,
      content,
      is_premium === "true",
      img_url,
      category_id,
    ]);

    res.redirect("/articles");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating article");
  }
}

export async function getCreateForm(req, res) {
  try {
    const [categories] = await connection.query("SELECT * FROM categories");
    res.render("articlesForm", {
      categories,
      isEditing: false,
      article: {}, // Empty article object for consistent template rendering
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading categories");
  }
}
