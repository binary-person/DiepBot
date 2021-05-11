const serverStartTime = Date.now();

function formatMS(tempTime) {
    tempTime = Math.floor(tempTime / 1000);
    var seconds = tempTime % 60;
    tempTime = Math.floor(tempTime / 60);
    var minutes = tempTime % 60;
    tempTime = Math.floor(tempTime / 60);
    var hours = tempTime % 24;
    tempTime = Math.floor(tempTime / 24);
    var days = tempTime;
    
    var show = function(value, units) {
        if (value)
            return value + " " + units + (value === 1 ? "" : "s") + " ";
        return "";
    };
    var timeString = (show(days, "day") + show(hours, "hour") + show(minutes, "minute") + show(seconds, "second")).slice(0, -1);
    return timeString;
}


module.exports = {
    handler: ({msg}) => {
        msg.lineReply('server uptime: ' + formatMS(Date.now() - serverStartTime));
    }
};
