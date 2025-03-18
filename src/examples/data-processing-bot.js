import botica from "botica-lib-node";
import {randomUUID} from "crypto";

/**
 * A reactive bot that processes incoming data and publishes the results.
 *
 * This bot listens for the "process_data" order. When it receives a message,
 * it performs a simulated data transformation and publishes the processed result.
 */
async function main() {
  const bot = await botica();

  // Handles incoming "process_data" orders.
  // Receives raw data, processes it, and publishes a structured result
  // for other bots to consume.
  bot.onOrderReceived(async (rawData) => {
    console.log(`Received data for processing: ${rawData}`);

    // Process the data (simulate data transformation)
    const processedData = processData(rawData);

    // Publish the result
    await bot.publishOrder(processedData, "processed_data",
        "store_processed_data");

    console.log(`Processed data published: ${processedData}`);
  }, "process_data");

  // Listens for "shutdown" orders.
  bot.onOrderReceived(() => process.exit(), "shutdown");

  await bot.start();
}

/**
 * Simulates a data transformation task.
 *
 * This function takes raw data, creates a JSON structure with the input data
 * and a UUID (simulating a processing step), and returns a structured output.
 *
 * @param {string} inputData - The raw input data
 * @returns {{processed: string, id: UUID}} A processed result with a UUID identifier
 */
function processData(inputData) {
  // Simulating a processing operation (e.g., enrichment, validation)
  return {
    processed: inputData,
    id: randomUUID()
  };
}

main().catch(console.error);
