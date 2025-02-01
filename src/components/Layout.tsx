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
    <div className="max-h-1vh">
      <Header />
      <AdventSideNav>
        <div className="adventofcode max-w-[70%] ml-[10%] ">
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
          <Footer />
        </div>
      </AdventSideNav>
    </div>
  )
}

export const Head: HeadFC = () => <title>Joel-Allan-NZ - Advent of Code</title>
