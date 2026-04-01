import type { Request, Response, NextFunction } from "express";

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
};

export async function calculateBreeding(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { breedingDate } = req.body;
    if (!breedingDate) {
      return res.status(400).json({ message: "breedingDate is required" });
    }

    const startDate = new Date(breedingDate);
    if (Number.isNaN(startDate.getTime())) {
      return res.status(400).json({ message: "Invalid breedingDate" });
    }

    const confirmedDate = addDays(startDate, 22);
    const expectedFarrowingDate = addDays(startDate, 114);
    const pigletsSixMonthsDate = addDays(expectedFarrowingDate, 183);

    res.json({
      breedingDate: startDate,
      confirmedDate,
      expectedFarrowingDate,
      pigletsSixMonthsDate,
    });
  } catch (error) {
    next(error);
  }
}
