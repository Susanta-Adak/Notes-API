import mongoose from 'mongoose';
export const NoteSchema = mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    }
},{timestamps : true});

const noteModel = mongoose.model("Note", NoteSchema);
export default noteModel;