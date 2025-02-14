import connection from "../config/database.js";

export async function getAllArticles(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    // Get total count
    const [countResult] = await connection.query(
      "SELECT COUNT(*) as total FROM articles"
    );
    const totalArticles = countResult[0].total;
    const totalPages = Math.ceil(totalArticles / limit);

    // Get articles for current page
    const sql = `
            SELECT a.id, a.title, a.author, a.abstract, a.is_premium, c.category_name
            FROM articles a
            LEFT JOIN categories c ON a.category_id = c.id
            ORDER BY a.id ASC
            LIMIT ? OFFSET ?
        `;
    const [articles] = await connection.query(sql, [limit, offset]);

    res.render("articles", {
      title: "Articles List",
      articles: articles,
      currentPage: page,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching articles");
  }
}
