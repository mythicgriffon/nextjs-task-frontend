// pages/_app.js
import '../styles/globals.css'; // <-- Only place for global CSS

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
