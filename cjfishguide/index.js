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
const table = document.getElementById('fish-table')

fetchFish();
function fetchFish(){
fetch('https://acnhapi.com/v1a/fish',{
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => addFish(data))
}

function addFish(fish){
    const table2 = document.getElementById('table-body')
    for(let i=0; i<fish.length;i++){
        let fishy = document.createElement('tr')
        table2.appendChild(fishy)

        let icon = document.createElement('td')
        let iconimage = document.createElement('img')
        iconimage.setAttribute('src',fish[i]['icon_uri'])
        iconimage.style.width = "5vh";
        icon.appendChild(iconimage)
        fishy.appendChild(icon)

        let name = document.createElement('td')
        name.innerHTML = fish[i].name['name-USen']
        fishy.appendChild(name)

        let location = document.createElement('td')
        location.innerHTML = fish[i].availability.location
        fishy.appendChild(location)

        let shadowsize = document.createElement('td')
        shadowsize.innerHTML = fish[i].shadow
        fishy.appendChild(shadowsize)

        let value = document.createElement('td')
        value.innerHTML = fish[i].price
        fishy.appendChild(value)

        let time = document.createElement('td')
        if (fish[i].availability.isAllDay){
            time.innerHTML = "All Day"
            fishy.appendChild(time)
        }
        else {
            const timearray = fish[i].availability['time-array']
            time.innerHTML = `${timearray[0]}- ${timearray[timearray.length-1]}`
            fishy.appendChild(time)
        }
    }
}
addMonth();
function addMonth(){
    const monthlist =[ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
    for(let i =0;i<12;i++)
    {   
        let option = document.createElement('option')
        option.innerHTML = monthlist[i]
        document.getElementById('months').appendChild(option)
    }
}

