export type Result<T = unknown> = {
  value?: T
  failure?: string
}

export type Couplet<T = unknown> = [T] | [T, undefined] | [undefined, string]
