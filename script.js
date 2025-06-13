// Get DOM elements
const modal = document.getElementById('unitModal');
const addUnitBtn = document.getElementById('addUnitBtn');
const closeBtn = document.getElementsByClassName('close')[0];
const addMoreBtn = document.getElementById('addMoreBtn');
const finishBtn = document.getElementById('finishBtn');
const unitsList = document.getElementById('unitsList');
const userNameProfile = document.getElementById("user-name-profile");
const userAvatarprofile = document.getElementById("user-avatar-profile");


document.addEventListener("DOMContentLoaded", fetchUserProfile);

async function fetchUserProfile() {
    try {
        fetch("https://randomuser.me/api/")
            .then(response => response.json())
            .then(user => {
                userNameProfile.innerHTML = `${user.results[0].name.first}` + " " + `${user.results[0].name.last}`
                userAvatarprofile.style.backgroundImage = `url(${user.results[0].picture.large})`
                userAvatarprofile.innerHTML = "";
            });
    } catch (eror) {
        console.error("Erro ao buscar dados do usuário:", error)
    }
}

// Array to store curriculum units
let curriculumUnits = [];

// Open modal
addUnitBtn.onclick = function () {
    modal.style.display = 'block';
    clearModalInputs();
}

// Close modal
closeBtn.onclick = function () {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Add more units
addMoreBtn.onclick = function () {
    addUnit();
    clearModalInputs();
}

// Finish adding units
finishBtn.onclick = function () {
    addUnit();
    modal.style.display = 'none';
}

// Function to add a unit
function addUnit() {
    const unitName = document.getElementById('unitName').value;
    const unitWorkload = document.getElementById('unitWorkload').value;

    if (unitName && unitWorkload) {
        curriculumUnits.push({
            name: unitName,
            workload: unitWorkload
        });
        updateUnitsList();
    }
}

// Function to update the units list in the UI
function updateUnitsList() {
    unitsList.innerHTML = '';
    curriculumUnits.forEach((unit, index) => {
        const unitElement = document.createElement('div');
        unitElement.className = 'unit-item';
        unitElement.innerHTML = `
            <span>${unit.name}</span>
            <span class="workload">${unit.workload}h</span>
        `;
        unitsList.appendChild(unitElement);
    });
}

function removeUnitFromList(id) {
    unitsList.remove()
}

// Function to clear modal inputs
function clearModalInputs() {
    document.getElementById('unitName').value = '';
    document.getElementById('unitWorkload').value = '';
}