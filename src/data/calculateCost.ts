import { weaponCosts } from "./weaponCosts";
import { weaponUsage } from "./weaponUsage";
import { attacks } from "./attacks";

export function calculateTotalCost(): number {
  return weaponUsage.reduce((total, usage) => {
    const weapon = weaponCosts.find(
      (item) => item.name === usage.name
    );

    if (!weapon || weapon.primaryEstimate === null) {
      return total;
    }

    return total + usage.quantity * weapon.primaryEstimate;
  }, 0);
}

export function calculateAttackCost(): number {
  return attacks.reduce((total, attack) => {
    return attack.weapons.reduce((attackTotal, weaponUsage) => {
      if (weaponUsage.quantity === null) {
        return attackTotal;
      }

      const weapon = weaponCosts.find(
        (item) => item.name === weaponUsage.name
      );

      if (!weapon || weapon.primaryEstimate === null) {
        return attackTotal;
      }

      return (
        attackTotal +
        weaponUsage.quantity * weapon.primaryEstimate
      );
    }, total);
  }, 0);
}