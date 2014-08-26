/**
 * Copyright (c) 2014 TopCoder, Inc. All rights reserved.
 */
'use strict';

var config = require('meanio').loadConfig();
var challenges = require('../controllers/challenges');


// The Package is past automatically as first parameter
module.exports = function(Challenges, app, auth, database) {

    // routes for Challenge mdoel CRUD operations
    app.route('/challenges')
        .get(challenges.all)
        .post(auth.requiresLogin, challenges.create);
    app.route('/challenges/:challengeId')
        .get(challenges.show)
        .put(auth.requiresLogin, challenges.update)
        .delete(auth.requiresLogin, challenges.destroy);
    // set the challengeId param
    app.param('challengeId', challenges.challenge);

    // routes for client config
    app.get('/clientConfig', auth.requiresLogin, function(req, res) {
        // return client config
        res.status(200).json(config.client);
    });
};
