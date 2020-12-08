const express = require('express');

const routes = express.Router();

const SecretsController = require('./controllers/SecretsController');

routes.get('/secrets', SecretsController.index);
routes.get('/secrets/pages', SecretsController.count);
routes.get('/secrets/:id', SecretsController.find);
routes.delete('/secrets/destroy/:id', SecretsController.destroy);
routes.post('/secrets/new', SecretsController.create);

module.exports = routes;
