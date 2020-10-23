const { Router } = require('express');
const Status = require('http-status');

module.exports = (ctx) => ({
    getSubtitles: async (req, res, next) => {
        try {
            const data = { ...req.body };
            const result = await ctx.legendastvSearchOperation.execute(data);
            return res.status(Status.OK).json(result);
        } catch (err) {
            next(err);
        }
    },
    get router() {
        return Router()
            .get('/search', ctx.validatorMiddleware(ctx.legendastvSchema), this.getSubtitles);
    }
});
