document.addEventListener("DOMContentLoaded", () => {
    const clearBtn = document.getElementById("clear-history-btn");

clearBtn.addEventListener("click", () => {
    localStorage.removeItem("history");
    historyContainer.innerHTML = "<p>No songs played yet.</p>";
});

    console.log("Loading history...");

    const historyContainer = document.getElementById("history-list");
    let history = JSON.parse(localStorage.getItem("history")) || [];

    console.log("Loaded history:", history); // Debugging message

    if (history.length === 0) {
        historyContainer.innerHTML = "<p>No songs played yet.</p>";
    } else {
        historyContainer.innerHTML = "";
        history.forEach(song => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${song.cover}" width="30" height="30" style="border-radius:5px; margin-right:10px;">
                ${song.title} - ${song.artist}
            `;
            historyContainer.appendChild(li);
        });
    }
});





function playSong() {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = '⏸️';
    saveToHistory(songs[currentSongIndex]);
}