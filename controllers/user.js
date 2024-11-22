import User from "../models/user.js";
// import { v4 as uuidv4 } from 'uuid';
import { 
    // createSession, 
    setUser} from "../service/auth.js";

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;
        const user =  await User.create({
            name,
            email,
            password
        });
        console.log(user);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        // const sessionId = uuidv4();
        // createSession(user, sessionId);
        
        const token = setUser(user);
        
        // res.cookie('sessionId', sessionId);
        
        res.cookie('uid', token);
        console.log("Token created");
        // console.log("Session created with ID:", sessionId); 
        
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('login', { error: 'An error occurred. Please try again.' });
    }
}

export { handleUserSignup , handleUserLogin };