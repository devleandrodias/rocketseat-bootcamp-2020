import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  tempFolder: tempFolder,
  uploadFolder: path.resolve(tempFolder, 'uploads'),
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(15).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};
