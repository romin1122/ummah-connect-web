import { db } from '../db.js';
import moment from 'moment';

export const getComments = (req, res) => {
  const q = `SELECT c.*, name, profilePic FROM comments AS c
             JOIN users AS u ON (u.id = c.userId) 
             WHERE c.postId = ?
             ORDER BY createdAt DESC;`;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  if (!req.body.description || !req.body.description.trim())
    return res.status(403).json('Text cannot be empty');

  const q = `INSERT INTO comments (description, userId, postId, createdAt) VALUES (?)`;
  db.query(
    q,
    [
      [
        req.body.description,
        req.user.id,
        req.body.postId,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      ],
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('The comment has been posted.');
    }
  );
};

export const deleteComment = () => {};
