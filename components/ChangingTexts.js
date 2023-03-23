import React, { useEffect } from 'react'
import gsap from 'gsap'



function ChangingTexts() {

    const words = ["not just a Developer." , "a Creator." , "a Designer" , "a technology Enthusiast."]
   
    useEffect(()=>{
        let cursor = gsap.to('.cursor' , {opacity: 0 , ease:"power8.inOut" , repeat:-1})
    
        let botTL = gsap.timeline();
    
        botTL.to('.box' ,{duration:1 , width:"25vw" , delay:1.2 , ease: "power4.inOut" } )
             .from('.hello' , {duration: 1 , y:"12vw" , ease:"power3.out"} )

          
    let masterTl = gsap.timeline({repeat:10000})
    words.forEach(words=>{
        let tl = gsap.timeline({repeat: 1 , yoyo : true, repeatDelay:1})
        tl.to('.text' ,{ duration:1 , text:words})
        masterTl.add(tl);
    })


    },[])
  
  return (
    <h1 className='textH'>
         <span className='box'></span>
         <span className='hello'>Hi , I'm </span>
         <span className='text'></span>
         <span className='cursor'>_</span>
    </h1>
  )
}

export default ChangingTexts