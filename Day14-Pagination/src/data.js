// A small generated dataset so the pagination logic has something
// realistic to page through — a team directory.
const FIRST_NAMES = [
  'Aditi', 'Rohan', 'Meera', 'Karthik', 'Priya', 'Arjun', 'Divya', 'Sanjay',
  'Lakshmi', 'Vikram', 'Nisha', 'Rahul', 'Anjali', 'Suresh', 'Kavya', 'Manoj',
  'Pooja', 'Aravind', 'Deepa', 'Ganesh',
]
const LAST_NAMES = [
  'Iyer', 'Nair', 'Reddy', 'Menon', 'Rao', 'Pillai', 'Krishnan', 'Varma',
  'Subramanian', 'Shetty',
]
const ROLES = [
  'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'QA Engineer',
  'Product Manager', 'DevOps Engineer', 'Data Analyst', 'Full Stack Developer',
]
const TEAMS = ['Platform', 'Growth', 'Core', 'Mobile', 'Infra', 'Design Systems']

function generateDirectory(count) {
  const rows = []
  for (let i = 0; i < count; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length]
    const last = LAST_NAMES[(i * 3) % LAST_NAMES.length]
    rows.push({
      id: i + 1,
      name: `${first} ${last}`,
      role: ROLES[i % ROLES.length],
      team: TEAMS[i % TEAMS.length],
      email: `${first}.${last}`.toLowerCase() + '@teammail.com',
    })
  }
  return rows
}

export const directory = generateDirectory(63)