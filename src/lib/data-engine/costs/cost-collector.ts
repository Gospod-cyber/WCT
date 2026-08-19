import type {
  CostCollectionResult,
  WeaponCostRecord,
} from "./types";
import { costSources } from "./cost-sources";

const now = () => new Date().toISOString();

export async function collectWeaponCosts(): Promise<CostCollectionResult> {
  const warnings: string[] = [];

  const enabledSources = costSources
    .filter((source) => source.enabled)
    .sort((a, b) => a.priority - b.priority);

  for (const source of enabledSources) {
    warnings.push(
      `No structured cost parser is currently available for ${source.name}.`
    );
  }

  const records: WeaponCostRecord[] = [];

  return {
    success: records.length > 0,
    records,
    warnings,
    collectedAt: now(),
  };
}