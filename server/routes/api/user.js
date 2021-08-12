import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

// Model
import User from '../../models/user.js';
const {JWT_SECRET} = config;
const router = express.Router(); // 라우터기능을 초기화시킴

//회원가입
router.post('/', (req, res) =>{
    console.log(req);
    const {name, email, password} = req.body;

    //Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({msg : "모든 필드를 채워주세요."})
    }
    //Chenck for exising user
    User.findOne({ email }).then((user) => {
        if (user)
          return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다" }); // 400error와 메세지를 보낸다
        const newUser = new User({
          name,
          email,
          password,
         });
        bcrypt.genSalt(10, (err, salt) => { // 이 라이브러리는 2^10만큼 돌린다
            bcrypt.hash(newUser.password, salt, (err, hash) => { // 소금쳐진 패스워드에 해쉬값을 적용
                if (err) throw err;
                newUser.password = hash; // 패스워드에 해싱을 적용
                newUser.save().then(user => { // 새로운유저를 저장
                    jwt.sign( // jwt에 등록한다(밑의 항목들)
                        { id: user.id },
                        JWT_SECRET, // .env파일에 적용할것
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
            })
        })
    })
});
//회원 검색
router.get('/', async(req, res)=> {
    try {
        const users = await User.find();
        if(!users) throw Error("No users")
        res.status(200).json(users);
    } catch(e){
        console.log(e);
        res.status(400).json({
            msg:e.message
        })
    }
})

export default router;