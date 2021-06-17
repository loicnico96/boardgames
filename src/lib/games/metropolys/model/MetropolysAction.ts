export type MetropolysBidAction = {
  district: number
  height: number
  pass: false
}

export type MetropolysPassAction = {
  pass: true
}

export type MetropolysAction = MetropolysBidAction | MetropolysPassAction
