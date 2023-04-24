let l = document.querySelector("#logo")
let m = document.querySelector("#menu")







l.addEventListener('click', function(){

    if(m.style.visibility=='hidden'){
        m.style.visibility='visible'
        m.style.transform = "scale(0.8)"
       
    }
    else{
        m.style.visibility='hidden'
 
       
    }

})

