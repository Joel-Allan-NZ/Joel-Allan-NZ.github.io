import React from 'react'

export default function CodeBox({ boxName, names, children }) {
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <div>
      {names ? (
        <>
          <h2>Hello this is a codebox</h2>
          <div>
            {names.split('|').map((name, index) => (
              <button
                key={`codetoggle${boxName ?? 0}${name}${index}`}
                className="mx-2"
                onClick={() => setActiveTab(index)}
              >
                {name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
      {children ? children[activeTab] : <></>}
    </div>
  )
}
