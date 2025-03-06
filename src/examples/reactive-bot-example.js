import botica from "botica-lib-node";
import {randomUUID} from "crypto";

const bot = await botica();

// Listens for "echo" orders.
//
// This publishes a "handle_echo" order with the incoming message to any bot
// subscribed to the "echo_handling" key.
bot.onOrderReceived(async (message) => {
  await bot.publishOrder(message, "echo_handling", "handle_echo");
}, "echo");

// Listens for the default order of this bot. This must be specified in the
// configuration file when using this bot within a Botica environment.
// If no default order is specified, an error will be thrown.
bot.onOrderReceived(runBotAction);

// Listens for "run_bot_action" orders.
bot.onOrderReceived(runBotAction, "run_bot_action");

// Listens for "shutdown" orders.
bot.onOrderReceived(() => process.exit(), "shutdown");

await bot.start();

async function runBotAction(message) {
  // Perform a long-blocking task.
  const longBlockingTaskResult = await runLongBlockingTask(message);

  // Publish the result using the default publish configuration of this bot.
  // This must be specified in the configuration file when using this bot
  // within a Botica environment.
  // If no default publish configuration is specified, an error will be thrown.
  await bot.publishOrder(longBlockingTaskResult);

  // You can also publish a message with a custom key and order.
  await bot.publishOrder(longBlockingTaskResult, "publish_key", "run_action");
}

async function runLongBlockingTask(base) {
  return new Promise((resolve) =>
      setTimeout(() => resolve(base + randomUUID()), 5000)
  );
}
