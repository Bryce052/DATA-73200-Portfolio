let add = document.getElementById('increase'); 
let remove  = document.getElementById('decrease'); 

let int = document.getElementById('number'); 
let integer = 0;

add.addEventListener('click',function(){
    integer += 1;
    int.innerHTML = integer;
})

remove.addEventListener('click',function(){
    integer -= 1; 
    int.innerHTML = integer;
}) 
