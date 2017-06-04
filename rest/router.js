const Express = require('express');
const Api = require('./api');
const WebPageRouter = require('./webclient');

class Router {
    static get web() {
        const webRouter = Express.Router();

        WebPageRouter.initialize(webRouter);

        return webRouter;
    }
}

module.exports = Router;