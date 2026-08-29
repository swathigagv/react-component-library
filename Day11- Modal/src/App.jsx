import { useState } from 'react'
import './App.css'
import Modal from './components/Modal.jsx'

function App() {
  const [openModal, setOpenModal] = useState(null) // 'info' | 'confirm' | 'form' | null
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const close = () => setOpenModal(null)

  const handleConfirmDelete = () => {
    setStatus('Item deleted.')
    close()
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus(`Subscribed with ${email}.`)
    setEmail('')
    close()
  }

  return (
    <main className="app">
      <header className="app__header">
        <span className="app__eyebrow">React + Vite</span>
        <h1 className="app__title">Modal</h1>
        <p className="app__subtitle">One reusable dialog, three different jobs.</p>
      </header>

      <div className="triggers">
        <button className="btn" onClick={() => setOpenModal('info')}>
          Show info
        </button>
        <button className="btn btn--danger" onClick={() => setOpenModal('confirm')}>
          Delete item
        </button>
        <button className="btn btn--primary" onClick={() => setOpenModal('form')}>
          Subscribe
        </button>
      </div>

      {status && <p className="status">{status}</p>}

      <Modal isOpen={openModal === 'info'} onClose={close} title="About this dialog" size="md">
        <p>
          This modal is rendered through a React portal into a separate root outside the main
          app tree, so it can sit visually above everything without fighting page layout or
          z-index.
        </p>
        <p style={{ marginTop: 10 }}>
          Try pressing <strong>Tab</strong> — focus stays looped inside the dialog. Press{' '}
          <strong>Escape</strong> or click outside to close it.
        </p>
      </Modal>

      <Modal isOpen={openModal === 'confirm'} onClose={close} title="Delete this item?" size="sm">
        <p>This action can't be undone. Are you sure you want to continue?</p>
        <div className="modal-actions">
          <button className="btn" onClick={close}>
            Cancel
          </button>
          <button className="btn btn--danger" onClick={handleConfirmDelete}>
            Delete
          </button>
        </div>
      </Modal>

      <Modal isOpen={openModal === 'form'} onClose={close} title="Subscribe to updates" size="md">
        <form className="subscribe-form" onSubmit={handleSubscribe}>
          <label htmlFor="modal-email">Email address</label>
          <input
            id="modal-email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="modal-actions">
            <button type="button" className="btn" onClick={close}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Subscribe
            </button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App