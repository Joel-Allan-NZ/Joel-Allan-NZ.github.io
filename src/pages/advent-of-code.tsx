import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql, Link } from 'gatsby'
import AdventSideNav from '../components/AdventSideNav'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function AdventOfCodeYearIndex() {
  return (
    <>
      <Header />
      <AdventSideNav>
        <div className="adventofcode max-w-[70%] ml-[10%]">
          <h1>Advent of Code</h1>
          <br />
          <p>
            Just for fun, and in celebration of Advent of Code's 10th
            anniversary, I thought I'd share my AOC solutions here in a couple
            languages, along with some brief notes on my solution, focusing on
            anything out of the usual. If nothing else, it's a good excuse to go
            back through some old code, and give it a thorough refactor and
            performance pass. 10 year old code ought to be pretty embarassing to
            look at, and I bet it was not terribly idiomatic!
          </p>
          <br />
          <p>
            Additionally, at the bottom of each page is some space for you to
            paste your own inputs, and run my code to see if the solution
            handles all cases (fingers crossed!)
          </p>
          <br />
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
            every year!)
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
        </div>
      </AdventSideNav>
      <Footer />
    </>
  )
}
export const Head: HeadFC = () => <title>Joel-Allan-NZ - Advent of Code</title>
