
async function checkLogin(event) {
    event.preventDefault();
    let uname = document.getElementById('uname').value;
    let email = document.getElementById('email').value;
    var loginRequest = postRequest.clone();
    loginRequest.body = JSON.stringify({ name: uname, email: email });
    var response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: uname, email: email })
    });
    const result = await response;
    if (result.status == 200) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("searchForm").style.display = "block";
        document.getElementById("loginresult").innerHTML = "Login Successful!";
        let breeds = await getDogBreeds();
        let breedSelect = document.getElementById('breedSelect');
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.text = breed;
            breedSelect.add(option);
        });
    } else {
        document.getElementById("loginresult").innerHTML = "Invalid name or email";
    }
}
async function searchDogs() {
    let params = new URLSearchParams();
    if (breedArray.length > 0) {
        params.append("breeds", breedArray.join(","));
        console.log("Breeds: " + breedArray.join(","));
    }
    if (zipArray.length > 0) {
        params.append("zipCodes", zipArray.join(","));
        console.log("Zip Codes: " + zipArray.join(","));
    }
    let ageMin = document.getElementById('ageMin').value;
    let ageMax = document.getElementById('ageMax').value;
    if (ageMin) {
        params.append("ageMin", ageMin);
        console.log("Age Min: " + ageMin);
    }
    if (ageMax) {
        params.append("ageMax", ageMax);
        console.log("Age Max: " + ageMax);
    }
    const dogUrl = "https://frontend-take-home-service.fetch.com/dogs/search?" + params;
    let response = await fetch(dogUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        method: 'GET',
        credentials: 'include',
    });
    const result = await response;
    if (result.status !== 200) {
        throw new Error("Failed to fetch data");
    }
    return result.json();
}

async function getDogData(dogIdArray){
    const dogUrl = "https://frontend-take-home-service.fetch.com/dogs";
    const response = await fetch(dogUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(dogIdArray)
    })
    const result = await response;
    if (result.status !== 200) {
        throw new Error("Failed to fetch data");
    }
    return result.json();
}

async function getDogMatch(dogIdArray){
    const dogUrl = "https://frontend-take-home-service.fetch.com/dogs/match";
    const response = await fetch(dogUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(dogIdArray)
    })
    const result = await response;
    if (result.status !== 200) {
        throw new Error("Failed to fetch data");
    }
    return result.json();
}

function createDogRow(dogData) {
    let row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="checkbox" id="favCheck"></td>
        <td><img src="${dogData.img}" alt="${dogData.name}" width="100"></td>
        <td>${dogData.name}</td>
        <td>${dogData.age}</td>
        <td>${dogData.zip_code}</td>
        <td>${dogData.breed}</td>
        <td style="display:none">${dogData.id}</td>
    `;
    return row;

}

async function getDogBreeds() {
    const dogUrl = "https://frontend-take-home-service.fetch.com/dogs/breeds";
    const response = await fetch(dogUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        method: 'GET',
        credentials: 'include',
    })
    const result = await response;
    if (result.status !== 200) {
        throw new Error("Failed to fetch data");
    }
    return result.json();

}

function updateFavTable(dogDataArray) {
    const favTable = document.getElementById('favTable').getElementsByTagName('tbody')[0];
    favTable.innerHTML = '';
    dogDataArray.forEach(dogData => {
        const row = createRow(dogData);
        favTable.appendChild(row);
    });
}
