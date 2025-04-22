const { uploadFileToS3 } = require('./s3.services.js');

const uploadBookImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Debes subir una imagen' });
    }

    const imageUrl = await uploadFileToS3(req.file);
    res.json({ imageUrl });
    
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Error al procesar la imagen' 
    });
  }
};

module.exports = { uploadBookImage };