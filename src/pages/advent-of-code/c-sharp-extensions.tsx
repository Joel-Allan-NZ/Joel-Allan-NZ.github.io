import * as React from 'react'
import type { HeadFC } from 'gatsby'
import CodeBox from '../../components/CodeBox'
import Header from '../../components/Header'
import AdventSideNav from '../../components/AdventSideNav'
import Footer from '../../components/Footer'
import { Highlight, Prism, themes } from 'prism-react-renderer'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-csharp')

export default function CSharpExtensions() {
  const pairs = `
      public static IEnumerable<T[]> UniquePairs<T>(this IEnumerable<T> collection) =>
          collection.SkipLast(1)
                    .SelectMany(
                                (x, i) => collection.Skip(i + 1)
                                                    .Select<T, T[]>(y => [x, y]));


      public static IEnumerable<T[]> Pairs<T>(this IEnumerable<T> collection) =>
          collection.SkipLast(1)
                    .SelectMany(
                                (x, i) => collection.Skip(i)
                                                    .Select<T, T[]>(y => [x, y]));
                                                    `.trim()

  return (
    <>
      <Header />
      <AdventSideNav />
      <div className="adventofcode max-w-[70%] ml-[10%]">
        <p>
          Here are a few of the very simple extensions methods I tend to use in
          C# code. These two are purely to avoid writing multiple nested loops
          when there's a need to iterate on combinations of elements
        </p>
        <br />
        <Highlight code={pairs} language={'csharp'} theme={themes.nightOwl}>
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
      </div>
      <Footer />
    </>
  )
}

export const Head: HeadFC = () => <title>Joel-Allan-NZ - Advent Of Code</title>
