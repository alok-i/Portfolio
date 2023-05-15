import '../styles/globals.css'
import { gsap } from 'gsap'
import {TextPlugin} from 'gsap/TextPlugin'
import { EasePack} from 'gsap/EasePack';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(EasePack);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
