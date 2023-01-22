const protect = async (req, res, next) => {
  try {
    const { user } = req.session;
    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = { protect };
