import express, {Request, Response} from "express";
import { body, validationResult } from "express-validator";
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup',
    [
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .trim()
        .isLength({ min: 8, max: 25 })
        .withMessage('Password must be at least 8 characters long'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ "errors": errors.array(), "data": req.body });
        }
        
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            res.send({});
        }
    
        const user = User.build({ email, password })
        await user.save();
        res.status(201).send(user);
});




export { router as signUpRouter }