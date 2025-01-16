import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import CodeBox from './CodeBox'
import TryYourself from './TryYourself'
import AdventSideNav from './AdventSideNav'

const shortcodes = { CodeBox }

export default function Layout({
  pageContext,
  children,
}: {
  pageContext: any
  children: any
}) {
  return (
    <AdventSideNav>
      <div className="max-w-[70%] ml-[10%]">
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
    </AdventSideNav>
  )
}
