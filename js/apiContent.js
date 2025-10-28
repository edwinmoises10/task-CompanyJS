
// API 




let URL = "https://ipwho.is/"
let news = document.getElementById("news")



const apiInformation = (apiUrl) => {

    let errorMessage = "There was a problem while trying to fetch the API information."
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            getInformation(data)
        }).catch(err => {
            console.log("there are a problem: ", err)
            news.innerHTML = `<section>${errorMessage}</section>`;
        })
}

let buttonNM = document.getElementById("buttonNM")

const getInformation = (dataApi) => {
    const apiInformationdata = document.createElement("div")

    apiInformationdata.classList.add("apiInformation")

    let date = new Date(dataApi.timezone.current_time)
    let newformatDate = date.toISOString().split('T')[0]
    let status = ""

    if (dataApi.success) {
        status = `✅ Success`
    }


    apiInformationdata.innerHTML = `
        <h2>Country: ${dataApi.country}</h2>
        <h2>City: ${dataApi.city}</h2>
        <h2>IP: ${dataApi.ip}</h2>
        <h2>Date: ${newformatDate}</h2>
        <h2>${status}</h2>
    `
    news.appendChild(apiInformationdata)

    const country = document.createElement("div")
    country.classList.add("country")
    country.innerHTML =
        `
        <img class="viewPicture" src="${dataApi.flag.img}">
    `
    buttonNM.appendChild(country)
}





apiInformation(URL)
