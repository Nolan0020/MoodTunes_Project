window.onload=function(){

    const songList = document.getElementById('song-list-ul');
    const songTitle = document.getElementById('song-title');
    const artistName = document.getElementById('artist-name');
    songCover = document.getElementById('song-cover');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progress = document.getElementById('progress');
    
    let currentSongIndex = 0;
    let isPlaying = false;
    let audio = new Audio();
    
    const songs = [
        { title: 'Shape of You x Naina', artist: 'Ed Sheeran & Diljit Dosanjh', src: 'songs/Ed Sheeran & Diljit Dosanjh - Shape of You x Naina (Live in Birmingham 2024) [k0Ka-deab1s].mp3', cover: 'playlist/ik.png' },
        { title: "DÁKITI ", artist: 'BAD BUNNY x JHAY CORTEZ', src: "songs/BAD BUNNY x JHAY CORTEZ - DÁKITI (Video Oficial) [TmKh7lAwnBI].mp3", cover: 'playlist/ik.png' },
        { title: 'BIRDS OF A FEATHER ', artist: ' Billie Eilish', src: 'songs/Billie Eilish - BIRDS OF A FEATHER (Official Music Video) [V9PVRfjEBTI].mp3', cover: 'playlist/ik.png' },
        { title: 'Espresso ', artist: 'Sabrina Carpenter', src: 'songs/Sabrina Carpenter - Espresso (Official Video) [eVli-tstM5E].mp3', cover: 'playlist/ik.png' },
                
    ];
    
    function loadSong(index) {
        audio.src = songs[index].src;
        songTitle.textContent = songs[index].title;
        artistName.textContent = songs[index].artist;
        songCover.src = songs[index].cover;
        audio.load(); // Load the audio file
    }
    
    function playSong() {
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = '⏸️';
    }
    
    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = '▶️';
    }
    
    function playPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
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
    
    audio.addEventListener('timeupdate', () => {
        progress.value = (audio.currentTime / audio.duration) * 100;
    });
    
    progress.addEventListener('input', () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });
    
    playPauseBtn.addEventListener('click', playPause);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);
    
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        songList.appendChild(li);
    });
    
    loadSong(currentSongIndex); // Load the first song initially.
    
    // Error handling for audio loading
    audio.addEventListener('error', () => {
        console.error('Error loading audio:', audio.src);
        alert('Failed to load audio file.');
    });
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        const songList = document.getElementById("song-list");
        const playlist = document.getElementById("playlist");
    
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        let myPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
    
        function toggleFavorite(songId, button) {
            if (favorites.includes(songId)) {
                favorites = favorites.filter(id => id !== songId);
                button.classList.remove("active");
            } else {
                favorites.push(songId);
                button.classList.add("active");
            }
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    
        function addToPlaylist(songId, songName) {
            if (!myPlaylist.some(song => song.id === songId)) {
                myPlaylist.push({ id: songId, name: songName });
                updatePlaylist();
                localStorage.setItem("playlist", JSON.stringify(myPlaylist));
            }
        }
    
        function updatePlaylist() {
            playlist.innerHTML = "";
            myPlaylist.forEach(song => {
                const li = document.createElement("li");
                li.textContent = song.name;
                playlist.appendChild(li);
            });
        }
    
        songList.addEventListener("click", (e) => {
            if (e.target.classList.contains("fav-btn")) {
                const songItem = e.target.parentElement;
                const songId = songItem.getAttribute("data-id");
                toggleFavorite(songId, e.target);
            } else if (e.target.classList.contains("add-btn")) {
                const songItem = e.target.parentElement;
                const songId = songItem.getAttribute("data-id");
                const songName = songItem.textContent.trim();
                addToPlaylist(songId, songName);
            }
        });
    
        updatePlaylist();
    });
    
    let currentAudio = null;
    
    function playsong(card) {
        const audio = card.querySelector("audio");
    
        // Stop the currently playing song if it's not the same song clicked
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
    
        // Play or pause the clicked song
        if (audio.paused) {
            audio.play();
            currentAudio = audio;
        } else {
            audio.pause(); // Pause if the song is already playing
            currentAudio = null; // Reset currentAudio when paused
        }
    }
    