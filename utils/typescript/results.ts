export class Exception {
  constructor(public readonly message: string) {}
}

export class AggregateException extends Exception {}

export class EvalException extends Exception {}

export class NetworkException extends Exception {}

export class RangeException extends Exception {}

export class ReferenceException extends Exception {}

export class SyntaxException extends Exception {}

export class TypeException extends Exception {}

export class URIException extends Exception {}

export class Result<T = unknown> {
  constructor(
    public readonly value: T,
    public readonly exception: null | Exception = null
  ) {}
}

export type Couplet<T = unknown> = [T, null | Exception]
