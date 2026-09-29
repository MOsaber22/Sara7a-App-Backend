export const globalErrorHandler = (err, req, res, next) => {
  return res.status(err.cause || 500).json({ success: false, message: err.message });
};

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => next(new Error(error)))
    }
}
