import { db } from '../helpers/db.js';
import moment from 'moment';

export const getComments = (req, res) => {
  const q = `SELECT c.uuid, c.description, c.createdAt, c.postId, name, profilePic, username FROM comments AS c
             JOIN users AS u ON (u.id = c.userId) 
             JOIN posts AS p ON (c.postId = p.id)
             WHERE p.uuid = ?
             ORDER BY c.createdAt DESC;`;

  db.query(q, [req.query.postUuid], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  if (!req.body.description || !req.body.description.trim())
    return res.status(403).json('Text cannot be empty');

  const q = `INSERT INTO comments (uuid, description, userId, postId, createdAt) VALUES (UUID(), ?, ?, (SELECT p.id AS postId FROM posts AS p WHERE p.uuid = ?), ?)`;
  db.query(
    q,
    [
      req.body.description,
      req.user.id,
      req.body.postUuid,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('The comment has been posted.');
    }
  );
};

export const deleteComment = () => {};
