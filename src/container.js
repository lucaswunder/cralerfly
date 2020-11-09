require('dotenv').config();
const awilix = require('awilix');
const container = awilix.createContainer();

const Application = require('./app/Application');
const Router = require('./interfaces/http/Router');
const Server = require('./interfaces/http/Server');

const Config = {
    application:{
        name: process.env.APPLICATION_NAME,
        port: process.env.APPLICATION_PORT,
        screenshot_path: process.env.APPLICATION_SCREENSHOTS_PATH,
    },
    GITHUB_URL:process.env.GITHUB_URL,
    GITHUB_USER:process.env.GITHUB_USER,
    GITHUB_PASSWORD:process.env.GITHUB_PASSWORD
};

container
    .register({
        application: awilix.asClass(Application).singleton(),
        config: awilix.asValue(Config),
        container: awilix.asValue(container),
        router: awilix.asFunction(Router).singleton(),
        server: awilix.asClass(Server).singleton(),
    })
    .loadModules(
        [
            'src/app/operations/**/*.js',
            'src/integration/**/*.js',
            'src/interfaces/http/controllers/**/*.js',
        ],
        {
            formatName: 'camelCase',
            resolverOptions: {
                injectionMode: awilix.InjectionMode.PROXY
            }
        }
    );

module.exports = container;
