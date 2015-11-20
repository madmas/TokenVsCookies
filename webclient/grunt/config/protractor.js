module.exports = {
    options: {
        keepAlive: false
    },

    ci: {
        options: { configFile: "test/e2e/protractor-e2e-ci.js" }
    },

    local: {
        options: { configFile: "test/e2e/protractor-e2e-local.js" }
    }
};
