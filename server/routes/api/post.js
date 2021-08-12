import express from 'express';
import auth from '../../middleware/auth.js';

// Model
import Post from '../../models/post.js';

const router = express.Router();

router.get('/', async(req, res)=> { 
    const postFindResult = await Post.find(); // query, fields, options, callback  
    console.log(postFindResult, "All Post Get");
    res.json(postFindResult); // json형태로 응답
});

router.post('/', auth, async(req, res, next) => { // 토큰을 담아서 보냄
    try {
        console.log(req, "글 작성 req");
        const { title, contents, fileUrl, creator } = req.body;
        const newPost = await Post.create({
            title, contents, fileUrl, creator
        });
        res.json(newPost);
    } catch (e) {
        console.log(e);
    }
});

export default router;