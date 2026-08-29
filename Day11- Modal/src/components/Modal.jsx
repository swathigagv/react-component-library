import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const dialogRef = useRef(null)
  const triggerElementRef = useRef(null)

  // Remember what had focus before the modal opened, so it can be
  // restored when the modal closes — important for keyboard users.
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement
    } else if (triggerElementRef.current) {
      triggerElementRef.current.focus?.()
    }
  }, [isOpen])

  // Move focus into the modal on open, and lock body scroll while it's open.
  useEffect(() => {
    if (!isOpen) return undefined

    document.body.classList.add('modal-open')
    const firstFocusable = dialogRef.current?.querySelector(FOCUSABLE_SELECTOR)
    firstFocusable?.focus()

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  // Escape closes; Tab/Shift+Tab is trapped inside the modal so focus
  // never silently escapes to the page behind it.
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return createPortal(
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        ref={dialogRef}
      >
        <div className="modal__head">
          {title && (
            <h2 id="modal-title" className="modal__title">
              {title}
            </h2>
          )}
          <button className="modal__close" onClick={onClose} aria-label="Close dialog">
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    modalRoot
  )
}

export default Modal