const express = require('express');
const multer = require('multer');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const { uploadBookImage } = require('./image.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (JPEG, PNG, etc.)'), false);
    }
  },
});

// Define primero las rutas específicas
router.post("/upload", upload.single("image"), uploadBookImage);

// Luego define las rutas dinámicas
router.post("/create-book", verifyAdminToken, postABook);
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.put("/edit/:id", verifyAdminToken, UpdateBook);
router.delete("/:id", verifyAdminToken, deleteABook);

module.exports = router;
