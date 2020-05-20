require('dotenv').config()

const fetch = require('node-fetch')

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

module.exports = async (req, res) => {
	await sendToTelegram('🎯 Ping test: success!')
	res.end('success')
}
