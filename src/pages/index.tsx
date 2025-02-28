import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import Footer from '../components/Footer'
import doggos from '../images/doggos.png'

export default function IndexPage(props: PageProps) {
  return (
    <>
      <header>
        <img
          src={doggos}
          className="mx-auto w-fit max-h-[300px] object-none"
        ></img>
      </header>
      <main className="adventofcode max-w-[70%] ml-[10%] min-h-1vh">
        <div className="width-[60%] ml-[20%] height-[90%]">
          <h1>Placeholder Page</h1>
          <a href="/advent-of-code">Advent of Code 2024</a>
          <p>
            I'm Joel, an aspiring Software Developer currently based in
            Tauranga. I have a passion for technology and problem-solving, and
            combining those interests into a career has been a life-long
            ambition. Although I haven\’t been able to approach it as a career
            until now, I\’ve been writing code for 15+ years and am particularly
            comfortable with the .NET ecosystem. I've recently recovered from a
            long battle with Chronic Fatigue, and am highly motivated to enter
            the software industry, plus make up for some time lost.
          </p>
          <br />
          <p>
            Here is a not-entirely-curated selection of projects from over the
            last ~5 years. Hopefully they will give an honest glimpse into the
            type of developer I am (though bear in mind almost all of these were
            purely personal projects and therefore are light on documentation!).
            The two pinned projects are more recent, and have a decent
            explanation of each project in the respective READMEs. Feel free to
            reach out with an questions, comments, or advice.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const Head: HeadFC = () => <title>Joel-Allan-NZ - Home</title>

//looking for the most okay code you've ever seen?

//I'm your man.
