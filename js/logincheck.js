async function checkLogin() {
    const loginUrl = "https://frontend-take-home-service.fetch.com/auth/login";
    var username = document.getElementById("uname").value;
    var email = document.getElementById("email").value;

    const logRequest = new Request(loginUrl, {body: {name: username, email: email}, method: "POST"});
    logRequest.credentials = "include";

    const response = await fetch(logRequest);
}
