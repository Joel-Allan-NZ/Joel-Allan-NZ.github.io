import React from 'react'

export default function AdventSideNav({ children }: { children: any }) {
  const [expanded, setExpanded] = React.useState<
    { year: number; active: boolean; days: number[] }[]
  >([
    {
      year: 2024,
      active: true,
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25,
      ],
    },
    { year: 2023, active: false, days: [1] },
  ])

  return (
    <div>
      <nav className="float-left max-h-1vh w-[10%] flex-col">
        <h4 className="ml-1">Advent of Code Years</h4>
        <div className="relative block w-full ">
          {expanded.map((year, index) => {
            return (
              <div key={`${year.year} collapsible`}>
                <div className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none transition-colors ease-in-out delay-100 duration-200 hover:bg-blue-50">
                  <button
                    onClick={() =>
                      setExpanded(() => [
                        ...expanded.slice(0, index),
                        { ...year, active: !year.active },
                        ...expanded.slice(index + 1),
                      ])
                    }
                    type="button"
                    className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-900 hover:text-blue-gray-900"
                  >
                    <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed">
                      {year.year}
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
                  className={`transition-all ${year.active ? '' : 'hidden'}`}
                >
                  {year.days.map((day) => (
                    <a
                      key={`link to ${year.year}/${day}`}
                      className="ml-3 flex items-center w-full p-1 leading-tight transition ease-in-out delay-50 duration-200 hover:bg-blue-50 hover:translate-x-2"
                      href={`/advent-of-code/${year.year}/${day}`}
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
