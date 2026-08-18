import type { AttackDataRecord } from "./types";

export type ValidationResult = {
  valid: boolean;
  calculatedTotal: number | null;
  difference: number | null;
  warnings: string[];
};

export function validateAttackRecord(
  record: AttackDataRecord
): ValidationResult {
  const warnings: string[] = [];

  const values = [
    record.drones,
    record.cruiseMissiles,
    record.ballisticMissiles,
    record.aircraft,
    record.other,
  ];

  const knownValues = values.filter((value) => value !== null);

  const calculatedTotal =
    knownValues.length > 0
      ? knownValues.reduce(
          (sum, value) => sum + (value as number),
          0
        )
      : null;

  if (record.total === null) {
    return {
      valid: true,
      calculatedTotal,
      difference: null,
      warnings,
    };
  }

  if (calculatedTotal === null) {
    warnings.push(
      "No category values are available to validate the total."
    );

    return {
      valid: true,
      calculatedTotal: null,
      difference: null,
      warnings,
    };
  }

  const difference = record.total - calculatedTotal;

  if (difference !== 0) {
    warnings.push(
      `Total mismatch: ${
        difference > 0 ? "+" : ""
      }${difference} unclassified records.`
    );
  }

  return {
    valid: difference === 0,
    calculatedTotal,
    difference,
    warnings,
  };
}