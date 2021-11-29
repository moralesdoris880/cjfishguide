document.getElementById('navbar').addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.id === 'fish-page'){
        document.getElementById('fish').style.display = "initial";
        document.getElementById('home').style.display = "none";
        document.getElementById('about').style.display = "none";
        document.getElementById('events').style.display = "none";
    }
    else if(e.target.id === 'home-page'){
        document.getElementById('home').style.display = "initial";
        document.getElementById('fish').style.display = "none";
        document.getElementById('about').style.display = "none";
        document.getElementById('events').style.display = "none";
    }
    else if(e.target.id === 'events-page'){
        document.getElementById('events').style.display = "initial";
        document.getElementById('home').style.display = "none";
        document.getElementById('fish').style.display = "none";
        document.getElementById('about').style.display = "none";
    }
    else if(e.target.id === 'about-page'){
        document.getElementById('about').style.display = "initial";
        document.getElementById('home').style.display = "none";
        document.getElementById('fish').style.display = "none";
        document.getElementById('events').style.display = "none";
    }
})
const table = document.getElementById('fish-table')
let fishData;
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
const table2 = document.getElementById('table-body')
function addFish(fish){
    fishData = fish;
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
        name.setAttribute('id',fish[i])
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

        let north = document.createElement('p')
        north.innerHTML = fish[i].availability['month-array-northern']
        north.setAttribute('class','North')
        north.style.display = 'none'
        fishy.appendChild(north)

        let south = document.createElement('p')
        south.innerHTML = fish[i].availability['month-array-southern']
        south.setAttribute('class','South')
        south.style.display = 'none'
        fishy.appendChild(south)

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

const form = document.getElementById('month-selection')
const months = document.querySelector('#months')
const hemispheres = document.querySelector('#hemispheres')

let selectedMonth ='1'
let selectedHemisphere = 'month-array-northern'

months.addEventListener('change',(e)=> {
    selectedMonth = e.target.value
})
hemispheres.addEventListener('change',(e)=> {
    selectedHemisphere = e.target.value
})

form.addEventListener('submit',(e)=>{

    e.preventDefault();

    let filteredFishies = fishData.filter(fish => {
      let fishHemisphere = fish.availability[selectedHemisphere]

      let hasFishOnThatDay = fishHemisphere.some(availableDay=>{

       let hasMatchingDay = availableDay == selectedMonth   
        return hasMatchingDay
      })
       return hasFishOnThatDay
    })

    table2.innerHTML = null;
    addFish(filteredFishies);

    console.log(filteredFishies, selectedMonth, selectedHemisphere)   

})

//CHECK ROW
//CHECK P TAG OF NORTH TO SEE IF IT MATCHES WITH MONTH
//IF IT DOES KEEP
//ELSE DISPLAY NONE

