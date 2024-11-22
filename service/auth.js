import jwt from "jsonwebtoken";
const secret = "SampleSecretKey";

// ********* Statefull Authentication or session based *************

// const sessionIdToUserMap = new Map();

// const setUser = (user, uid) => {
//     sessionIdToUserMap.set(sessionId, user);
// }

// const getUser = (uid) => {
//     return sessionIdToUserMap.get(sessionId);
// }




// ******** Stateless Authentication or token based *************
const setUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, secret);
};

const getUser = (uid) => {
  try {
    return jwt.verify(uid, secret);
  } catch (error) {
    console.log("Error verifying token:", error);
    return null;
  }
};

export {
  // createSession,
  //  getSession ,
  getUser,
  setUser,
};
