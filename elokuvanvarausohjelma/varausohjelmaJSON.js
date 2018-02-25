// variable
var users = {
    // "property" : value
    "username": "default",
    "password": "default"
}
// users.username palauttaisi default (String)

// lista
var userMovies = [
    "Elokuva 1", "Sali 1", "04:00"
]
// userMovies[1] palauttaisi "Sali 1"

// objektilista, huomaa pilkut objektien valilla objektilistassa (arrayList)
var userData = [
    {
        "username": "default",
        "password": "default",
        // vaihtoehto 1
        "varaukset": ["Elokuva 1Sali 104:00123"],
        // vaihtoehto 2
        "varausLista": {
            "elokuva": ["Elokuva 1"],
            "sali": ["Sali 1"],
            "aika": ["04:00"],
            "paikka": ["123"]
        }
    },
    {
        "username": "notDefault",
        "password": "notDefault"
    },
    {
        "username": "uncommon",
        "password": "uncommon"
    }
]
// userData[2].username palauttaa "uncommon"
// userData[0].varauslista.elokuva[0] palauttaa "Elokuva 1"