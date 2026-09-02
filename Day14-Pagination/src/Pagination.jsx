// Builds the compact list of page buttons to render, e.g.
// [1, '…', 4, 5, 6, '…', 12] — always keeping the first page, the last
// page, and a window around the current page visible.
function buildPageRange(current, total, siblingCount = 1) {
  const totalNumbers = siblingCount * 2 + 5 // first, last, current, 2 ellipses
  if (total <= totalNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(current - siblingCount, 1)
  const rightSibling = Math.min(current + siblingCount, total)

  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < total - 1

  const range = [1]

  if (showLeftEllipsis) range.push('left-ellipsis')
  for (let page = leftSibling; page <= rightSibling; page++) {
    if (page !== 1 && page !== total) range.push(page)
  }
  if (showRightEllipsis) range.push('right-ellipsis')

  range.push(total)
  return range
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = buildPageRange(currentPage, totalPages)

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="page-btn nav-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((page, i) =>
        typeof page === 'number' ? (
          <button
            key={page}
            className={`page-btn${page === currentPage ? ' active' : ''}`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span className="ellipsis" key={`${page}-${i}`}>
            …
          </span>
        )
      )}

      <button
        className="page-btn nav-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  )
}

export default Pagination