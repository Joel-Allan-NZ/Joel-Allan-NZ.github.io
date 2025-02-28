import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import AdventSideNav from '../components/AdventSideNav'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function AdventOfCodeYearIndex(result: any) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-chicPrimary">
        <AdventSideNav props={result?.data.allMdx.nodes} />
        <div className="adventofcode max-w-[60%] ml-[20%] min-h-[1.95] mb-10">
          <h1 className="text-chicFive">Advent of Code</h1>
          <br />
          <p>
            Just for fun (and in celebration of Advent of Code's 10th
            anniversary) I thought I'd share my AOC solutions here in a few
            programming languages, along with some brief notes on my solution,
            mostly focusing on anything out of the usual. Very few will be
            perfect solutions, but I ensure they're adequately performant - no
            naive solutions to complex problems, but also no particular eye cast
            towards the best possible solution times.{' '}
          </p>
          <br />
          <p>
            {' '}
            Perhaps sharing sub-optimal code sounds a little silly, but it's
            more appreciation of the hard work that goes into running Advent of
            Code than an exercise in showing off. If nothing else, it's a good
            excuse to go back through some old code, and give it a thorough
            refactor and performance pass. 10 year old code ought to be pretty
            embarassing to look at, and I bet it was not terribly idiomatic!
          </p>
          <br />
          <p>
            Additionally, at the bottom of each page is some space for you to
            paste your own inputs, and run my code to see if the solution
            handles your personal input well (fingers crossed!)
          </p>
          <br />
          <p>
            Currently there are only two years and two languages visible here;
            more to come as I have time to update and add the other 8 years of
            solutions.
          </p>
          <br />
          <p>
            Now, with my justifications out of the way, perhaps it's time for a
            small FAQ (not that anyone will actually be asking questions!)
          </p>
          <br />
          <br />
          <h2>What is it?</h2>
          <p>
            If you've never heard of{' '}
            <a href="https://adventofcode.com">Advent of Code</a> before, it's a
            wonderful, annual set of puzzles by{' '}
            <a href="https://was.tl/">Eric Wastl</a> (aka Topaz), one for each
            day of the advent calendar.
          </p>
          <p>
            They come in two parts, are purely text based, and generally only
            provide a single test with a known result. It's up to you to work
            out how to solve it, write other tests, and ideally complete it
            quickly enough to make it onto the leaderboard (and that gets harder
            every year - it crossed the million registered user mark back in
            2022)
          </p>
          <br />
          <p>
            Puzzles all have valid solutions that would take no longer than 15
            seconds on ten-year-old hardware, so we're shooting for well under a
            second per solution (with perhaps a few exceptions). My 2024
            solutions all run at well under a quarter of a second on my machine,
            most well under a 10th of a second.
          </p>
          <br />
          <br />
          <h2>
            Why don't you put the problem text with the solutions, or share your
            puzzle inputs?
          </h2>
          <p>
            AoC explicitly asks users{' '}
            <a href="https://adventofcode.com/2024/about">not to</a> :)
          </p>
          <br />
          <br />
          <h2>Do you use libraries/packages/etc ?</h2>
          <p>
            No, that would be defeating the point. On occassion I do get lazy
            (especially with C# answers) and fail to remove calls to extension
            methods or other code that live outside of the solution file. These
            are typically very basic utility methods, and should be{' '}
            <a href="c-sharp-extensions">visible here</a>.
          </p>
          <br />
          <br />
          <h2>How about AI tools?</h2>
          <p>
            Nope, for exactly the same reason. In fact, AoC requests you don't
            use AI tools until each day's leaderboard is already filled. "The
            leaderboards are for human competitors."
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
export const Head: HeadFC = () => (
  <>
    <title>Joel-Allan-NZ - Advent of Code</title>
    <html lang="en" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&family=VT323&display=swap"
      rel="stylesheet"
    />
  </>
)

export const result = graphql`
  query {
    allMdx {
      nodes {
        id
        frontmatter {
          year
          puzz
          title
        }
      }
    }
  }
`
