const util = require('./common/utils');

const Service = require('./rest');
const babylongService = new Service();

util.readJSONFile('./config.json')
.then((config) => {
    babylongService.setSettings(config);
    babylongService.start();
}).catch(error => console.log(error));
