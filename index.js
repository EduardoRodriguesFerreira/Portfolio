let l = document.querySelector("#logo")
let m = document.querySelector("#menu")
let t = document.querySelector("#titulo")
let c = document.querySelector("#con")
let c2 = document.querySelector(".c2")
let b = document.querySelector("#btn")
let b2 = document.querySelector("#btn2")
let i = document.querySelector(".items")
let vc =document.querySelector("#corpo")



l.addEventListener('click', function(){

    if(m.style.visibility=='hidden'){
        m.style.visibility='visible'
        m.style.transform = "scale(0.8)"
        m.style.transition="0.8s"
    }
    else{
        m.style.visibility='hidden'
        m.style.transition="1s"
       
    }

})

b.addEventListener('click', function(){
    if(i.style.visibility=='hidden' &&   c.style.visibility=='visible'){
        c.style.visibility=='hidden'
        c.syle.transition='0.8s'
        c.style.animationName='ani'
        vc.style.backgroundImage = "url('img/tc.jpg')";
     
    }
    else {
      
       c.style.visibility='visible'
       i.style.visibility='hidden'
       c.style.animationName='ani'
       vc.style.backgroundImage = "url('img/tc.jpg')";
      
       
    }




  
})

b2.addEventListener('click', function(){
    c.style.animationName=='ani'
    if(c.style.visibility=='hidden' && i.style.visibility=='visible'){
        c.style.visibility='hidden'
        i.style.visibility='visible'
        vc.style.backgroundImage = "url('img/v627-aew-41-technologybackground.jpg')"
       
    }
    else {
      
       c.style.visibility='hidden'
       i.style.visibility='visible'
       c.style.animationName='ani'
       vc.style.backgroundImage = "url('img/v627-aew-41-technologybackground.jpg')"
       
    }
   



   
})
