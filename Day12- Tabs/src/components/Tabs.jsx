import { useLayoutEffect, useRef, useState } from 'react'
import './Tabs.css'

function Tabs({ items, defaultTabId, onChange }) {
  const [activeId, setActiveId] = useState(defaultTabId ?? items[0]?.id)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })
  const tabRefs = useRef(new Map())
  const listRef = useRef(null)

  const activeIndex = items.findIndex((item) => item.id === activeId)

  const selectTab = (id) => {
    setActiveId(id)
    onChange?.(id)
  }

  // Measure the active tab's position/width and slide the indicator to
  // match it — recomputed whenever the active tab changes.
  useLayoutEffect(() => {
    const activeButton = tabRefs.current.get(activeId)
    const list = listRef.current
    if (!activeButton || !list) return

    const listRect = list.getBoundingClientRect()
    const buttonRect = activeButton.getBoundingClientRect()
    setIndicator({
      left: buttonRect.left - listRect.left,
      width: buttonRect.width,
    })
  }, [activeId, items])

  // Roving tabindex + arrow-key navigation, per the WAI-ARIA tabs pattern:
  // only the active tab is in the normal tab order; arrows move both
  // focus and selection between tabs.
  const handleKeyDown = (e) => {
    const lastIndex = items.length - 1
    let nextIndex = null

    if (e.key === 'ArrowRight') nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1
    else if (e.key === 'ArrowLeft') nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1
    else if (e.key === 'Home') nextIndex = 0
    else if (e.key === 'End') nextIndex = lastIndex
    else return

    e.preventDefault()
    const nextItem = items[nextIndex]
    selectTab(nextItem.id)
    tabRefs.current.get(nextItem.id)?.focus()
  }

  const activeItem = items[activeIndex]

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label="Tabs" ref={listRef} onKeyDown={handleKeyDown}>
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              ref={(node) => {
                if (node) tabRefs.current.set(item.id, node)
                else tabRefs.current.delete(item.id)
              }}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`tabs__tab ${isActive ? 'tabs__tab--active' : ''}`}
              onClick={() => selectTab(item.id)}
            >
              {item.icon && <span className="tabs__icon">{item.icon}</span>}
              {item.label}
            </button>
          )
        })}
        <span className="tabs__indicator" style={{ left: indicator.left, width: indicator.width }} />
      </div>

      <div
        role="tabpanel"
        id={`panel-${activeItem.id}`}
        aria-labelledby={`tab-${activeItem.id}`}
        className="tabs__panel"
        tabIndex={0}
      >
        {activeItem.content}
      </div>
    </div>
  )
}

export default Tabs