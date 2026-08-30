import './App.css'
import Tabs from './components/Tabs.jsx'

const accountTabs = [
  {
    id: 'profile',
    label: 'Profile',
    icon: '👤',
    content: (
      <div className="panel-content">
        <p>Update your name, avatar, and public bio.</p>
        <ul>
          <li>Display name and username</li>
          <li>Profile photo</li>
          <li>Short bio</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: '🔔',
    content: (
      <div className="panel-content">
        <p>Choose what you get notified about, and how.</p>
        <ul>
          <li>Email digests</li>
          <li>Push notifications</li>
          <li>Weekly summary</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'security',
    label: 'Security',
    icon: '🔒',
    content: (
      <div className="panel-content">
        <p>Manage how you sign in and keep your account safe.</p>
        <ul>
          <li>Password and two-factor authentication</li>
          <li>Active sessions</li>
          <li>Connected apps</li>
        </ul>
      </div>
    ),
  },
]

const productTabs = [
  {
    id: 'description',
    label: 'Description',
    content: (
      <div className="panel-content">
        <p>
          The Nimbus Mechanical Keyboard combines a tactile, hot-swappable switch layout with a
          machined aluminum frame — built for people who type all day.
        </p>
      </div>
    ),
  },
  {
    id: 'specs',
    label: 'Specifications',
    content: (
      <div className="panel-content">
        <ul>
          <li>Layout: 75% compact</li>
          <li>Switches: Hot-swappable, tactile</li>
          <li>Connection: USB-C, Bluetooth 5.0</li>
          <li>Battery: ~40 hours with backlight on</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'reviews',
    label: 'Reviews',
    content: (
      <div className="panel-content">
        <p>★★★★★ "Best board I've typed on." — a very satisfied customer</p>
        <p>★★★★☆ "Great feel, wish it came in more colors."</p>
      </div>
    ),
  },
]

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <span className="app__eyebrow">React + Vite</span>
        <h1 className="app__title">Tabs</h1>
        <p className="app__subtitle">One reusable Tabs component, two different jobs.</p>
      </header>

      <section className="section">
        <h2 className="section__title">Account settings</h2>
        <Tabs items={accountTabs} defaultTabId="profile" />
      </section>

      <section className="section">
        <h2 className="section__title">Product info</h2>
        <Tabs items={productTabs} defaultTabId="description" />
      </section>

      <p className="hint">Keyboard: ← → to move between tabs · Home / End to jump to the ends</p>
    </main>
  )
}

export default App