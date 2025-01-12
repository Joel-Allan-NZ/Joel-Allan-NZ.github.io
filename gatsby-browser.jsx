import './src/styles/global.css'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import styled from 'styled-components'
import { Highlight, Prism, themes } from 'prism-react-renderer'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-csharp')

const components = {
  pre: (props) => {
    const className = props.children.props.className || ''
    const code = props.children.props.children.trim()
    const language = className.replace(/language-/, '')

    const Line = styled.div`
      display: table-row;
    `

    const LineNo = styled.span`
      display: table-cell;
      text-align: right;
      padding-right: 1em;
      user-select: none;
      opacity: 0.5;
    `

    const LineContent = styled.span`
      display: table-cell;
    `

    return (
      <Highlight code={code} language={language} theme={themes.nightOwl}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                <Line key={i} {...getLineProps(line, i)}>
                  <LineNo>{i + 1}</LineNo>
                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
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
