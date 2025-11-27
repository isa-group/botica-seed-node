import botica from "botica-lib-node";
import {randomUUID} from "crypto";

/**
 * A proactive bot that periodically generates random data and publishes it using the "process_data"
 * action.
 *
 * This bot simulates a data producer, sending structured messages to be processed
 * by other bots in the Botica environment.
 */
async function main() {
  const bot = await botica();

  // Periodically generates and publishes data for processing.
  // Runs at regular intervals, creating a new dataset and publishing it
  // under the "process_data" action.
  bot.proactive(async () => {
    // Generate random data
    const generatedData = generateRandomData();

    // Publish the generated data with the "process_data" action and the "raw_data" key
    await bot.publish("raw_data", "process_data", generatedData);

    console.log(`Published new generated data: ${generatedData}`);
  });

  await bot.start();
}

/**
 * Simulates data generation.
 *
 * This method generates a structured data object containing a UUID and a timestamp.
 *
 * @returns {{data_id: UUID, timestamp: string}} a JSON string representing the generated data
 */
function generateRandomData() {
  return {
    data_id: randomUUID(),
    timestamp: new Date().toISOString()
  };
}

main().catch(console.error);
