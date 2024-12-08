import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, '../../uploads');

// Ensure upload directory exists
const ensureUploadDir = async () => {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
};

export const uploadMedia = async (base64Data) => {
  await ensureUploadDir();

  // Extract the actual base64 data and file type
  const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 data');
  }

  const fileType = matches[1];
  const base64 = matches[2];
  const extension = fileType.split('/')[1];
  const fileName = `${uuidv4()}.${extension}`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  // Save the file
  await fs.writeFile(filePath, Buffer.from(base64, 'base64'));
  
  return fileName;
};

export const getMediaUrl = async (fileName) => {
  try {
    const filePath = path.join(UPLOAD_DIR, fileName);
    await fs.access(filePath);
    return `/uploads/${fileName}`;
  } catch {
    return null;
  }
};