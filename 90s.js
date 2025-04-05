window.onload = function () {
    const songList = document.getElementById("song-list-ul");
    const songTitle = document.getElementById("song-title");
    const artistName = document.getElementById("artist-name");
    const songCover = document.getElementById("song-cover");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const progress = document.getElementById("progress");

    let currentSongIndex = 0;
    let isPlaying = false;
    let audio = new Audio();

    const songs = [
        
        { title: 'My Heart Will Go On', artist: 'Celine Dion', src: 'songs/Titanic • My Heart Will Go On • Celine Dion [F2RnxZnubCM].mp3', cover: 'playlist/ik.png' },
        { title: 'I Want It That Way', artist: 'Backstreet Boys', src: 'Backstreet Boys - I Want It That Way (Official HD Video) [4fndeDfaWCg].mp3', cover: 'playlist/ik.png' },
        { title: 'Pehla Nasha', artist: '', src: 'songs/Pehla Nasha Pehla Khumar Jo Jeeta Wohi Sikandar HD [zI2HJONbT5A].mp3', cover: 'playlist/ik.png' },
        { title: 'Tum Pass Aaye', artist: '', src: 'songs/Koi Mil Gaya - Full Video_Kuch Kuch Hota Hai _Shah Rukh Khan,Kajol,Rani Mukerji [Jzd4bma3QNo].mp3', cover: 'playlist/ik.png' },
        { title: 'Koi Mil Gaya', artist: '', src: 'songs/Koi Mil Gaya - Full Video_Kuch Kuch Hota Hai _Shah Rukh Khan,Kajol,Rani Mukerji [Jzd4bma3QNo].mp3', cover: 'playlist/ik.png' },
        
    ];
    

    function loadSong(index) {
        audio.src = songs[index].src;
        songTitle.textContent = songs[index].title;
        artistName.textContent = songs[index].artist;
        songCover.src = songs[index].cover;
        audio.load();
    }

    function playSong() {
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = "⏸️";
    }

    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = "▶️";
    }

    function playPause() {
        isPlaying ? pauseSong() : playSong();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        playSong();
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        playSong();
    }

    audio.addEventListener("timeupdate", () => {
        progress.value = (audio.currentTime / audio.duration) * 100;
    });

    progress.addEventListener("input", () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });

    playPauseBtn.addEventListener("click", playPause);
    nextBtn.addEventListener("click", nextSong);
    prevBtn.addEventListener("click", prevSong);

    // Load song list dynamically
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        li.style.cursor = "pointer";
        li.style.padding = "10px";
        li.style.listStyle = "none";

        li.addEventListener("click", () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });

        // Like Button
        const likeBtn = document.createElement("button");
        likeBtn.innerHTML = localStorage.getItem(`liked_${index}`) ? "❤️" : "🤍";
        likeBtn.style.border = "none";
        likeBtn.style.background = "transparent";
        likeBtn.style.cursor = "pointer";
        likeBtn.style.marginLeft = "10px";
        likeBtn.style.fontSize = "18px";

        likeBtn.addEventListener("click", () => {
            const songKey = `liked_${index}`;
            let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

            if (localStorage.getItem(songKey)) {
                likeBtn.innerHTML = "🤍"; // Unlike
                localStorage.removeItem(songKey);
                likedSongs = likedSongs.filter((s) => s.src !== songs[index].src);
            } else {
                likeBtn.innerHTML = "❤️"; // Like
                localStorage.setItem(songKey, true);
                likedSongs.push(songs[index]);
            }

            localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
        });

        li.appendChild(likeBtn);
        songList.appendChild(li);
    });

    loadSong(currentSongIndex); // Load the first song initially.

    audio.addEventListener("error", () => {
        console.error("Error loading audio:", audio.src);
        alert("Failed to load audio file.");
    });
};
