import React from 'react'

export default function CodeBox({ boxName, names, children }) {
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <div className="bg-codebox pl-5 pb-5 rounded-lg drop-shadow-2xl mt-5 mb-5">
      {names ? (
        <>
          <div>
            {names.split('|').map((name: string, index: number) => (
              <button
                key={`codetoggle${boxName ?? 0}${name}${index}`}
                className={`rounded-b-lg p-2 ml-2 min-w-20 ${
                  activeTab == index ? 'bg-white' : 'bg-codetoggle text-white'
                } transition duration-1000 ease-in-out delay-100 hover:scale-105 hover:bg-white hover:text-black`}
                onClick={() => {
                  setActiveTab(index)
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="m-3 min-h-fit max-h-[60vh] overflow-scroll">
        {children ? children[activeTab] : <></>}
      </div>
    </div>
  )
}
