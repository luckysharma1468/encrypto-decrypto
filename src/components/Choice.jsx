import React from 'react'

export default function Choice({labels, choiceHandler}) {
  return (
    <div className='d-flex justify-content-center gap-3 mt-2'>
        {
            labels.map((label, index) => (
                <div
                  key={index}
                  className='label d-flex py-2 justify-content-center'
                  onClick={() => choiceHandler(index)}
                >
                  {label}
                </div>
            ))
        }
    </div>
  )
}
