const { Router } = require('express');
const Status = require('http-status');

module.exports = (ctx) => ({
    getInfo: async (req, res, next) => {
        try {
            const { username } = req.query;
            const result = await ctx.githubOperation.execute({ username });

            return res.status(Status.OK).json(result);

        } catch (err) {
            next(err);
        }
    },
    get router() {
        return Router()
            .get('/', this.getInfo);
    }
});
