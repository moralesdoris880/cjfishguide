document.getElementById('navbar').addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.id === 'fish-page'){
        document.getElementById('home').style.display = "none";
        document.getElementById('fish').style.display = "initial";
        //document.getElementById('home').innerHTML.style.color = "#ff0000";
    }
    else if(e.target.id === 'home-page'){
        document.getElementById('home').style.display = "initial";
        document.getElementById('fish').style.display = "none";
    }
})