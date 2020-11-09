require('dotenv').config();
const express = require('express');
const { scopePerRequest } = require('awilix-express');

class Server {
    constructor ({ config, router, container }) {
        this.config = config;
        this.express = express();
        this.express.use(scopePerRequest(container));
        this.router = router;
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
        this.exception();
        this.routes();
        const SERVER_PORT = this.config.application.port;
        const ENV = process.env.NODE_ENV;

        return this.express.listen(SERVER_PORT || 3000, () => {
            console.log(`Server started on port: ${ SERVER_PORT } - Environment ${ ENV }`);
        });
    }
}
module.exports = Server;
