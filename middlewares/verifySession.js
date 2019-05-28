export default (req, res, next) => {
  res.json({ login: req.session.user && req.cookies.user_sid });
  next();
};
