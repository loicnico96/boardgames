import { useRef } from "react"

import { RoborallyContext } from "lib/games/roborally/context"

export default function Roborally() {
  const context = useRef(new RoborallyContext())

  return (
    <div>
      {JSON.stringify(context.current.getDefaultOptions(), undefined, 2)}
    </div>
  )
}
