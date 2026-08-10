import { attacks } from "./attacks";

export type YearlyStatistic = {
  year: string;
  attacks: number;
};

export function calculateYearlyStatistics(): YearlyStatistic[] {
  const statistics: Record<string, number> = {};

  attacks.forEach((attack) => {
    const year = attack.date.slice(0, 4);

    if (!statistics[year]) {
      statistics[year] = 0;
    }

    statistics[year] += 1;
  });

  return Object.entries(statistics)
    .map(([year, attacks]) => ({
      year,
      attacks,
    }))
    .sort((a, b) => a.year.localeCompare(b.year));
}

export type MonthlyStatistic = {
  year: string;
  month: string;
  monthNumber: number;
  attacks: number;
};

export function calculateMonthlyStatistics(): MonthlyStatistic[] {
  const statistics: Record<string, number> = {};

  attacks.forEach((attack) => {
    const year = attack.date.slice(0, 4);
    const monthNumber = Number(attack.date.slice(5, 7));

    const key = `${year}-${String(monthNumber).padStart(2, "0")}`;

    if (!statistics[key]) {
      statistics[key] = 0;
    }

    statistics[key] += 1;
  });

  return Object.entries(statistics)
    .map(([key, attacks]) => {
      const [year, month] = key.split("-");

      return {
        year,
        month,
        monthNumber: Number(month),
        attacks,
      };
    })
    .sort((a, b) => {
      if (a.year !== b.year) {
        return a.year.localeCompare(b.year);
      }

      return a.monthNumber - b.monthNumber;
    });
}