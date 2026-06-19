type Couplet<T = unknown> = [T] | [T, undefined] | [undefined, string]

type Result<T = unknown> =
  | { value: T; failure?: undefined }
  | { value?: undefined; failure: string }
