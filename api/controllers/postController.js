import { db } from '../helpers/db.js';
import moment from 'moment';

export const getPosts = (req, res) => {
  // https://stackoverflow.com/questions/40286026/mysql-query-get-current-users-posts-and-the-users-hes-following-posts
  const q = `(SELECT p.uuid, p.createdAt, u.username FROM posts AS p 
                INNER JOIN users AS u ON u.id = p.userId 
                WHERE u.id = ?
              ) UNION (
                SELECT p.uuid, p.createdAt, u.username FROM posts AS p 
                INNER JOIN relationships AS r ON p.userId = r.followedUserId 
                INNER JOIN users AS u ON p.userId = u.id
                WHERE r.followerUserId = ?
              ) 
                ORDER BY createdAt DESC;`;

  db.query(q, [req.user.id, req.user.id], (err, data) => {
    if (err) res.status(500).json(err);

    return res.status(200).json(
      data.map((each) => {
        const { createdAt, ...others } = each;
        return others;
      })
    );
  });
};

export const getUserPosts = (req, res) => {
  const q = `SELECT p.uuid, p.createdAt, u.username FROM posts AS p 
              INNER JOIN users AS u ON u.id = p.userId 
              WHERE u.username = ?
              ORDER BY createdAt DESC;`;

  db.query(q, [req.params.username], (err, data) => {
    if (err) res.status(500).json(err);

    return res.status(200).json(
      data.map((each) => {
        const { createdAt, ...others } = each;
        return others;
      })
    );
  });
};

export const getPost = (req, res) => {
  // https://stackoverflow.com/questions/40286026/mysql-query-get-current-users-posts-and-the-users-hes-following-posts
  const q = `SELECT p.uuid, p.description, p.img, p.createdAt, name, profilePic, username,
                  (SELECT COUNT(*) AS likes FROM likes AS l WHERE l.postId = p.id) AS likes, 
                  (SELECT COUNT(*) != 0 FROM likes AS l WHERE l.postId = p.id AND l.userId = ?) AS liked 
                  FROM posts AS p 
                INNER JOIN users AS u ON u.id = p.userId 
                WHERE p.uuid = ?;
              `;
  db.query(q, [req.user.id, req.body.postUuid], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const addPost = async (req, res) => {
  const file = req.file;
  if (file != undefined) req.uploadedImg = file.filename;

  const { description } = req.body;
  if (
    (!description || (description && !req.body.description.trim())) &&
    !req.uploadedImg
  )
    return res.status(403).json('Text and image both cannot be empty');

  const q = `INSERT INTO posts (uuid, description, img, userId, createdAt) VALUES (UUID(), ?)`;

  let img;
  if (req.uploadedImg) img = './static/uploads/' + req.uploadedImg;

  db.query(
    q,
    [
      [
        req.body.description,
        img,
        req.user.id,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      ],
    ],
    (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json('The post has been posted.');
    }
  );
};
export const deletePost = () => {};
