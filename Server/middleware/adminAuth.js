import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const verifyAdmin = (req, res, next) => {
  console.log('[Admin Auth] Cookies:', req.cookies);
  const token = req.cookies.token;

  if (!token) {
    console.log('[Admin Auth] No token found');
    return res.redirect('/login');
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('[Admin Auth] Token error:', err.message);
      return res.redirect('/login');
    }

    console.log('[Admin Auth] Decoded token:', decoded);

    if (!decoded.isAdmin) {
      console.log('[Admin Auth] User is not admin');
      return res.redirect('/Books');
    }

    req.user = decoded;
    next();
  });
};



export default verifyAdmin;