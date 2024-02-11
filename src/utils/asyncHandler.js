const asyncHandler = (innerFn) => {
  return (req, res, next) => {
    Promise.resolve(innerFn(req, res, next)).catch((err) => next(err));
  };
};
export { asyncHandler };
