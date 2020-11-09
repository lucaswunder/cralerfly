const startApplication = async () => {

    const container = require('./src/container');

    const app = container.resolve('application');

    if(process.env.NODE_INTERFACE !== 'console') {
        app
            .start()
            .catch((error) => {
                console.log(error.stack);
                process.exit();
            });
    }
    else {
        console.log('Application Started on console mode');
        container.resolve('console');
    }

};

startApplication();
