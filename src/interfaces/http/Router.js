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

    ApiRouter.use('/legendatv', handle(ctx.legendastvController.router));

    ApiRouter.use('/healthcheck', handle(ctx.healthCheckMiddleware));

    DefaultRouter.use('/api', ApiRouter);
    DefaultRouter.use('/*', ctx.notFoundMiddleware);
    DefaultRouter.use(ctx.httpErrorMiddleware);

    return DefaultRouter;
};
