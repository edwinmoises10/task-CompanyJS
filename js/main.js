

// CheckInputs Only Strings

const stringCheck = (valueString) => {
    let value = valueString.value
    if (!/^[a-zA-ZñÑ]*$/.test(value)) {
        Swal.fire("Only letters are allowed!");
        value = valueString.value.replace(/[^a-zA-ZñÑ]/g, "")
    }
    if (value.length > 0) {
        value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }
    valueString.value = value
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
        this.email = `${this.firstName.trim().charAt(0).toLowerCase()}${this.lastName.trim().toLowerCase()}@company.com`
        // CODE OPERATOR 
        this.operatorCode = Math.floor(1000 + Math.random() * 9000)
        // username
        this.username = `${this.firstName.charAt(0).toLowerCase()}${this.lastName.toLowerCase()} `
        this.tasks = []
    }
}

// localStorage DB 
let personalTeam = localStorage.getItem("personalTeam") ? JSON.parse(localStorage.getItem("personalTeam")) : []

// Update Local Storage
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
let lastName = document.getElementById("lastName")
// Check input only letters
firstName.oninput = () => {
    stringCheck(firstName)
}
lastName.oninput = () => {
    stringCheck(lastName)
}

let userPassword = document.getElementById("userPassword")
let workArea = document.getElementById("workArea")
let entryDate = document.getElementById("entryDate")
let saveInf = document.getElementById("saveInf")
let termsConditions = document.getElementById("termsConditions")

// Icon Edit

let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>`


// Validate duplicate user or email

const checkUserMail = (firstName, lastName) => {

    const emailCheck = `${firstName.trim().charAt(0).toLowerCase()}${lastName.trim().toLowerCase()}@company.com`

    const checkNameMail = personalTeam.find(person =>
        (person.firstName === firstName &&
            person.lastName == lastName) ||
        person.email === emailCheck
    )
    if (checkNameMail) {
        return true
    }
    return false
}

const newUser = () => {

    saveInf.onclick = (e) => {
        e.preventDefault()
        if (!termsConditions.checked || !firstName.value || !lastName.value) {
            withoutItemsForm()
            return
        } else if (!userPassword.value || !workArea.value || !entryDate.value) {
            withoutItemsForm()
            return
        }
        if (checkUserMail(firstName.value, lastName.value)) {
            userExist()
            return
        }
        const person = new PersonalTeam(firstName.value, lastName.value, userPassword.value, workArea.value, entryDate.value)

        // save information to Array 
        personalTeam.push(person)
        // save information to DB 
        localStorage.setItem("personalTeam", JSON.stringify(personalTeam))
        result()

        const modal = bootstrap.Modal.getInstance(document.getElementById("registerModal"))
            || new bootstrap.Modal(document.getElementById("registerModal"))
        modal.hide()

        userCreateAlert(person)

        document.querySelector("#registerModal form").reset();

    }

}

const editDeleteOperator = (operationUserEdit, editFirstName, editlastName, pass, workAreaEdit) => {

    operationUserEdit.firstName = editFirstName
    operationUserEdit.lastName = editlastName
    operationUserEdit.password = pass
    operationUserEdit.workArea = workAreaEdit

    updateLocalStorageUser(operationUserEdit)

}

let values = document.getElementById("values")

// Results
const result = () => {
    let message = ""

    personalTeam.forEach(person => {
        message +=
            `
            <tr>
                        <th><button class="editOperator" id=${person.id}>${person.id}</button></th>
                        <td>${person.firstName} ${person.lastName} </td>
                        <td>${person.username} </td>
                        <td>${person.workArea} </td>
                        <td>${person.email} </td>
                        <td>${person.operatorCode} </td>
                        <td>${person.entryDate} </td>
                        
            </tr>
            `
    })
    values.innerHTML = message


    // Edit - remove operator

    let editOperator = document.querySelectorAll(".editOperator")
    let firstNameDB = document.getElementById("firstNameDB")
    let lastNameDB = document.getElementById("lastNameDB")
    let userPasswordDB = document.getElementById("userPasswordDB")
    let workAreaDB = document.getElementById("workAreaDB")
    let operatorView = document.getElementById("operatorView")
    let saveChanges = document.getElementById("saveChanges")
    let deleteOperator = document.getElementById("deleteOperator")

    firstNameDB.oninput = () => {
        stringCheck(firstNameDB)
    }
    lastNameDB.oninput = () => {
        stringCheck(lastNameDB)
    }


    editOperator.forEach(operator => {
        operator.onclick = (e) => {

            const operatorID = Number(e.currentTarget.getAttribute("id"))

            const operatorInformation = personalTeam.find(operatorInfo => operatorInfo.id === operatorID)

            if (operatorInformation) {
                editOperatorAlert(operatorInformation).then(() => {
                    // Open my Modal
                    const modalElement = document.getElementById("editModalOperator")
                    const modal = new bootstrap.Modal(modalElement)
                    modal.show()
                })

                operatorView.innerHTML =
                    `
                    <strong>Personal Information</strong>
                    <br>
                    Hi <strong>${operatorInformation.firstName} ${operatorInformation.lastName}</strong><span class="text-muted"> | Code: ${operatorInformation.operatorCode}</span>
                    <br><span class="text-muted"><strong>Email:</strong> ${operatorInformation.email}</span>`;

                firstNameDB.value = operatorInformation.firstName
                lastNameDB.value = operatorInformation.lastName
                userPasswordDB.value = operatorInformation.userPassword
                workAreaDB.value = operatorInformation.workArea

                saveChanges.onclick = (e) => {
                    e.preventDefault()

                    editDeleteOperator(operatorInformation, firstNameDB.value, lastNameDB.value, userPasswordDB.value, workAreaDB.value)

                    const modalElement = document.getElementById("editModalOperator");
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    if (modal) modal.hide();

                    edituserCreateAlert(operatorInformation).then(() => {
                        result()
                    })

                }

                deleteOperator.onclick = (e) => {
                    e.preventDefault()
                    const indexOperator = personalTeam.findIndex(operatorTeam => operatorTeam.id === operatorID)

                    if (indexOperator > -1) {
                        personalTeam.splice(indexOperator, 1)
                        localStorage.setItem("personalTeam", JSON.stringify(personalTeam))

                        result()
                        taskCreated()


                    }

                    localStorage.setItem("personalTeam", JSON.stringify(personalTeam))

                    const modalElement = document.getElementById("editModalOperator");
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    if (modal) modal.hide();

                    operatorDelete(operatorInformation).then(() => {
                        result()
                    })

                }


            }
        }
    })
}

// Search personal 
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

// Create New Task
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
// Function Edit New Task
const editNewTask = (task, newDescription, newStatus) => {
    task.description = newDescription
    task.status = newStatus
    task.date = Date().toLocaleString()
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

                hideModalLogin()



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
// Close Modal Bootstrap
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


const xmodal = document.getElementById("xmodal")
xmodal.onclick = () => {
    operatorEmail.value = ""
    passwordloggin.value = ""
}

logginSesion()

// Edit - Delete task 

const taskCreated = () => {

    let pendingTask = document.getElementById("pendingTask")
    let message3 = ""

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

                    hideModal()

                    editTaskAlert(personTask).then(() => {
                        taskCreated()
                    })
                }

                let deleteTask = document.getElementById("deleteTask")
                deleteTask.onclick = () => {
                    const taskIndex = personTask.tasks.findIndex(task => task.taskNumber === taskIDNumber)
                    if (taskIndex > -1) {

                        confirmDelete(personTask.tasks[taskIndex].taskNumber).then(result => {
                            if (result.isConfirmed) {
                                personTask.tasks.splice(taskIndex, 1)
                                localStorage.setItem("personalTeam", JSON.stringify(personalTeam));

                                hideModal()

                                taskCreated()
                                Swal.fire({
                                    icon: "success",
                                    title: "Task deleted successfully",
                                    timer: 1200,
                                    showConfirmButton: false,
                                    background: "rgba(0,0,0,0.8)",
                                    color: "#fff"
                                });
                            }
                        })






                    }
                }
            }
        }
    })
}

taskCreated()

// Delete DB 
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
            PersonalTeam.id = 0
            personalTeam = []
            taskCreated()
            result()
            // localStorage.clear("personalTeam")
            localStorage.removeItem("personalTeam")
            news1.innerHTML = "All operators cleared!";
        }
        cancelOperation.onclick = () => {
            news1.innerHTML = "Data Saved";
        }
    }
    news1.innerHTML = ""
}
// hide Modal


function hideModal() {
    const modalElement = document.getElementById("exampleModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
}

function hideModalLogin() {
    const modalElement = document.getElementById('loginModal')
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.hide()
    Swal.fire({
        icon: "success",
        title: `Task has been registered successfully.`,
        showConfirmButton: false,
        timer: 1500
    });
}
// SweetAlert Func
function userCreateAlert(userSaved) {
    Swal.fire({
        icon: "success",
        title: `User ${userSaved.firstName} ${userSaved.lastName} has been registered successfully.`
    });
}
function edituserCreateAlert(userUpdated) {
    return Swal.fire({
        icon: "success",
        title: `User ${userUpdated.firstName} ${userUpdated.lastName} has been updated successfully.`,
        showConfirmButton: false,
        timer: 1500
    });
}
function editTaskAlert(userUpdated1) {
    return Swal.fire({
        icon: "success",
        title: `User ${userUpdated1.firstName} ${userUpdated1.lastName} has been updated successfully.`,
        showConfirmButton: false,
        timer: 1500
    });
}
function operatorDelete(userDelete) {
    return Swal.fire({
        icon: "info",
        title: `User ${userDelete.firstName} ${userDelete.lastName} has been delete successfully.`,
        showConfirmButton: false,
        timer: 1500
    });
}
function withoutItemsForm() {
    Swal.fire({
        icon: "warning",
        title: "Please fill in all fields."
    });
}

function confirmDelete(taskNumber) {
    return Swal.fire({
        icon: "warning",
        title: `Delete Task ${taskNumber}?`,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    });
}

function userExist() {
    Swal.fire({
        icon: "info",
        title: "This user is already registered"
    });
}

function editOperatorAlert(operatorInfView) {
    return Swal.fire({
        position: "center",
        icon: "success",
        title: `Operator: ${operatorInfView.firstName} ${operatorInfView.lastName} selected.`,
        showConfirmButton: false,
        timer: 1500
    });
}

// X Button 
let exitX = document.getElementById("exitX")
exitX.onclick = () => {
    document.querySelector("#registerModal form").reset();
}
// Functions

validationDeleteDB()
newUser()
result()
searchPersonal()
