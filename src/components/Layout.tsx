import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import CodeBox from './CodeBox'
import TryYourself from './TryYourself'
import AdventSideNav from './AdventSideNav'

const shortcodes = { CodeBox, TryYourself }

export default function Layout({ children }: { children: any }) {
  return (
    <AdventSideNav>
      <div className="max-w-[70%] ml-[10%]">
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </div>
    </AdventSideNav>
  )
}
