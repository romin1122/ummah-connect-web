import { db } from '../helpers/db.js';

export const updateLike = (req, res) => {
  // Do validation of data later as well as post comment login register validation
  const liked = req.body.liked;

  if (liked) {
    const q = `INSERT INTO likes (userId, postId) VALUES (?)`;

    db.query(q, [[req.user.id, req.body.postId]], (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json('The post has been liked!');
    });
  } else {
    {
      const q = `DELETE FROM likes WHERE userId = ? AND postId = ?`;

      db.query(q, [req.user.id, req.body.postId], (err, data) => {
        if (err) res.status(500).json(err);
        return res.status(200).json('The like has been removed!');
      });
    }
  }
};
