import NavBar from './components/NavBar'
import Footer from './components/Footer/Footer'

export default function App({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer/>
    </>
  )
}
