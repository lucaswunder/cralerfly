const { parsed } = require('dotenv').config();
const dot = require('dot-object');

const envToObj = env => {
    return dot.object(env);
};

const ENV = process.env.NODE_ENV || 'development';

const loadEnvironment = ({
    'development':require('./dev.json'),
    'production':envToObj(parsed)
});

module.exports  = loadEnvironment[ENV];
