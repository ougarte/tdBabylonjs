const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const Ejs = require('ejs');
const Express = require('express');
const Path = require('path');

const Router = require('./router');

/**
 *
 */
class Service {
    constructor() {
        this.port;
        this.service = new Express();
    }

    setSettings(setting) {
        this.port = setting.host.port;
        this.setEngineView(setting);
        this.setMiddlewares(setting);
        this.setPublicResources(setting);
        this.setRoutes(setting);
    }

    setEngineView(setting) {
        this.service.engine('html', Ejs.__express);
        this.service.set('views', 'templates');
        this.service.set('view engine', 'html');
    }

    setMiddlewares(setting) {
        this.service.use(BodyParser.json());
        this.service.use(BodyParser.urlencoded({extended: false}));
        this.service.use(CookieParser());
    }

    setPublicResources(setting) {
        const publicDirectory = 'public';
        const bowerDirectory = 'bower_components';

        this.service.use(Express.static(publicDirectory));
        this.service.use('/bower_components', Express.static(bowerDirectory));
    }

    setRoutes(setting) {
        this.service.use(Router.web);
    }

    start() {
        const that = this;
        this.service.listen(this.port, () => {
            console.log('Running at:' + that.port);
        });
    }
}

module.exports = Service;