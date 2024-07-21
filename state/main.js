const country = new URLSearchParams(window.location.search).get("name")
var api_link = `https://restcountries.com/v3.1/name/${country}`


const modal = document.querySelector(".modal")
const darkBox = document.querySelector(".dark_lightMode")
const darkFunText = document.querySelector(".darkFunText")
const btn = document.querySelector("#btnDarorLight")
const countryBlog = document.querySelector(".countryBlog")



var root = document.querySelector(':root')
var rootStyles = getComputedStyle(root)



var getFunction = localStorage.getItem("dark") ? localStorage.getItem("dark") : 2
if (getFunction == 2) {
    light()
} else {
    dark()
}
function dark(params) {
    //dark colors
    root.style.setProperty('--body', '#202C36')
    root.style.setProperty('--h1TExts', '#fff')
    root.style.setProperty('--back', '#2B3844')
    btn.setAttribute("class", "fa-regular fa-sun")
    darkFunText.textContent = "Light Mode"
    root.style.setProperty('--shadow', '0px 0px 7px 2px #00000008')
}
function light(params) {
    //light colors
    root.style.setProperty('--body', '#fff')
    root.style.setProperty('--h1TExts', '#2B3844')
    root.style.setProperty('--back', '#fff')
    btn.setAttribute("class", "fa-regular fa-moon")
    darkFunText.textContent = "Dark Mode"
    root.style.setProperty('--shadow', '0px 2px 4px 0px #0000000E')
}
var a = true;
darkBox.addEventListener("click", () => {
    console.log("hello");

    if (a) {
        dark()
        a = false
        localStorage.setItem("dark", 1)
    } else {
        light()
        a = true
        localStorage.setItem("dark", 2)
    }
})

const getData = async (link) => {
    modal.style = "display: flex;"
    const req = await fetch(link)
    const data = await req.json()
    writeData(data)
    // console.log(data[0]);
    modal.style = "display: none;"
}
getData(api_link)

function writeData(item) {
    var apiDocuments = item[0]
    
    console.log(apiDocuments);

    countryBlog.innerHTML = `
    
    <div class="blogFlag">
        <img src="${apiDocuments.flags.png}" alt="">
    </div>
    <div class="blogAbout">
        <div class="aboutBox">
            <div class="aboutLeft">
                <h1 class="name">${apiDocuments.name.common}</h1>
                <h2>Nativ name: <span>${apiDocuments.name.common}</span></h2>
                <h2>Population: <span>${apiDocuments.population}</span></h2>
                <h2>Region: <span>${apiDocuments.region}</span></h2>
                <h2>Subregion: <span>${apiDocuments.subregion}</span></h2>
                <h2>Capital: <span>${apiDocuments.capital}</span></h2>
            </div>
            <div class="aboutRight">
                <h2>Top Level Domain: <span>Undefiand</span></h2>
                
                <h2>Currencies: <span>${apiDocuments.currencies[0]}</span></h2>
                <h2>Languages: <span>${apiDocuments.languages.ara
        }</span></h2>
            </div>
        
        </div>
        <div class="aboutBottom">
            <h1 class="Borders">
            Border Countries:  
            </h1>
        </div>
    </div>
    `
    var bordersNm = apiDocuments.borders ? apiDocuments.borders : []
    const borders = document.querySelector(".Borders")
    if (bordersNm.length!=0) {
        bordersNm.forEach((e) => {
            
    
            borders.innerHTML += `
            <span>${e}</span> 
            `
        })
    }else{
        borders.innerHTML += `
            <span>Chegaradosh davlatlari yo'q</span> 
            `
    }
    
}