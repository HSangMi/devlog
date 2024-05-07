import React, { useRef, useCallback, useEffect } from 'react'

export const Item = ({ title, selectedCategory, onClick, scrollToCenter, disable }) => {
  const tabRef = useRef(null)

  const handleClick = useCallback(() => {
    scrollToCenter(tabRef)
    onClick(title)
  }, [tabRef])

  useEffect(() => {
    if (selectedCategory === title) {
      scrollToCenter(tabRef)
    }
  }, [selectedCategory, tabRef])

  let showTitle = title.split("/").pop();
  return (
    <li
      ref={tabRef}
      className={disable != true ? "item" : "item_group"}
      role="tab"
      aria-selected={selectedCategory === title ? 'true' : 'false'}
    >
      <div onClick={disable != true ? handleClick : null}>{showTitle}</div>
    </li>
  )
}
