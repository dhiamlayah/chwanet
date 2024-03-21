const jwt = require("jsonwebtoken");

function auth(req: any, res: any, next: any) {
  const token =req.headers['token']
   if (!token) {
   return  res.status(401).json({ message: "access denied.No token provided" });
  }
  try {
    const decoded = jwt.verify(token, "9b666d7e937f5ac99ad723920168d2a06b471a1a0cd8be6cd145451118b1180b538249fece1643e7faf75f52c84efac18430e2008f60ee36c772aa923c3a06b6");
    req.user = decoded
    next()
  } catch (error: any) {
    res.status(400).json({ message: "invalid token"});
  }
}


module.exports=auth 