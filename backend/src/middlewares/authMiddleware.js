import jwt from "jsonwebtoken";

const verifyToken = (req,res,next) => {
    let token;
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (!token)
          return res
            .status(401)
            .json({message: "No token. You are not authorized" });

        try{
          console.log("RAW TOKEN TO VERIFY:", JSON.stringify(token));
          console.log("SECRET KEY IS:", process.env.JWT_SECRET);
          const decode = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decode;
          console.log("the decoded user is: ", req.user)
          next();
        } catch (err){
          console.log("JWT Error Details:", err.message);
          res.status(403).json({message: "Token is invalid"});
        }
    } else {
      res.status(401).json({message: "No token. You are not authorized" })
    }
  

}

export default verifyToken;