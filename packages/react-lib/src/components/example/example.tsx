import {ReactElement} from "react"

export interface ExampleProps {
  value: number
}

export function Example({value}: ExampleProps): ReactElement {
  return <div>{value}</div>
}
