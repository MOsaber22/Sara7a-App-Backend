export const authorization = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return next(new Error("authentication required", {cause: 401}))
      }
      if (!roles.includes(req.user.role)) {
        return next(new Error("not allowed request", {cause: 403}))
      }
      next();
    } catch (error) {
        return res.status(500).json({message: "server error", error})
    }
  };
};
