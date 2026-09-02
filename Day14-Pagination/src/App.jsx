import { useState, useMemo, useEffect } from 'react'
import Pagination from './Pagination.jsx'
import { directory } from './data.js'

const PAGE_SIZE_OPTIONS = [5, 10, 15]

function App() {
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(directory.length / pageSize))

  // Slice out just the rows for the current page. Recomputed only when
  // the page or page size actually changes, not on every render.
  const visibleRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return directory.slice(start, start + pageSize)
  }, [currentPage, pageSize])

  // If the page size changes and the current page no longer exists
  // (e.g. we were on page 7 of 10-per-page and switch to 15-per-page),
  // clamp back to the last valid page instead of showing an empty table.
  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages))
  }, [totalPages])

  const rangeStart = (currentPage - 1) * pageSize + 1
  const rangeEnd = Math.min(currentPage * pageSize, directory.length)

  return (
    <div className="app">
      <div className="backdrop" aria-hidden="true" />

      <main className="card">
        <header className="header">
          <div className="brand">
            <span className="brand-mark">▤</span>
            <span className="brand-name">Team Directory</span>
          </div>

          <label className="page-size">
            <span>Rows</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setCurrentPage(1)
              }}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </header>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Team</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((person) => (
                <tr key={person.id}>
                  <td>{person.name}</td>
                  <td>{person.role}</td>
                  <td>
                    <span className="team-pill">{person.team}</span>
                  </td>
                  <td className="email-cell">{person.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="footer-row">
          <p className="range-label">
            Showing {rangeStart}–{rangeEnd} of {directory.length}
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <footer className="footer">
          <p>Day 14 of the React learning series</p>
        </footer>
      </main>
    </div>
  )
}

export default App