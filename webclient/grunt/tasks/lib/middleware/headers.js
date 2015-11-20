module.exports.request = function (grunt, headers) {
    var values = headers || {};
    grunt.verbose.writeln("Request headers: add proxy headers".cyan, JSON.stringify(values, null, 2));

    return function(req, res, next) {
        Object.keys(values).forEach(function(key) {
            req.headers[key] = values[key];
        });
        next();
    };
};

module.exports.response = function (grunt, headers) {
    var values = headers || {};
    grunt.verbose.writeln("Response headers: add proxy headers".cyan, JSON.stringify(values, null, 2));

    return function(req, res, next) {
        Object.keys(values).forEach(function(key) {
            res.setHeader(key, values[key]);
        });
        next();
    };
};