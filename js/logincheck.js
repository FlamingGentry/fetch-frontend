async function checkLogin() {
    const loginUrl = "https://frontend-take-home-service.fetch.com/auth/login";
    var username = document.getElementById("uname").value;
    var email = document.getElementById("email").value;
    const response = await fetch(loginUrl, {
        body: JSON.stringify({
            name: username,
            email: email
        }),
        method: "POST",
    });
}
