console.log("connected index js file")
const login = () => {
    const userName = document.getElementById("userName").value
    const password = document.getElementById("password").value
    //console.log(password , userName)
    if(userName==""||password==""){
        alert("Please fill write your username and password")
    }
    else if(userName=="admin" && password=="admin123"){
        window.location.href = "main-page.html"
    }
    else{
        alert("Please type right username and password")
    }
}


