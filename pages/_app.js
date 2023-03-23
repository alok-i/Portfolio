import '../styles/globals.css'
import { gsap } from 'gsap'
import {TextPlugin} from 'gsap/TextPlugin'
import { EasePack} from 'gsap/EasePack';

gsap.registerPlugin(EasePack);
gsap.registerPlugin(TextPlugin);
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
