
let news = document.getElementById("news")
news.innerHTML = `        
        <span>${Date()}</span>`

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
        this.username = `${this.firstName.charAt(0).toLowerCase()}${this.lastName.toLowerCase()} `

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
            //without check

        } else {
            // With Check
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
            <tr tr >
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
            // input empty
            operatorFoundlive.innerHTML = ""
            return
        }

        let operatorFilter = personalTeam.filter((person1) =>
            person1.firstName.toLowerCase().includes(checkText.toLowerCase()) || person1.lastName.toLowerCase().includes(checkText.toLowerCase()) || person1.operatorCode.toString().includes(checkText))



        if (operatorFilter.length > 0) {
            // user found
            messageSearch += ""

            operatorFilter.forEach(person2 => {
                messageSearch +=
                    `
            <tr tr >
                <th>${person2.id}</th>
                <td>${person2.firstName.toUpperCase()} ${person2.lastName.toUpperCase()}</td>
                <td>${person2.operatorCode}</td>
                <td>${person2.email}</td>
                </tr >

            `
            })

            operatorFoundlive.innerHTML = messageSearch

        } else {
            // not found
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

            textArea.disabled = false
            saveTask.disabled = false
            textArea.value = ""
            labelFloating.innerHTML = `<label label > Welcome, ${loginUser.firstName} ${loginUser.lastName} Type your task, please </label > `

        } else {
            labelFloating.innerHTML = `<label label > Wrong User / Password </label > `
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
                labelFloating.innerHTML = `<label label > Without Text </label > `
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

    let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>`

    personalTeam.forEach(person => {
        person.tasks.forEach(task => {



            message3 += `
            <tr tr >
                        <th>${task.taskNumber}</th>
                        <td>${person.firstName} ${person.lastName} </td>
                        <td>${task.description} </td>
                        <td>${task.date} </td>
                        <td>${task.status} </td>
                        <td><button class="edit-task" 
                            taskNumber=${task.taskNumber}>${icon}
                        </button></td>
            </tr > `
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
                const modalElement = document.getElementById("exampleModal")
                const modal = new bootstrap.Modal(modalElement)
                modal.show()

                dataOperator.innerHTML = `Task: ${taskIDNumber} Name:${personTask.firstName} ${personTask.lastName} `

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

const validationDeleteDB = () => {

    let news1 = document.getElementById("news1")

    let clearInformationDB = document.getElementById("clearInformationDB")

    clearInformationDB.onclick = () => {
        if (personalTeam.length === 0) {

            news1.innerHTML = `empty database`

        }
        else {

            news1.innerHTML = `
  Would you like to Clear All Operators?
  <button class="warningDB" id="deleteAll">Yes</button>
  <button class="alertDB" id="cancelOperation">No</button>
`


        }


        let deleteAll = document.getElementById("deleteAll")
        let cancelOperation = document.getElementById("cancelOperation")
        deleteAll.onclick = () => {

            personalTeam = []
            taskCreated()
            result()
            localStorage.clear("personalTeam")
            news1.innerHTML = "All operators cleared!";
        }

        cancelOperation.onclick = () => {
            news1.innerHTML = "Data Saved";
        }



    }
    news1.innerHTML = ""
}


validationDeleteDB()
newUser()
result()
searchPersonal()