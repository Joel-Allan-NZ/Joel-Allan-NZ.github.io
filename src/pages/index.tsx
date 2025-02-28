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
      <main className="adventofcode max-w-[70%] ml-[10%] h-screen">
        <div className="width-[60%] ml-[20%] height-[90%]">
          <h1>🏗️This portfolio page is currently under construction 🏗️</h1>
          <p>
            In the meantime if you want to see some code, I advise you to either
            check <a href="https://github.com/Joel-Allan-NZ">my github</a>, or
            take a peek at some Advent of Code{' '}
            <a href="/advent-of-code">solution pages</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const Head: HeadFC = () => (
  <>
    <title>Joel-Allan-NZ - Home</title>
    <html lang="en" />
  </>
)

//looking for the most okay code you've ever seen?

//I'm your man.
