module.exports = ({ legendatvServices, config }) => ({
    execute: async data => {
        const { credentials } = config;
        const pageToEvaluate = await legendatvServices.login({ credentials });


        return pageToEvaluate;
    }
});
