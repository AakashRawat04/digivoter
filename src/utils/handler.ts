import type { RequestHandler } from "express";

type AsyncRequestHandler = (fn: RequestHandler) => RequestHandler;

export const asyncHandler: AsyncRequestHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};