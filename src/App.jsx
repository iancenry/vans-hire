import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const Homepage = () => (
  <>
    <h1>Homepage</h1>
    <Link to='/about'>About</Link>
  </>
)

const Aboutpage = () => (
  <>
    <h1>About Page</h1>
    <Link to='/'>Home</Link>
  </>
)

function App() {
  return (
      <Router> 
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/about' element={<Aboutpage />} />
        </Routes>
      </Router>
    
  )
}

export default App
