import { Request } from "express";

export const getQueries = (req: Request) => {
  const query = req.query.include ? req.query.include.split(",") : [];
  const skipAmount = req.query.skip ?? 0;
  const limitAmount = req.query.limit ?? 0;

  return {
    query,
    skipAmount,
    limitAmount,
  };
};
