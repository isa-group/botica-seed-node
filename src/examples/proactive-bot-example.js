import botica from "botica-lib-node";
import {randomUUID} from "crypto";

const bot = await botica();

// Executes the proactive action for this bot. This method will run periodically
// following the initial delay and period specified in the Botica configuration
// file for this bot.
bot.proactive(async () => {
  // Perform a long-blocking task.
  const longBlockingTaskResult = await runLongBlockingTask();

  // Publish the result using the default publish configuration of this bot.
  // This must be specified in the configuration file when using this bot
  // within a Botica environment.
  // If no default publish configuration is specified, an error will be thrown.
  await bot.publishOrder(longBlockingTaskResult);

  // You can also publish a message with a custom key and order.
  await bot.publishOrder(longBlockingTaskResult, "publish_key", "run_action");
});

async function runLongBlockingTask() {
  return new Promise(
      (resolve) => setTimeout(() => resolve(randomUUID()), 5000));
}

await bot.start();
