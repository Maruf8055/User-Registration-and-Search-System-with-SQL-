document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5050/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

const addUserBtn = document.querySelector('#add-user-btn');
addUserBtn.onclick = function () {
    const userData = {
        username: document.querySelector('#username-input').value,
        password: document.querySelector('#password-input').value,
        firstname: document.querySelector('#firstname-input').value,
        lastname: document.querySelector('#lastname-input').value,
        salary: parseFloat(document.querySelector('#salary-input').value),
        age: parseInt(document.querySelector('#age-input').value),
        registerday: document.querySelector('#registerday-input').value,
        signintime: document.querySelector('#signintime-input').value
    };

    fetch('http://localhost:5050/insert', {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

// Search by username
const searchBtn = document.querySelector('#search-btn');
searchBtn.onclick = function () {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5050/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

// Search by first or last name
const searchNameBtn = document.querySelector('#search-name-btn');
searchNameBtn.onclick = function () {
    const firstname = document.querySelector('#search-firstname-input').value;
    const lastname = document.querySelector('#search-lastname-input').value;

    fetch(`http://localhost:5050/search/name/${firstname}/${lastname}`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

// Search by salary range
const searchSalaryBtn = document.querySelector('#search-salary-btn');
searchSalaryBtn.onclick = function () {
    const minSalary = document.querySelector('#min-salary-input').value;
    const maxSalary = document.querySelector('#max-salary-input').value;

    fetch(`http://localhost:5050/search/salary/${minSalary}/${maxSalary}`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

// Search by age range
const searchAgeBtn = document.querySelector('#search-age-btn');
searchAgeBtn.onclick = function () {
    const minAge = document.querySelector('#min-age-input').value;
    const maxAge = document.querySelector('#max-age-input').value;

    fetch(`http://localhost:5050/search/age/${minAge}/${maxAge}`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

// Search registered after a specific user
const searchAfterBtn = document.querySelector('#search-after-btn');
searchAfterBtn.onclick = function () {
    const username = document.querySelector('#search-after-input').value;

    fetch(`http://localhost:5050/search/after/${username}`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

// Search users who never signed in
const searchNeverSignedInBtn = document.querySelector('#search-never-signed-in-btn');
searchNeverSignedInBtn.onclick = function () {
    fetch(`http://localhost:5050/search/never-signed-in`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

// Search users registered on the same day as a specific user
const searchSameDayBtn = document.querySelector('#search-same-day-btn');
searchSameDayBtn.onclick = function () {
    const username = document.querySelector('#search-same-day-input').value;

    fetch(`http://localhost:5050/search/same-day/${username}`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

// Search users who registered today
const searchTodayBtn = document.querySelector('#search-today-btn');
searchTodayBtn.onclick = function () {
    fetch(`http://localhost:5050/search/today`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const rowHtml = `
        <tr>
            <td>${data.username}</td>
            <td>${data.firstname}</td>
            <td>${data.lastname}</td>
            <td>${data.salary}</td>
            <td>${data.age}</td>
            <td>${new Date(data.registerday).toLocaleDateString()}</td>
            <td>${data.signintime ? new Date(data.signintime).toLocaleString() : 'Never Signed In'}</td>
        </tr>
    `;
    table.innerHTML += rowHtml;
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    table.innerHTML = '';

    for (const user of data) {
        const row = `
            <tr>
                <td>${user.username}</td>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.salary}</td>
                <td>${user.age}</td>
                <td>${new Date(user.registerday).toLocaleDateString()}</td>
                <td>${user.signintime ? new Date(user.signintime).toLocaleString() : 'Never Signed In'}</td>
            </tr>
        `;
        table.innerHTML += row;
    }
}
