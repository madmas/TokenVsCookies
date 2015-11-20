module.exports = {

    dev: {
        targets: [
            {
                context: [
                    '/api',
                    '/sessions/create'
                ],
                target : 'http://localhost:5050'
            }
        ]
    },

    local: {
        targets: [
            {
                context: [
                    '/api',
                    '/sessions/create'
                ],
                target : 'http://localhost:5050'
            }
        ]
    }
};
