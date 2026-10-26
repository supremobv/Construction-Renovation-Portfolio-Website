import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'FORMA — Spaces built around you',description:'Thoughtful construction, considered renovations, and interiors made for living. Explore our portfolio and start your project.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
