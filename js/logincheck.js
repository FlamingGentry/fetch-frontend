async function checkLogin() {
    const loginUrl = "https://frontend-take-home-service.fetch.com";
    var username = document.getElementById("uname").value;
    var email = document.getElementById("uname").value;
    const response = await fetch(loginUrl, {
        body: JSON.stringify({
            name: username,
            email: email
        }),
        method: "POST",
    });
}