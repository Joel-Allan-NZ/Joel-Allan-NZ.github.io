import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import CodeBox from './CodeBox'
import TryYourself from './TryYourself'
import AdventSideNav from './AdventSideNav'
import Header from './Header'
import type { HeadFC } from 'gatsby'
import Footer from './Footer'

const shortcodes = { CodeBox }

export default function Layout({
  pageContext,
  children,
}: {
  pageContext: any
  children: any
}) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-chicPrimary">
        <AdventSideNav />
        <div className="adventofcode max-w-[60%] ml-[20%]">
          <h1>
            <a
              href={`https://adventofcode.com/${pageContext.year}/day/${pageContext.puzz}`}
            >
              {`${pageContext.year} Day ${pageContext.puzz} - ${pageContext.title}`}
            </a>
          </h1>
          <MDXProvider components={shortcodes}>{children}</MDXProvider>
          {pageContext.puzz && pageContext.year ? (
            <TryYourself
              year={pageContext.year}
              puzz={pageContext.puzz}
            ></TryYourself>
          ) : (
            <></>
          )}
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
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&family=VT323&display=swap"
      rel="stylesheet"
    />
  </>
)
