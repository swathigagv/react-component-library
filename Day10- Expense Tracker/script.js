// ---- State ----
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

const form = document.getElementById('transaction-form');
const list = document.getElementById('transaction-list');
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');

// ---- Add a transaction ----
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = document.getElementById('text').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);

  if (!text || isNaN(amount) || amount === 0) {
    alert('Please enter a valid description and amount.');
    return;
  }

  const transaction = {
    id: Date.now(),
    text,
    amount
  };

  transactions.push(transaction);
  updateLocalStorage();
  render();
  form.reset();
  document.getElementById('text').focus();
});

// ---- Delete a transaction (event delegation) ----
list.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) {
    const id = Number(e.target.dataset.id);
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    render();
  }
});

// ---- Render list + totals from state ----
function render() {
  list.innerHTML = '';

  transactions.forEach(t => {
    const li = document.createElement('li');
    li.classList.add(t.amount < 0 ? 'expense' : 'income');
    li.innerHTML = `
      <span>${escapeHTML(t.text)}</span>
      <span>${t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}</span>
      <button class="delete-btn" data-id="${t.id}" aria-label="Delete ${escapeHTML(t.text)}">✕</button>
    `;
    list.appendChild(li);
  });

  const amounts = transactions.map(t => t.amount);
  const balance = amounts.reduce((sum, val) => sum + val, 0);
  const income = amounts.filter(v => v > 0).reduce((sum, val) => sum + val, 0);
  const expense = amounts.filter(v => v < 0).reduce((sum, val) => sum + val, 0);

  balanceEl.textContent = balance.toFixed(2);
  incomeEl.textContent = income.toFixed(2);
  expenseEl.textContent = Math.abs(expense).toFixed(2);
}

// ---- Persist state ----
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// ---- Small helper to avoid injecting raw HTML from user input ----
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---- Init ----
render();