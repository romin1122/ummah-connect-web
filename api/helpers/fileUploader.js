import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/static/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

function checkFileType(req, file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only! (jpeg, jpg, png)');
  }
}

const upload = multer({
  storage: storage,
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 5, // 5MB size limit
  },
  fileFilter: checkFileType,
});

export const singleFileUploader = upload.single('file');

export const multipleFilesUploader = multer({
  storage: storage,
  limits: {
    files: 2,
    fileSize: 1024 * 1024 * 5, // 5MB size limit
  },
  fileFilter: checkFileType,
}).fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'coverPic', maxCount: 1 },
]);
