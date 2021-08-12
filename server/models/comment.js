import mongoose from "mongoose";
import moment from 'moment';

const CommentSchema = new mongoose.Schema({
    contents : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        default : moment().format("YYYY-MM-DD hh:mm:ss")
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "post"
    },
    creator :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    // creatorName : {type : String} 
    // user컬렉션을 참조하지않고 바로 DB에서 가져올수있게 작성한것
});

const Comment = mongoose.model("comment",CommentSchema);
export default Comment;