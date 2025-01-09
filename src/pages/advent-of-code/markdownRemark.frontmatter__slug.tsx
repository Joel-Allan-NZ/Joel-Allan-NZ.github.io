// import * as React from 'react'
// import { graphql, Link } from 'gatsby'
// import { partOne, partTwo } from '../../../solutions/handler'
// import Layout from '../../components/Layout'

// function DayYear({ data }) {
//   const { markdownRemark } = data
//   const { frontmatter, html } = markdownRemark
//   const [input, setInput] = React.useState<string>('')

//   const [solution, setSolution] = React.useState<string | number | null>(null)

//   const solvePartOne = () => {
//     setSolution(() =>
//       partOne(frontmatter.year, frontmatter.puzz, input.split(/[\r\n]+/))
//     )
//   }

//   const solvePartTwo = () => {
//     setSolution(() =>
//       partTwo(frontmatter.year, frontmatter.puzz, input.split(/[\r\n]+/))
//     )
//   }

//   const inputChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setInput(() => e.target.value.trim())
//   }

//   return (
//     <Layout>
//       <header>
//         <Link to="/">Go back to "Home"</Link>
//       </header>
//       <div>
//         <h1>
//           {frontmatter.year} Day {frontmatter.puzz}
//         </h1>
//         <div dangerouslySetInnerHTML={{ __html: html }} />
//         <div>Try my solutions for yourself!</div>
//         <div>
//           <label htmlFor="input">Puzzle Input</label>
//           <textarea
//             name="input"
//             className="w-full border-2"
//             value={input}
//             onChange={(e) => inputChanged(e)}
//           ></textarea>
//         </div>
//         <div>
//           <button onClick={() => solvePartOne()} className="mx-5">
//             Run Part One
//           </button>
//           <button onClick={() => solvePartTwo()}>Run Part Two</button>
//         </div>
//         {solution ? <p>Answer: {solution}</p> : <></>}
//       </div>
//     </Layout>
//   )
// }

// export default DayYear

// export const query = graphql`
//   query ($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       html
//       frontmatter {
//         slug
//         year
//         puzz
//       }
//     }
//   }
// `
