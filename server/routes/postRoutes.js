import express from 'express';
import * as postController from '../controllers/postController.js';

const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.post('/:postId/like', postController.toggleLike);
router.post('/:postId/comments', postController.addComment);

export default router;