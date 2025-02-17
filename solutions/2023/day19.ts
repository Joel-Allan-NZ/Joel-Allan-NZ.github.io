export function partOne(input: string[]): number | string {
  const { flows, parts } = parse(input)
  const accepted: number[][] = []

  parts.forEach((part) => {
    let result = 'in'
    while (true) {
      result = flows.get(result)!.find((x) => x.application(part))!.next
      if (result == 'R') break
      if (result == 'A') {
        accepted.push(part)
        break
      }
    }
  })
  return accepted.reduce(
    (total, part) => total + part[0] + part[1] + part[2] + part[3],
    0
  )
}

class Rule {
  next: string
  equality: string
  target: number
  xmas: number
  application: (part: number[]) => boolean

  constructor(rule: string) {
    const split = rule.split(':')
    this.next = split.length > 1 ? split[1] : split[0]
    this.xmas = this.xmasToNumber(rule[0])
    this.target = split.length == 1 ? -1 : parseInt(split[0].slice(2))
    this.equality = rule.length > 1 ? rule[1] : rule[0]

    if (this.target == -1) this.application = (r) => true
    else
      this.application =
        this.equality == '<'
          ? (r) => r[this.xmas] < this.target
          : (r) => r[this.xmas] > this.target
  }

  xmasToNumber(xmas: string) {
    switch (xmas) {
      case 'x':
        return 0
      case 'm':
        return 1
      case 'a':
        return 2
      default:
        return 3
    }
  }
}

function parse(input: string[]): {
  flows: Map<string, Rule[]>
  parts: number[][]
} {
  const flows = new Map<string, Rule[]>()
  const parts: number[][] = []
  let readingWorkFlows = true

  input.forEach((line) => {
    if (!line || line.length == 0) {
      readingWorkFlows = false
    } else {
      const split = line.slice(0, -1).split(/[\{\,]/g)
      if (readingWorkFlows)
        flows.set(
          split[0],
          split.slice(1).map((x) => new Rule(x))
        )
      else parts.push(split.slice(1, 5).map((i) => parseInt(i.slice(2))))
    }
  })
  return { flows, parts }
}

export function partTwo(input: string[]): number | string {
  const { flows, parts } = parse(input)
  const queue: { ranges: number[][][]; rules: Rule[] }[] = [
    {
      ranges: [
        [
          [1, 4000],
          [1, 4000],
          [1, 4000],
          [1, 4000],
        ],
      ],
      rules: flows.get('in')!,
    },
  ]
  let valid: number[][][] = []

  while (queue.length > 0) {
    const { ranges, rules } = queue.shift()!
    const result = applyRulesToRange(rules, ranges)
    result.entries().forEach((kvp) => {
      if (kvp[0] != 'R') {
        if (kvp[0] == 'A') valid = [...valid, ...kvp[1]]
        else queue.push({ ranges: kvp[1], rules: flows.get(kvp[0])! })
      }
    })
  }

  return valid.reduce(
    (total, range) => total + range.reduce((t, r) => t * (r[1] - r[0] + 1), 1),
    0
  )
}

function split(
  current: number[][],
  xmas: number,
  min: number,
  max: number
): number[][] {
  const other: number[][] = [
    [...current[0]],
    [...current[1]],
    [...current[2]],
    [...current[3]],
  ]
  other[xmas][1] = Math.min(max, current[xmas][1])
  other[xmas][0] = Math.max(min, current[xmas][0])

  if (other[xmas][0] > current[xmas][0] && other[xmas][0] < current[xmas][1])
    current[xmas][1] = other[xmas][0] - 1
  else if (
    current[xmas][1] > other[xmas][1] &&
    other[xmas][1] > current[xmas][0]
  )
    current[xmas][0] = other[xmas][1] + 1
  else {
    current[xmas][0] = -1
    current[xmas][1] = -1
  }
  return other
}

function applyRulesToRange(
  rules: Rule[],
  parts: number[][][]
): Map<string, number[][][]> {
  const continuing = new Map<string, number[][][]>()

  for (let part of parts) {
    for (let rule of rules) {
      if (!continuing.has(rule.next)) continuing.set(rule.next, [])
      if (rule.target == -1) {
        continuing.get(rule.next)!.push(part)
        break
      }
      let range = part[rule.xmas]

      if (range[0] <= rule.target && range[1] >= rule.target) {
        if (rule.equality == '>')
          continuing
            .get(rule.next)!
            .push(split(part, rule.xmas, rule.target + 1, Infinity))
        else
          continuing
            .get(rule.next)!
            .push(split(part, rule.xmas, -1, rule.target - 1))
      }
    }
  }

  return continuing
}
