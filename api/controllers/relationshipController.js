import { db } from '../db.js';

export const updateRelationship = (req, res) => {
  // Do validation of data later as well as post comment login register validation
  const followed = req.body.followed;
  console.log(followed);
  if (followed) {
    const q = `INSERT INTO relationships (followerUserId, followedUserId) VALUES (?,(SELECT id FROM users WHERE username = ?))`;

    db.query(q, [req.user.id, req.body.followedUsername], (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json('The user has been followed!');
    });
  } else {
    {
      const q = `DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = (SELECT id FROM users WHERE username = ?)`;

      db.query(q, [req.user.id, req.body.followedUsername], (err, data) => {
        if (err) res.status(500).json(err);
        return res.status(200).json('The user has been unfollowed!');
      });
    }
  }
};
