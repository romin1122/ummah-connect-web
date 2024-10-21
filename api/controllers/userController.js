import { db } from '../helpers/db.js';

export const getSelf = (req, res) => {
  const q =
    'SELECT * FROM users WHERE username = (SELECT u.username AS username FROM users AS u WHERE u.id = ?)';

  db.query(q, [req.user.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length == 0) return res.status(404).json('User not found!');

    const { password, id, ...info } = data[0];
    return res.status(200).json(info);
  });
};

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

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

const updateName = (req, res) => {
  if (req.body.name.trim().length > 0 && /^[a-zA-Z ]+$/.test(req.body.name)) {
    console.log('valid');
    const q = `UPDATE users SET name=? WHERE id = ?`;
    db.query(q, [req.body.name, req.user.id], (err, data) => {
      if (err) return (res.error = err);
      console.log('name updated');
    });
  }
};

const updateCity = (req, res) => {
  if (req.body.city.trim().length > 0 && /^[a-zA-Z ]+$/.test(req.body.city)) {
    console.log('valid');
    const q = `UPDATE users SET city=? WHERE id = ?`;
    db.query(q, [req.body.city, req.user.id], (err, data) => {
      if (err) return (res.error = err);
      console.log('city updated');
    });
  }
};

const updateWebsite = (req, res) => {
  if (
    req.body.website.trim().length > 0 &&
    /^[a-zA-Z ]+$/.test(req.body.website) &&
    isValidUrl(req.body.website)
  ) {
    console.log('valid');
    const q = `UPDATE users SET website=? WHERE id = ?`;
    db.query(q, [req.body.website, req.user.id], (err, data) => {
      if (err) return (res.error = err);
      console.log('website updated');
    });
  }
};

const updateProfilePic = (req, res) => {
  const q = `UPDATE users SET profilePic=? WHERE id = ?`;
  db.query(
    q,
    ['./static/uploads/' + req.files.profilePic[0].filename, req.user.id],
    (err, data) => {
      if (err) return (res.error = err);
      console.log('profilePic updated');
    }
  );
};

const updateCoverPic = (req, res) => {
  const q = `UPDATE users SET coverPic=? WHERE id = ?`;
  db.query(
    q,
    ['./static/uploads/' + req.files.coverPic[0].filename, req.user.id],
    (err, data) => {
      if (err) return (res.error = err);
      console.log('coverPic updated');
    }
  );
};

export const updateUser = (req, res) => {
  if (req.body.name) updateName(req, res);
  if (req.body.city) updateCity(req, res);
  if (req.body.website) updateWebsite(req, res);
  if (req.files.profilePic) updateProfilePic(req, res);
  if (req.files.coverPic) updateCoverPic(req, res);

  if (res.error) {
    res.error = null;
    return res.status(500).json(res.error);
  } else {
    res.status(200).json('User has been updated!');
  }
};
