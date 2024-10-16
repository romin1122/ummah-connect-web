import { db } from '../helpers/db.js';

export const getUser = (req, res) => {
  const username = req.params.username;
  const q =
    'SELECT *, (SELECT COUNT(*) FROM relationships AS r WHERE r.followerUserId = ? AND followedUserId = users.id) AS followed FROM users WHERE username = ?';

  db.query(q, [req.user.id, username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length == 0) return res.status(404).json('User not found!');

    const { password, id, ...info } = data[0];
    return res.status(200).json(info);
  });
};
