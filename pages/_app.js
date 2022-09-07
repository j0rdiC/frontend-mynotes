import Header from "../components/Header"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
