import { useStaticQuery, graphql, Link } from 'gatsby'
import React from 'react'

export default function AdventSideNav() {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            year
            puzz
            title
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  const parse = (data: { allMdx: { nodes: any[] } }) => {
    var m = new Map<string, { year: string; active: boolean; days: string[] }>()
    data.allMdx.nodes.forEach((node) => {
      if (m.has(node.frontmatter.year))
        m.get(node.frontmatter.year)?.days.push(node.frontmatter.puzz)
      else
        m.set(node.frontmatter.year, {
          year: node.frontmatter.year,
          active: false,
          days: [node.frontmatter.puzz],
        })
    })
    m.values()
      .toArray()
      .forEach((x) => x.days.sort((x, y) => parseInt(x) - parseInt(y)))
    return [
      ...m
        .values()
        .toArray()
        .sort((x, y) => parseInt(y.year) - parseInt(x.year)),
    ]
  }

  const [expanded, setExpanded] = React.useState(parse(data))

  return (
    <nav className="sticky top-2 float-left mx-2 max-h-screen w-[15%] overflow-y-auto overflow-x-hidden  bg-chicPrimary">
      <h4 className="ml-1 text-xl text-blue-100">Advent of Code</h4>
      <div className="overflow-x-hidden overflow-y-scroll ">
        {expanded.map((expandedYear, index) => {
          return (
            <div
              key={`${expandedYear.year} collapsible overflow-y-auto overflow-x-hidden`}
            >
              <div className="flex items-center text-chicFour p-0 leading-tight transition-all rounded-lg outline-none transition-colors ease-in-out delay-100 duration-200 hover:bg-blue-200 hover:text-black">
                <button
                  onClick={() =>
                    setExpanded((expanded) => [
                      ...expanded.slice(0, index),
                      { ...expandedYear, active: !expandedYear.active },
                      ...expanded.slice(index + 1),
                    ])
                  }
                  type="button"
                  className="flex items-center justify-between w-full p-3 font-sans rounded text-xl antialiased"
                >
                  <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed">
                    {expandedYear.year}
                  </p>
                  {expanded[index].active ? (
                    <span className="ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4 mx-auto transition-transform"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        ></path>
                      </svg>
                    </span>
                  ) : (
                    <span className="ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-4 h-4 mx-auto transition-transform rotate-180"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        ></path>
                      </svg>
                    </span>
                  )}
                </button>
              </div>
              <div
                className={`transition-all ${
                  expandedYear.active ? '' : 'hidden'
                } overflow-y-auto overflow-x-hidden`}
              >
                {expandedYear.days.map((day) => (
                  <Link
                    key={`link to ${expandedYear.year}/${day}`}
                    className="ml-3 rounded text-chicFour flex h-8 min-h-full items-center px-5 leading-tight transition ease-in-out delay-50 duration-200 hover:bg-blue-200 hover:text-black hover:translate-x-1"
                    to={`/advent-of-code/${expandedYear.year}/${day}`}
                  >
                    Day {day}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
