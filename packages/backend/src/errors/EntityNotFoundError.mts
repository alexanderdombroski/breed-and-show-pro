import CustomError from "./CustomError.mts";
import type { ErrorCode } from "./types.d.mts";
export default class EntityNotFoundError extends CustomError<ErrorCode> {}
