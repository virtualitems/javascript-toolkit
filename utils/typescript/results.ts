export class Result<T = unknown> {
  constructor(
    public readonly value: T,
    public readonly failure: undefined | null | string = null
  ) {}
}

export type Couplet<T = unknown> = [T, undefined | null | string]
