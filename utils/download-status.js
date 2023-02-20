const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

exports.sendStatusUpdate = function(message) {
        let messageToRespondWith = 'Current Downloads:';

		axios.get(`${process.env.QBIT_URL}/api/v2/torrents/info?filter=downloading`)
			.then(response => {
                //populate the message object
				response.data.forEach(element => {
					messageToRespondWith += generateDownloadStatusString(element);
				});

                //send message
				message.channel.send(messageToRespondWith)
			})
			.catch(error => {
				console.log(error);
			});
}


function generateDownloadStatusString(element) {
    return `
    > *${element.name}*
    > ${getTimeRemainingString(element.eta)} ${getDownloadSpeedString(element.dlspeed)}
    > ${getPeersString(element.num_seeds,element.num_leechs)}
    \n`
}

function getPeersString(seeds,leeches) {
    return `🟢 ${seeds} 🔴 ${leeches}`
}

function getTimeRemainingString(eta) {
    return `🕒 ${Math.round((eta / 60) *10) / 10}m`
}

function getDownloadSpeedString(dlspeed) {
    return `🔽 ${Math.round((dlspeed / 1000 / 1000) *10) /10} MiB/s`
}