import botica from "botica-lib-node";
import {randomUUID} from "crypto";

/**
 * A reactive bot that processes incoming data and publishes the results.
 *
 * This bot listens for orders with "process_data" action. When it receives an order,
 * it performs a simulated data transformation and publishes the processed result.
 */
async function main() {
  const bot = await botica();

  // Handles incoming orders with "process_data" action.
  // Receives raw data, processes it, and publishes a structured result
  // for other bots to consume.
  bot.on("process_data", async (rawData) => {
    console.log(`Received data for processing: ${rawData}`);

    // Process the data (simulate data transformation)
    const processedData = processData(rawData);

    // Publish the result
    await bot.publishOrder("processed_data",
        "store_processed_data", processedData);

    console.log(`Processed data published: ${processedData}`);
  });

  // Example shutdown handler
  bot.shutdownHandler.onShutdownRequest((req, res) => {
    if (req.isForced || !isProcessingData()) {
      saveData();
      res.setCanceled(true);
      return;
    }

    res.setCanceled(true);
  })

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

function isProcessingData() {
  return false;
}

function saveData() {
  // ...
}

main().catch(console.error);
