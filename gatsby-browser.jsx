import './src/styles/global.css'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'

const components = {
  pre: (props) => <div {...props} />,
  code: (props) => <pre style={{ color: 'pink' }} {...props} />,
}

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>
}
