import mongoose from "mongoose";


interface UserParams {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDoc>{
    build(params: UserParams): UserDoc;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.build = (params: UserParams) => {
    return new User(params)
};


interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };