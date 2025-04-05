const recentSongsList = document.getElementById('recent-songs');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const songCover = document.getElementById('song-cover');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio();

const songs = [
    { title: 'Bella', artist: 'Artist 1', src: 'Bella.mp3', cover: 'Ticket to love.jpg' },
    { title: 'CHAND', artist: 'Artist 2', src: 'CHAND.mp3', cover: 'chand.jpg' },
    { title: 'Knife Brows', artist: 'Artist 3', src: 'Knife Brows.mp3', cover: 'dhanda.jpg' }
];

// Load Last Played Songs
let recentSongs = JSON.parse(localStorage.getItem('recentSongs')) || [];

// Function to Load Song
function loadSong(index) {
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    artistName.textContent = songs[index].artist;
    songCover.src = songs[index].cover;
    audio.load();

    // Update Recent Songs
    updateRecentSongs(songs[index]);
}

// Function to Play Song
function playSong() {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = '⏸️';
}

// Function to Pause Song
function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = '▶️';
}

// Function to Toggle Play/Pause
function playPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Function to Play Next Song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

// Function to Play Previous Song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

// Function to Update Recent Songs
function updateRecentSongs(song) {
    // Prevent duplicates
    recentSongs = recentSongs.filter(s => s.src !== song.src);
    recentSongs.unshift(song); // Add new song to the top

    // Keep max 5 recent songs
    if (recentSongs.length > 5) {
        recentSongs.pop();
    }

    // Save to Local Storage
    localStorage.setItem('recentSongs', JSON.stringify(recentSongs));

    // Display in Library Page
    renderRecentSongs();
}

// Function to Display Recent Songs
function renderRecentSongs() {
    recentSongsList.innerHTML = "";
    recentSongs.forEach(song => {
        let li = document.createElement("li");
        li.innerHTML = `<img src="${song.cover}" alt="${song.title}"> <p>${song.title} - ${song.artist}</p>`;
        li.onclick = () => loadSong(songs.findIndex(s => s.src === song.src));
        recentSongsList.appendChild(li);
    });
}

// Load first song
loadSong(currentSongIndex);
renderRecentSongs();

// Event Listeners
playPauseBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
