import dotenv from "dotenv";
dotenv.config();

export default{
    MONGO_URI : process.env.MONGO_URI,
    // 실제 URI를 알 수가 없음
    JWT_SECRET : process.env.JWT_SECRET
}