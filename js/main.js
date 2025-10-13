


let buttonNM = document.getElementById("buttonNM")
let body_NM = document.body
let svgData = document.getElementById("svgData")
let news = document.getElementById("news")

buttonNM.onclick = () => {
    const toogleStatus = body_NM.classList.toggle("nightModeStyle")
    if (!toogleStatus) {

        svgData.innerHTML = `
        <path d="M12 2v2" />
                    <path
                        d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715" />
                    <path d="M16 12a4 4 0 0 0-4-4" />
                    <path d="m19 5-1.256 1.256" />
                    <path d="M20 12h2" />
                    `

    } else {
        news.innerHTML = `        <span id="news" class="spanBanner" >Sun Mode</span>
`
        svgData.innerHTML =
            //SUN
            `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>

`
    }

}

// Personal Team

class PersonalTeam {
    static id = 0

    constructor(firstName, lastName, password, workArea, entryDate) {
        this.id = ++PersonalTeam.id
        this.firstName = firstName
        this.lastName = lastName
        this.password = password
        this.workArea = workArea
        this.entryDate = entryDate

        // EMAIL

        this.email = `${this.firstName.charAt(0).toLowerCase()}${this.lastName.toLowerCase()}@company.com`
        // CODE OPERATOR 

        this.operatorCode = Math.floor(1000 + Math.random() * 9000)

        // username
        this.username = `${this.firstName.charAt(0).toLowerCase()}${this.lastName.toLowerCase()}`

        this.tasks = []

    }


}

// localStorage DB 
let personalTeam = localStorage.getItem("personalTeam") ? JSON.parse(localStorage.getItem("personalTeam")) : []

const updateLocalStorageUser = (user) => {

    const userIndex = personalTeam.findIndex((person) => person.id === user.id)

    personalTeam[userIndex] = user

    localStorage.setItem("personalTeam", JSON.stringify(personalTeam))
}


// ID Count

if (personalTeam.length > 0) {
    PersonalTeam.id = personalTeam[personalTeam.length - 1].id
}

let firstName = document.getElementById("firstName")

firstName.oninput = () => {
    let valor = firstName.value
    firstName.value = valor.charAt(0).toUpperCase() + valor.slice(1).toLowerCase()
}

let lastName = document.getElementById("lastName")

lastName.oninput = () => {
    let valueText1 = lastName.value
    lastName.value = valueText1.charAt(0).toUpperCase() + valueText1.slice(1).toLowerCase()
}

const newUser = () => {
    let userPassword = document.getElementById("userPassword")
    let workArea = document.getElementById("workArea")
    let entryDate = document.getElementById("entryDate")
    let saveInf = document.getElementById("saveInf")
    let termsConditions = document.getElementById("termsConditions")

    saveInf.onclick = () => {

        if (!termsConditions.checked) {
            console.log("sin check")

        } else {
            console.log("con check")
            const person = new PersonalTeam(firstName.value, lastName.value, userPassword.value, workArea.value, entryDate.value)
            // save information to Array 
            personalTeam.push(person)
            // save information to DB 
            localStorage.setItem("personalTeam", JSON.stringify(personalTeam))

            result()

        }
    }
}



let values = document.getElementById("values")

const result = () => {
    let message = ""

    personalTeam.forEach(person => {
        message +=

            `
            <tr >
                        <th>${person.id}</th>
                        <td>${person.firstName} ${person.lastName} </td>
                        <td>${person.username} </td>
                        <td>${person.workArea} </td>
                        <td>${person.email} </td>
                        <td>${person.operatorCode} </td>
                        <td>${person.entryDate} </td>
            </tr >


            `
    })
    values.innerHTML = message



}

const searchPersonal = () => {

    let searchPersonalValuelive = document.getElementById("searchPersonalValuelive")
    let messageSearch = ""
    let operatorFoundlive = document.getElementById("operatorFoundlive")

    searchPersonalValuelive.oninput = () => {
        messageSearch = ""
        let checkText = searchPersonalValuelive.value.trim()

        if (checkText === "") {
            // console.log("input empty ")
            operatorFoundlive.innerHTML = ""
            return
        }

        let operatorFilter = personalTeam.filter((person1) =>
            person1.firstName.toLowerCase().includes(checkText.toLowerCase()) || person1.lastName.toLowerCase().includes(checkText.toLowerCase()) || person1.operatorCode.toString().includes(checkText))

        console.log(operatorFilter)

        if (operatorFilter.length > 0) {
            console.log("usuario encontrado")
            messageSearch += ""

            operatorFilter.forEach(person2 => {
                messageSearch +=
                    `
             <tr >
                <th>${person2.id}</th>
                <td>${person2.firstName.toUpperCase()} ${person2.lastName.toUpperCase()}</td>
                <td>${person2.operatorCode}</td>
                <td>${person2.email}</td>
                </tr >
                    
                `
            })

            operatorFoundlive.innerHTML = messageSearch

        } else {
            console.log("not found")
        }
    }
}
const createNewTask = (user, text) => {

    let newTask = {
        taskNumber: Math.floor(Math.random() * 10000),
        description: text,
        date: new Date().toLocaleString(),
        status: "Created"
    }

    user.tasks.push(newTask)
    updateLocalStorageUser(user)
    // console.log(user)

}

const editNewTask = (task, newDescription, newStatus) => {
    task.description = newDescription
    task.status = newStatus
    updateLocalStorageUser(task)
}

const logginSesion = () => {


    let operatorEmail = document.getElementById("operatorEmail")
    let passwordloggin = document.getElementById("passwordloggin")
    let checkLoggin = document.getElementById("checkLoggin")
    let textArea = document.getElementById("textArea")
    let saveTask = document.getElementById("saveTask")
    let labelFloating = document.getElementById("labelFloating")

    // Estado inicial
    textArea.disabled = true
    saveTask.disabled = true
    textArea.value = ""
    labelFloating.innerHTML = "Sign In to Create a Task"



    checkLoggin.onclick = () => {
        const loginUser = personalTeam.find(person3 =>
            person3.email.toLowerCase() === operatorEmail.value.toLowerCase() &&
            person3.password === passwordloggin.value
        )

        if (loginUser) {
            operatorEmail.value = ""
            passwordloggin.value = ""

            console.log(loginUser.firstName)
            textArea.disabled = false
            saveTask.disabled = false
            textArea.value = ""
            labelFloating.innerHTML = `<label>Welcome, ${loginUser.firstName} ${loginUser.lastName} Type your task, please </label>`

        } else {
            labelFloating.innerHTML = `<label>Wrong User/ Password </label>`
        }

        saveTask.onclick = () => {

            let textValidation = textArea.value
            if (textValidation) {


                createNewTask(loginUser, textValidation)
                textArea.value = ""

                // Cerrar el modal con el método oficial de Bootstrap
                const modalElement = document.getElementById('loginModal')
                const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                modalInstance.hide()
                saveTask.blur()

                textArea.disabled = false
                saveTask.disabled = false
                taskCreated()


            } else {
                console.log("error")
                labelFloating.innerHTML = `<label>Without Text </label>`
            }

        }
    }




}

const loginModal = document.getElementById('loginModal')

loginModal.addEventListener('show.bs.modal', () => {
    // Cada vez que se abre el modal, limpiar y bloquear todo
    textArea.value = ""
    textArea.disabled = true
    saveTask.disabled = true
    labelFloating.innerHTML = "Sign In to Create a Task"
})

const btnClose = document.querySelector('#loginModal .btn-close');
btnClose.onclick = () => {
    btnClose.blur(); // quita el foco antes de que Bootstrap cierre
};

logginSesion()

const taskCreated = () => {

    let pendingTask = document.getElementById("pendingTask")

    let message3 = ""


    personalTeam.forEach(person => {
        person.tasks.forEach(task => {



            message3 += `
            <tr >
                        <th>${task.taskNumber}</th>
                        <td>${person.firstName} ${person.lastName} </td>
                        <td>${task.description} </td>
                        <td>${task.date} </td>
                        <td>${task.status} </td>
                        <td><button class="edit-task" 
                            taskNumber=${task.taskNumber}>
                        Edit</button></td>
            </tr >`
        })
    })

    pendingTask.innerHTML = message3


    let editTask = document.querySelectorAll(".edit-task")
    let dataOperator = document.getElementById("dataOperator")
    let textArea1 = document.getElementById("textArea1")
    let editTaskSave = document.getElementById("editTaskSave")
    let statusTask = document.getElementById("statusTask")

    editTask.forEach(edit => {
        edit.onclick = (e) => {

            const taskIDNumber = Number(e.currentTarget.getAttribute("taskNumber"))

            const personTask = personalTeam.find(person1 =>
                person1.tasks.find(task => task.taskNumber === taskIDNumber)
            )

            if (personTask) {
                console.log("user existe" + taskIDNumber)
                const modalElement = document.getElementById("exampleModal")
                const modal = new bootstrap.Modal(modalElement)
                modal.show()

                dataOperator.innerHTML = `Task: ${taskIDNumber} Name:${personTask.firstName} ${personTask.lastName}`

                const foundTask = personTask.tasks.find(task => task.taskNumber === taskIDNumber)
                textArea1.value = foundTask.description

                editTaskSave.onclick = () => {
                    editNewTask(foundTask, textArea1.value, statusTask.value)
                    taskCreated()
                }
            }





        }
    })



}

taskCreated()

let clearInformationDB = document.getElementById("clearInformationDB")

clearInformationDB.onclick = () => {
    if (personalTeam.length === 0) {
        console.log("DB Clear")


    } else {
        
        personalTeam = []
        taskCreated()
        result()
        localStorage.clear("personalTeam")
        console.log("DB Clear")

    }

}

newUser()
result()
searchPersonal()