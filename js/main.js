var api_link = "https://restcountries.com/v3.1/all"

const cards = document.querySelector(".cards")
const modal = document.querySelector(".modal")
const darkBox = document.querySelector(".dark_lightMode")
const btn = document.querySelector("#btnDarorLight")
const darkFunText = document.querySelector(".darkFunText")
const select = document.querySelector(".select")
const search_country = document.querySelector(".search_country")


var root=document.querySelector(':root')
var rootStyles=getComputedStyle(root)

var getFunction=localStorage.getItem("dark")?localStorage.getItem("dark"):2
if (getFunction==2) {
    light()
}else{
    dark()
}

const getData = async (link) => {
    modal.style="display: flex;"
    const req = await fetch(link)
    const data = await req.json()
    writeData(data)
    modal.style="display: none;"
    
}

function writeData(item) {
    item.forEach((id) => {
        cards.innerHTML+=`
        <a class="card" href='state/index.html?name=${id.name.common}'>
            <img src="${id.flags.png}" alt="" class="flag">
            <h1 class="name">${id.name.common}</h1>
            <h1 class="population">Aholisi: <span> ${id.population}</span></h1>
            <h1 class="region">Qit'a: <span class="regions"> ${id.region}</span></h1>
            <h1 class="capital">Poytaxt: <span>   ${ id.capital}</span></h1>
        </a>
        
        `
    });
}
 function dark(params) {
    //dark colors
    root.style.setProperty('--body','#202C36')
    root.style.setProperty('--h1TExts','#fff')
    root.style.setProperty('--back','#2B3844')
    btn.setAttribute("class","fa-regular fa-sun")
    darkFunText.textContent="Light Mode"
    root.style.setProperty('--shadow','0px 0px 7px 2px #00000008')
}
 function light(params) {
    //light colors
    root.style.setProperty('--body','#fff')
    root.style.setProperty('--h1TExts','#2B3844')
    root.style.setProperty('--back','#fff')
    btn.setAttribute("class","fa-regular fa-moon")
    darkFunText.textContent="Dark Mode"
    root.style.setProperty('--shadow','0px 2px 4px 0px #0000000E')
}
var a=true;
darkBox.addEventListener("click",()=>{
    if (a) {
        dark()
        a=false
        localStorage.setItem("dark",1)
    }else{
        light()
        a=true
        localStorage.setItem("dark",2)
    }
})
getData(api_link)

select.addEventListener("change",()=>{
    const card=document.querySelectorAll(".card")
    

    card.forEach((item)=>{

        var selectRegion=select.value
        console.log(selectRegion);
        var region=item.querySelector(".regions").textContent.trim().toLowerCase()
   

        
        if (selectRegion=="all") {
            item.classList.remove("hidden")
        }else if(!region.includes(selectRegion)){
            item.classList.add("hidden")
        }else{
            item.classList.remove("hidden")
        }
    })

})

search_country.addEventListener("input",()=>{
    const card=document.querySelectorAll(".card")
    card.forEach((item)=>{
        var search=search_country.value.trim().toLowerCase().replaceAll(" ","")
        var CountryName=item.querySelector(".name").textContent.trim().toLowerCase()
        if (!CountryName.includes(search)) {
            item.classList.add("hidden")
        }else{
            item.classList.remove("hidden")

        }
    })
})