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
        { title: 'Gasolina', artist: 'Daddy Yankee', src: 'songs/Daddy Yankee - Gasolina (Video Oficial) [CCF1_jI8Prk].mp3', cover: 'playlist/ik.png' },
        { title: "We Found Love", artist: 'Rihanna ft. Calvin Harris', src: "songs/Rihanna - We Found Love ft. Calvin Harris [tg00YEETFzg].mp3", cover: 'playlist/ik.png' },
        { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', src: 'songs/Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars [OPf0YbXqDm0].mp3', cover: 'playlist/ik.png' },
        { title: 'Dákiti', artist: 'Bad Bunny & Jhay Cortez', src: 'songs/BAD BUNNY x JHAY CORTEZ - DÁKITI (Video Oficial) [TmKh7lAwnBI].mp3', cover: 'playlist/ik.png' },
        
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
    