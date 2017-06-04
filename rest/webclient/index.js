class WebPageRouter {
    static initialize(router) {
        WebPageRouter.base(router);
    }

    static base(router) {
        router.get('/', (request, response) => {
            response.render('index');
        });
    }
}

module.exports = WebPageRouter;