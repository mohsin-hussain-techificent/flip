
import { SlotProvider } from "../context/SlotContext";
import "../styles/globals.css"; // Keep your global styles

function MyApp({ Component, pageProps }) {
  return (
    <SlotProvider>
      <Component {...pageProps} />
    </SlotProvider>
  );
}

export default MyApp;
