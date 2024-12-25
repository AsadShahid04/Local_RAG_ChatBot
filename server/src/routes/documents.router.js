const express = require("express");
const multer = require("multer");
const { addDocuments } = require("../services/message.service");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

// Configure multer for file upload
const upload = multer({
  dest: "uploads/",
});

router.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const files = req.files;
    const texts = [];
    const metadata = [];

    // Process each uploaded file
    for (const file of files) {
      const content = await fs.readFile(file.path, "utf8");
      texts.push(content);
      metadata.push({
        filename: file.originalname,
        type: path.extname(file.originalname),
      });

      // Clean up uploaded file
      await fs.unlink(file.path);
    }

    // Add documents to vector store
    const result = await addDocuments(texts, metadata);

    res.json(result);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
