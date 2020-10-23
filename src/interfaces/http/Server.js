require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { scopePerRequest } = require('awilix-express');

class Server {
    constructor ({ config, logger, router, container }) {
        this.config = config;
        this.logger = logger;
        this.express = express();
        this.express.use(scopePerRequest(container));
        this.router = router;
    }

    initLogger () {
        this.express.use(morgan('combined', { stream: this.logger.stream }));
    }

    routes () {
        this.express.use(this.router);
    }

    exception () {
        this.express.use(async (err, req, res, next) => {
            let title = 'Internal Server Error';
            if(err.name === 'Validation') title = 'Validation';
            return res.status(err.status || 500).json({ error: title, details:'err.message' });
        });
    }

    start() {
        this.initLogger();
        this.exception();
        this.routes();
        const SERVER_PORT = this.config.application.port;
        const ENV = process.env.NODE_ENV;

        return this.express.listen(SERVER_PORT || 3000, () => {
            this.logger.info(`Server started on port: ${ SERVER_PORT } - Environment ${ ENV }`);
        });

    }
}

module.exports = Server;
