const express = require('express');
const handle = require('express-async-handler');
const compression = require('compression');

const DefaultRouter = express.Router();
const ApiRouter = express.Router();

module.exports = (ctx) => {
    DefaultRouter
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(compression());

    ApiRouter.use('/github', handle(ctx.githubController.router));

    DefaultRouter.use('/api', ApiRouter);

    DefaultRouter.use('/*',  (req, res, next) => {
        const title = 'NotFound';
        return res.status(404).json({ error: title, details:'address not found' });
    });

    return DefaultRouter;
};
