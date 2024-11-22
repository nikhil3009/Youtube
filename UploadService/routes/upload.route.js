/** @format */

import express from 'express';
//import uploadFileToS3 from "../controllers/upload.controller.js";
import multer from 'multer';
import multipartUploadFileToS3 from '../controllers/multipartupload.controller.js';
const upload = multer();

const router = express.Router();
//router.post('/', upload.fields([{ name: 'chunk' }, { name: 'totalChunks' }, { name: 'chunkIndex' }]), uploadFileToS3);
router.post('/', multipartUploadFileToS3);
export default router;
