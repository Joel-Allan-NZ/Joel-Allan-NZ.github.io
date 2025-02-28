import React from 'react'
import santa from '../images/big-santa-2.webp'

export default function Header() {
  return (
    <header className="bg-chicPrimary border-solid border-chicThree border-b mb-2">
      <a href="/advent-of-code" aria-label="home">
        <img
          src={santa}
          className="mx-auto w-fit max-h-[150px] object-none"
          alt="8 bit picture of santa using a computer in the snow"
        ></img>
      </a>
    </header>
  )
}
