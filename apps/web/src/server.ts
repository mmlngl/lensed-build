import handler from "@tanstack/react-start/server-entry";

export default {
	fetch: handler.fetch,

	// Handle Queue messages
	// async queue(batch, env, ctx) {
	// 	for (const message of batch.messages) {
	// 		console.log("Processing message:", message.body);
	// 		message.ack();
	// 	}
	// },

	// Handle Cron Triggers
	// async scheduled(event, env, ctx) {
	// 	console.log("Cron triggered:", event.cron);
	// },
};
