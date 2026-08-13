import jwt from "jsonwebtoken";

 export const Protect = (req, res, next) => {
const authHeader = req.headers.authorization;
if(!authHeader?.startsWith("Bearer "))
    return res.status(401).json({message: " No token provided"});

const token = authHeader.split(" ")[1];
try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
} catch (error) {
    res.status(401).json({message: "Invalid or expired token"});
}
}

export const AllowedRoles = (...roles) => (req, res, next) => {
    if(!roles.includes(req.user.role))
        return res.status(403).json({message: "access denied"}) 
     next();
}

