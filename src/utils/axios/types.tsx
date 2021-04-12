export type dFn = () => {}
export interface ResponseProps {
  [key: string]: any
  code?: number
  status?: number
  message?: string
}

export interface Params {
  [key: string]: any
  token?: string
}
