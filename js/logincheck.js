async function checkLogin() {
    const loginUrl = "https://frontend-take-home-service.fetch.com/auth/login";
    var username = document.getElementById("uname").value;
    var email = document.getElementById("email").value;
    const response = await fetch(loginUrl, {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: username,
            email: email
        }),
        method: "POST",
    })
    .then (response => response.json());
    if (response.status == "ok") {
        localStorage.setItem("token", response.headers.getSetCookie("fetch-access-token"));
        window.location.href = "searchpage.html";
    } else {
        document.getElementById("loginresult").innerHTML = "Invalid name or email";
    }
}
