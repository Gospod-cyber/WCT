import { collectAirWarMonitorData } from "./collectors/air-war-monitor";
import { validateAttackRecord } from "./validator";

async function main() {
  try {
    const records = await collectAirWarMonitorData();

    const results = records.map((record) => {
      return validateAttackRecord(record);
    });

    console.log("Records:", records.length);

    console.log("Validation results:");

    console.log(
      JSON.stringify(results, null, 2)
    );

    console.log(
      "All valid:",
      results.every((result) => result.valid)
    );
  } catch (error) {
    console.error(
      "Data engine test failed:",
      error
    );

    process.exitCode = 1;
  }
}

main();