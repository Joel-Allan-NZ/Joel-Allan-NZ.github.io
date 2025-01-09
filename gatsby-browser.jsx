import './src/styles/global.css'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { defaultProps, Highlight, Prism, themes } from 'prism-react-renderer'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-csharp')

const components = {
  pre: (props) => {
    console.log(props)
    const className = props.children.props.className || ''
    const code = props.children.props.children.trim()
    const language = className.replace(/language-/, '')
    return (
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={themes.nightOwl}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    )
  },
  wrapper: ({ children }) => <>{children}</>,
}

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>
}
