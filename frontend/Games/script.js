function loadGame(gameFolder) {
    document.querySelector(".game-selection").classList.add("hidden");
    document.getElementById("game-frame").classList.remove("hidden");
    document.getElementById("game-iframe").src = gameFolder + "/index.html";
}

function goBack() {
    document.getElementById("game-frame").classList.add("hidden");
    document.querySelector(".game-selection").classList.remove("hidden");
}
