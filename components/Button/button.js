import React, { useEffect, useState } from 'react'
import { navlink } from './navData';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { Router } from 'next/router';
import { useScrollToHash } from '../hooks/useScrollToHash';

// import { useScrollToHash } from '../hooks/useScrollToHash';


function Button() {
  const [active , setActive] = useState(false);
  const [current , setCurrent] = useState();
  const { route , asPath } = useRouter();
  const [target , setTarget] = useState();
  const scrollToHash = useScrollToHash();

    useEffect(()=>{
        setCurrent(asPath)
    },[asPath])

    useEffect(()=>{
        if(!target || route !== '/') return;
        setCurrent(`${route}${target}`);
        scrollToHash(target, ()=> setTarget(null));

    },[route , scrollToHash , target])

  const handleNavItemClick = event=>{
    const hash = event.currentTarget.href.split('#')[1];
    setTarget(`#${hash}`)

    handleNavClick();

  }

  const handleNavClick = ()=>{

  }
  

  return (
    <>
    <div className={`toggle ${active ? "active" : ""}`} onClick={()=>setActive(!active)}>
        <span></span>
        <span></span>
        <span></span>
    </div> 
     
    <nav className={` nav ${active ?  "handle" : ""}`} >
        <div className={`navList`}>
            {navlink.map(({label , pathname})=>(
                <Link href={pathname} scroll={true} key={label} legacyBehavior>
                    <a
                        className={`navLink`}
                        onClick={handleNavItemClick}
                    >
                        {label}
                    </a>

                </Link>
            ))}
        </div>
    </nav>

    </>
    


  )
}

export default Button