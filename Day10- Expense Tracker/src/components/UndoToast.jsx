function UndoToast({ text, onUndo }) {
  return (
    <div className="toast" role="status">
      <span>Deleted "{text}"</span>
      <button className="toast__undo" onClick={onUndo}>
        Undo
      </button>
    </div>
  )
}

export default UndoToast