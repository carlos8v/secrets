const express = require('express');

const routes = express.Router();

const SecretsController = require('./controllers/SecretsController');

routes.get('/secrets', SecretsController.index);
routes.get('/secrets/total', SecretsController.count);
routes.get('/secrets/:id', SecretsController.find);
routes.post('/secrets/new', SecretsController.create);

module.exports = routes;
