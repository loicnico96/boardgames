import { useRef } from "react"

import { MetropolysContext } from "lib/games/metropolys/context"

export default function Metropolys() {
  const context = useRef(new MetropolysContext())

  return (
    <div>
      {JSON.stringify(context.current.getDefaultOptions(), undefined, 2)}
    </div>
  )
}
