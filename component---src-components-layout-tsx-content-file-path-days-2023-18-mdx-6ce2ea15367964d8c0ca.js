"use strict";(self.webpackChunkjoel_allan_nz_github_io=self.webpackChunkjoel_allan_nz_github_io||[]).push([[6006],{6364:function(e,n,t){t.r(n),t.d(n,{Head:function(){return g},default:function(){return h}});var r=t(8453),a=t(6540);function i(e){const n=Object.assign({h2:"h2",p:"p",a:"a",pre:"pre",code:"code"},(0,r.RP)(),e.components),{CodeBox:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("CodeBox",!0),a.createElement(a.Fragment,null,a.createElement(n.h2,null,"Part One"),"\n",a.createElement(n.p,null,"Geometry time!"),"\n",a.createElement("br"),"\n",a.createElement(n.p,null,"The input is well-structured with no back-tracking, so I was able to trivially build\na list of vertex coordinates by recording the current position after each instruction.\nWith a list of sequential corner coordinates, it's simple (and very speedy) to build\na total area for a polygon using ",a.createElement(n.a,{href:"https://en.wikipedia.org/wiki/Shoelace_formula"},"Gauss' area formula"),",\nalso known as the shoelace formula."),"\n",a.createElement("br"),"\n",a.createElement(n.p,null,"But that alone won't get you a correct answer, as we're working in a manhattan distance\ncoordinate system that includes the perimeter! To get the total inclusive area you\nalso need to add half of the total perimeter of the polygon, and an additional +1."," "),"\n",a.createElement(t,{names:"typescript|C#"},a.createElement(n.pre,null,a.createElement(n.code,{className:"language-ts"},"export function partOne(input: string[]): number | string {\n  const corners = digTrenches(input)\n\n  return gaussArea(corners) + calculatePerimeter(corners) / 2 + 1\n}\n\nfunction digTrenches(input: string[]): number[][] {\n  let x = 0,\n    y = 0\n  const corners: number[][] = []\n\n  for (let line of input) {\n    const split = line.split(' ')\n    const distance = parseInt(split[1])\n    corners.push([x, y])\n\n    x = split[0] == 'R' ? x + distance : split[0] == 'L' ? x - distance : x\n    y = split[0] == 'D' ? y + distance : split[0] == 'U' ? y - distance : y\n  }\n  return corners\n}\n\nfunction gaussArea(corners: number[][]): number {\n  const total = corners\n    .map((corner, index) =>\n      index == corners.length - 1\n        ? [corner, corners[0]]\n        : [corner, corners[index + 1]]\n    )\n    .reduce(\n      (total, pair) =>\n        total + pair[0][0] * pair[1][1] - pair[1][0] * pair[0][1],\n      0\n    )\n\n  return 0.5 * Math.abs(total)\n}\n\nfunction calculatePerimeter(corners: number[][]) {\n  return corners\n    .map((corner, index) =>\n      index == corners.length - 1\n        ? [corner, corners[0]]\n        : [corner, corners[index + 1]]\n    )\n    .reduce(\n      (total, pair) =>\n        total +\n        Math.abs(pair[0][0] - pair[1][0]) +\n        Math.abs(pair[0][1] - pair[1][1]),\n      0\n    )\n}\n")),a.createElement(n.pre,null,a.createElement(n.code,{className:"language-csharp"},'public override object PartOne()\n{\n    var corners = DigTrenches(Input);\n    var totalPerimeter = CalculateLength(corners);\n\n    return GaussArea(corners) + totalPerimeter / 2 + 1;\n}\n\nprivate static long CalculateLength(List<long[]> corners)\n{\n    return corners.Zip([.. corners[1..], corners[0]])\n                  .Sum(line => Math.Abs(line.First[0] - line.Second[0]) + Math.Abs(line.Second[1] - line.First[1]));\n}\n\nprivate static List<long[]> DigTrenches(IEnumerable<string> input)\n{\n    int x = 0, y = 0;\n    List<long[]> corners = [];\n\n    foreach (var line in input)\n    {\n        var split = line.Split(\' \');\n        var distance = int.Parse(split[1]);\n        corners.Add([x, y]);\n\n        x = split[0] == "R" ? x + distance : split[0] == "L" ? x - distance : x;\n        y = split[0] == "D" ? y + distance : split[0] == "U" ? y - distance : y;\n    }\n\n    return corners;\n}\n\nprivate static long GaussArea(List<long[]> corners)\n{\n    var total = corners.Zip([.. corners[1..], corners[0]])\n                       .Sum((pair) => (pair.First[0] * pair.Second[1]) - (pair.Second[0] * pair.First[1]));\n\n    return (long)(Math.Abs(total) * 0.5);\n}\n'))),"\n",a.createElement(n.h2,null,"Part Two"),"\n",a.createElement(n.p,null,"Well, that's not at all what I expected from the hexcodes in the input. A bit of quick input parsing and we can run an identical algorithm to part one (albeit with much larger input distances). Our mathematical approach handles this with no issue; increasing the size of the sides of the polygon does nothing to increase big O complexity."),"\n",a.createElement(t,{names:"typescript|C#"},a.createElement(n.pre,null,a.createElement(n.code,{className:"language-ts"},"export function partTwo(input: string[]): number | string {\n  var directions = ['R', 'D', 'L', 'U']\n  const parsedInput = input.map((line) => {\n    var split = line.split(' ')\n    var direction = directions[parseInt(split[2][split[2].length - 2])]\n    return `${direction} ${parseInt(split[2].slice(2, -2), 16)}`\n  })\n\n  const corners = digTrenches(parsedInput)\n\n  return gaussArea(corners) + calculatePerimeter(corners) / 2 + 1\n}\n")),a.createElement(n.pre,null,a.createElement(n.code,{className:"language-csharp"},"public override object PartTwo()\n{\n    Dictionary<long, List<long>> positions = [];\n\n    var parsedInput = Input.Select(line =>\n    {\n        var direction = line[^2] switch\n        {\n            '0' => 'R',\n            '1' => 'D',\n            '2' => 'L',\n            _ => 'U'\n        };\n        return $\"{direction} {int.Parse(line.Split(' ')[2][2..^2], System.Globalization.NumberStyles.HexNumber)}\";\n    });\n\n    var corners = DigTrenches(parsedInput);\n    var totalPerimeter = CalculateLength(corners);\n\n    return GaussArea(corners) + totalPerimeter / 2 + 1;\n}\n"))))}var l=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.RP)(),e.components);return n?a.createElement(n,e,a.createElement(i,e)):i(e)};var o=t(2779),s=t(7206),c=t(791),p=t(4813),u=t(572);const m={CodeBox:o.A};function d(e){let{pageContext:n,children:t}=e;return a.createElement(a.Fragment,null,a.createElement(p.A,null),a.createElement("div",{className:"min-h-screen bg-chicPrimary"},a.createElement(c.A,{props:n.list}),a.createElement("div",{className:"adventofcode max-w-[60%] ml-[20%]"},a.createElement("h1",null,a.createElement("a",{href:"https://adventofcode.com/"+n.year+"/day/"+n.puzz},n.year+" Day "+n.puzz+" - "+n.title)),a.createElement(r.xA,{components:m},t),n.puzz&&n.year?a.createElement(s.A,{year:n.year,puzz:n.puzz}):a.createElement(a.Fragment,null))),a.createElement(u.A,null))}function h(e){return a.createElement(d,e,a.createElement(l,e))}const g=()=>a.createElement(a.Fragment,null,a.createElement("title",null,"Joel-Allan-NZ - Advent of Code"),a.createElement("html",{lang:"en"}),a.createElement("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),a.createElement("link",{rel:"preconnect",href:"https://fonts.gstatic.com"}),a.createElement("link",{href:"https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&family=VT323&display=swap",rel:"stylesheet"}))}}]);
//# sourceMappingURL=component---src-components-layout-tsx-content-file-path-days-2023-18-mdx-6ce2ea15367964d8c0ca.js.map