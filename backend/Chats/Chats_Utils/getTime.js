
const moment = require('moment');

function getTime(){
    return moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
}

module.exports = getTime;