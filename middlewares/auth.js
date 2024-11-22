import { getUser } from "../service/auth.js";

// AUTHENTICATION MIDDLEWARE
const checkForAuthentication = (req, res, next) => {
    const tokenCookie = req.cookies?.uid;
    console.log("token from cookie:", tokenCookie);
    req.user = null; 

    if(!tokenCookie) return next(); 

    const user = getUser(tokenCookie);
    console.log("User from token:", user);
    if (!tokenCookie || !user) {
      console.log("No Token found, redirecting to login");
      return res.redirect("/login");
    }
    req.user = user;
    console.log("Token found, proceeding");
    next();
};

// authorization middleware
function restrictTo(roles = []){
    return function(req, res ,next){
        console.log("Checking user role:", req.user);
        if(!req.user) return res.redirect('/login');
        if(!roles.includes(req.user.role)){
            console.log("User not authorized:", req.user.role);
            return res.status(403).send('You are unauthorised to perform this action');
        }
        next();
    }
}

// const handleRestrictToLoggedInUserOnly = (req, res, next) => {
//     const uid = req.cookies.uid;
//     // console.log("Session ID:", sessionId);
//     const user = getUser(uid);
//     if (!uid || !user) {
//         console.log("No session found, redirecting to login");
//         return res.redirect('/login');
//     }
//     req.user = user;
//     console.log("Session found, proceeding");
//     next();
// }

// async function checkAuth(req, res, next) {
//     const uid = req.cookies?.uid;

//     const user = getUser(uid);

//     req.user = user;
//     next();
//   }

export {
  //  handleRestrictToLoggedInUserOnly ,
  //  checkAuth ,
  checkForAuthentication,
  restrictTo
};
