module.exports = (ctx) => (req, res, next) => next(ctx.exception.notFound());
