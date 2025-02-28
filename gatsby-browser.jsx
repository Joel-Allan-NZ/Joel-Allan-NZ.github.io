import './src/styles/global.css'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Highlight, Prism, themes } from 'prism-react-renderer'

;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-csharp')

const components = {
  pre: (props) => {
    const className = props.children.props.className || ''
    const code = props.children.props.children.trim()
    const language = className.replace(/language-/, '')

    return (
      <Highlight code={code} language={language} theme={themes.nightOwl}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                <div className="ml-4 table-row" key={`code line ${i}`}>
                  <div className="table-cell text-right opacity-50 pr-4 select-none">
                    {`${i + 1}`.padStart(3, ' ')}
                  </div>
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
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
