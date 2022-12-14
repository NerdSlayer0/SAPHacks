// ready(function () {

//     function ajaxPOST(url, callback, data) {

//         let params = typeof data == 'string' ? data : Object.keys(data).map(
//             function (k) {
//                 return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
//             }
//         ).join('&');

//         const xhr = new XMLHttpRequest();
//         xhr.onload = function () {
//             if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//                 callback(this.responseText);

//             } else {
//                 console.log(this.status);
//             }
//         }
//         xhr.open("POST", url);
//         xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         xhr.send(params);
//     }

//     // POST TO THE SERVER
//     document.querySelector("#submit").addEventListener("click", function (e) {
//         e.preventDefault();
//         let username = document.getElementById("username");
//         let password = document.getElementById("password");
//         let inPerson = document.getElementById("inPerson").checked ? "0" : "1";
//         let queryString = "username=" + username.value + "&password=" + password.value + "&inPerson=" + inPerson;
//         ajaxPOST("/login", function (data) {
//             if (data) {
//                 let dataParsed = JSON.parse(data);
//                 if (dataParsed.status == "fail") {
//                     document.getElementById("errorMsg").innerHTML = dataParsed.msg;
//                 } else {
//                     //sessionStorage.setItem("isAdmin", dataParsed.isAdmin);
//                     window.location.replace("/main");
//                 }
//             }

//         }, queryString);
//     });

    // document.querySelector("#guest").addEventListener("click", function (e) {
    //     e.preventDefault();
    //     ajaxPOST("/guest_login", function (data) {
    //         window.location.replace("/main");
    //     }, "");
    // });
// });

// function ready(callback) {
//     if (document.readyState != "loading") {
//         callback();
//     } else {
//         document.addEventListener("DOMContentLoaded", callback);
//     }
// }

async function sendLogin() {
    try {
        let res = await fetch("/login", {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                inPerson: document.getElementById("inPerson").checked ? "0" : "1"
            })
        });
        let parsed = await res.json();
        localStorage.setItem("inPerson", document.getElementById("inPerson").checked ? "0" : "1");
        console.log("Asd");
        console.log(parsed.status);
        if (parsed.status == "success") {
            console.log("passed");
            window.location.replace("/slack");
        }
    } catch (error) {
        console.log(error);
    }
}
