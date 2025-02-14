async function checkLogin(event) {
    event.preventDefault();
    const uname = document.getElementById('uname').value;
    const email = document.getElementById('email').value;

    const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: uname, email: email })
    });
    const result = await response;
    if (result.status == 200) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("searchForm").style.display = "block";
    } else {
        document.getElementById("loginresult").innerHTML = "Invalid name or email";
    }

}
async function searchDogs() {
    const dogUrl = "https://frontend-take-home-service.fetch.com/dogs/search";
    const response = await fetch(dogUrl, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET",
        credentials: "include",
    })
    const result = await response;
    if (result.status !== 200) {
        throw new Error("Failed to fetch data");
    }
    return result.json();
}

function createRow(dogData){
    const row = document.createElement("tr");
    const keys = Object.keys(dogData);
    for (const key of keys) {
        const cell = document.createElement("td");
        cell.innerHTML = dogData[key];
        row.appendChild(cell);
    }
    return row;
}

async function fillTableContent() {
    const dogData = await searchDogs();
    const table = document.getElementById("searchtable");
    for (const dog of dogData) {
        table.appendChild(createRow(dog));
    }
}
document.getElementById('loginForm').addEventListener('submit', checkLogin);
document.getElementById('searchForm').addEventListener('submit', searchDogs);
