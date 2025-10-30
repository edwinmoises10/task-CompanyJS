
// API 
let URL = "https://ipwho.is/"
let news = document.getElementById("news")
let errorMessage = "There was a problem while trying to fetch the API information"

const apiInformation = (apiUrl) => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            getInformation(data)
        }).catch(err => {
            errorMessageAlert(err)
        })
}

let countryFlag = document.getElementById("countryFlag")

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
    countryFlag.appendChild(country)
}

const errorMessageAlert = (error) => {
    Swal.fire({
        icon: "error",
        title: `API Error`,
        text:  `${errorMessage} :  ${error}`,
        footer: 'Contact me: <br> <a href="mailto:edwinmoises.9319@gmail.com?subject=Consulta%20sobre%20tus%20servicios%2C%20Moises&body=Hola%2C%20quisiera%20obtener%20más%20información."><svg class="icons-styles" xmlns="http://www.w3.org/2000/svg" width="24" height="24"viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg></a>'
    });
}
apiInformation(URL)
