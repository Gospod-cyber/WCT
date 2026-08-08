import { weaponCosts } from "./weaponCosts";
import { weaponUsage } from "./weaponUsage";

export function calculateTotalCost(): number {
  console.log("WEAPON COSTS:", weaponCosts);
  console.log("WEAPON USAGE:", weaponUsage);

  return weaponUsage.reduce((total, usage) => {
    const weapon = weaponCosts.find(
      (item) => item.name === usage.name
    );

    console.log(
      "CHECK:",
      usage.name,
      "quantity:",
      usage.quantity,
      "found:",
      weapon
    );

    if (!weapon || weapon.primaryEstimate === null) {
      return total;
    }

    return total + usage.quantity * weapon.primaryEstimate;
  }, 0);
}