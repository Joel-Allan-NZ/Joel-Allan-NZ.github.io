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
      <div className="max-h-0.95">
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

export const Head: HeadFC = () => <title>Joel-Allan-NZ - Advent of Code</title>
