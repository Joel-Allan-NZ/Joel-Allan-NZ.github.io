import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import CodeBox from './CodeBox'

const shortcodes = { CodeBox }

export default function Layout({ children }) {
  return (
    <div style={{ margin: `0 auto`, maxWidth: `70%`, padding: `0 1rem` }}>
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </div>
  )
}
