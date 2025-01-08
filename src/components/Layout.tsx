import React from 'react'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
deckDeckGoHighlightElement()

export default function Layout({ children }) {
  return (
    <div style={{ margin: `0 auto`, maxWidth: `70%`, padding: `0 1rem` }}>
      {children}
    </div>
  )
}
