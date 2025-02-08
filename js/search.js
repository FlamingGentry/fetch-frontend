async function getDogBreeds() {
    const breedUrl = "https://frontend-take-home-service.fetch.com/dogs/breeds";
    const breedRes = await fetch(breedUrl, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        method: "GET",
        credentials: "include",
    })
    .then (response => response.json());
    return response;
}
async function searchDogs() {
    const dogUrl = "https://frontend-take-home-service.fetch.com/dogs";
    const response = await fetch(dogUrl, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        method: "GET",
        credentials: "include",
    })
    .then (response => response.json());
    return response;
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

