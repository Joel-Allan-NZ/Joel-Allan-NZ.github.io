import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql, Link } from 'gatsby'

export default function AdventOfCodeYearIndex({ data }) {
  return (
    <>
      <h1>Advent of Code</h1>
      <ul>
        {data.days.group.map((field) => {
          const groupName = field.fieldValue
          return (
            <React.Fragment key={groupName}>
              <h4>{groupName}</h4>
              <ul>
                {field.nodes.map((park) => (
                  <li key={park.gatsbyPath}>
                    <Link to={park.gatsbyPath}>{park.puzz}</Link>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          )
        })}
      </ul>
    </>
  )
}
export const Head: HeadFC = () => <title>Joel Advent of Code</title>

// export const query = graphql`
//   {
//     days: allDay {
//       group(field: { year: SELECT }) {
//         fieldValue
//         nodes {
//           year
//           puzz
//           gatsbyPath(filePath: "/advent-of-code/{day.year}/{day.puzz}")
//         }
//       }
//     }
//   }
// `
