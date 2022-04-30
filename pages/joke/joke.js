const URL = "https://api.chucknorris.io/jokes/random"

export function loadJoke(){
    fetch(URL)
        .then(res=>res.json())
        .then(joke=>{
            document.getElementById("id-joke").innerText = joke.value
        })
}

