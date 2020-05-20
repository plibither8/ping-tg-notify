require('dotenv').config()

const fetch = require('node-fetch')
const fastify = require('fastify')({ trustProxy: false });

const {TG_BOT_NAME, TG_BOT_SECRET} = process.env
async function sendToTelegram(message) {
	await fetch(`https://tg.mihir.ch/${TG_BOT_NAME}`, {
		method: 'POST',
		body: JSON.stringify({
			text: message,
			secret: TG_BOT_SECRET
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

fastify.get('/', async (req, res) => {
	const {ip} = req;
	const ipDetails = await fetch(`http://ip-api.com/json/${ip}?fields=4255257`)
		.then(res => res.json());
	await sendToTelegram(
`🎯 *Ping test: success!*

*IP Details:*
*IP:* \`${ip}\`
*ISP:* ${ipDetails.isp}
*Org:* ${ipDetails.org}
*AS:* ${ipDetails.as}
*AS Name:* ${ipDetails.asName}
*City:* ${ipDetails.city}
*Region:* ${ipDetails.regionName}
`)
	res.send('success')
});

fastify.post('/', async (req, res) => {
	const {ip, body} = req;
	const ipDetails = await fetch(`http://ip-api.com/json/${ip}?fields=4255257`)
		.then(res => res.json());
	await sendToTelegram(
`🎯 *Ping test: success!*

*IP Details:*
*IP:* \`${ip}\`
*ISP:* ${ipDetails.isp}
*Org:* ${ipDetails.org}
*AS:* ${ipDetails.as}
*AS Name:* ${ipDetails.asName}
*City:* ${ipDetails.city}
*Region:* ${ipDetails.regionName}

*Request body:*
${body}
`)
	res.send('success')
});

module.exports = async (req, res) => {
	console.log(Object.keys(req))
}
