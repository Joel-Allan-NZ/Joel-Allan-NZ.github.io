import { useStaticQuery, graphql } from 'gatsby'
import { stringify } from 'querystring'
import React from 'react'

export default function AdventSideNav({ children }: { children: any }) {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            year
            puzz
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  const parse = (data) => {
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
    m.values().forEach((x) => x.days.sort((x, y) => parseInt(x) - parseInt(y)))
    return [...m.values().toArray()]
  }

  const [expanded, setExpanded] = React.useState(parse(data))

  return (
    <div>
      <nav className="float-left max-h-1vh w-[10%] flex-col">
        <h4 className="ml-1">
          <a href="/advent-of-code">Advent of Code</a>
        </h4>
        <div className="relative block w-full ">
          {expanded.map((expandedYear, index) => {
            return (
              <div key={`${expandedYear.year} collapsible`}>
                <div className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none transition-colors ease-in-out delay-100 duration-200 hover:bg-blue-50">
                  <button
                    onClick={() =>
                      setExpanded(() => [
                        ...expanded.slice(0, index),
                        { ...expandedYear, active: !expandedYear.active },
                        ...expanded.slice(index + 1),
                      ])
                    }
                    type="button"
                    className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-900 hover:text-blue-gray-900"
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
                  }`}
                >
                  {expandedYear.days.map((day) => (
                    <a
                      key={`link to ${expandedYear.year}/${day}`}
                      className="ml-3 flex items-center w-full p-1 leading-tight transition ease-in-out delay-50 duration-200 hover:bg-blue-50 hover:translate-x-2"
                      href={`/advent-of-code/${expandedYear.year}/${day}`}
                    >
                      {day}
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </nav>
      <div className="h-svh overflow-scroll">{children}</div>
    </div>
  )
}
