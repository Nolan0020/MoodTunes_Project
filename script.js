window.onload = function() {
    console.log("Script loaded");

    // Existing music player elements (for the footer player)
    const songTitleDisplay = document.getElementById('song-title');
    const artistNameDisplay = document.getElementById('artist-name');
    const songCoverDisplay = document.getElementById('song-cover');
    const playPauseBtnFooter = document.getElementById('play-pause-btn');
    const prevBtnFooter = document.getElementById('prev-btn');
    const nextBtnFooter = document.getElementById('next-btn');
    const progressFooter = document.getElementById('progress');
    const audioFooter = new Audio();
    let currentSongFooter = null;
    let isPlayingFooter = false;

    // Function to update the footer player with song details
    function updateFooterPlayer(title, artist, cover, src) {
        songTitleDisplay.textContent = title;
        artistNameDisplay.textContent = artist;
        songCoverDisplay.src = cover || 'default-song-cover.jpg'; // Use default if no cover
        audioFooter.src = src;
        audioFooter.load();
        currentSongFooter = { title: title, artist: artist, src: src, cover: cover };
        if (isPlayingFooter) {
            audioFooter.play();
        }
    }

    // Play/pause functionality for the footer player
    playPauseBtnFooter.addEventListener('click', () => {
        if (currentSongFooter) {
            if (isPlayingFooter) {
                audioFooter.pause();
                playPauseBtnFooter.textContent = '▶️';
            } else {
                audioFooter.play();
                playPauseBtnFooter.textContent = '⏸️';
            }
            isPlayingFooter = !isPlayingFooter;
        }
    });

    // ... (Add event listeners for prevBtnFooter and nextBtnFooter if you want them to control the songs from the cards)

    // Function to show the playlist name popup and handle adding to playlist
    function handleAddToPlaylistClick(event) {
        event.stopPropagation(); // Prevent the card's onclick from immediately playing
        const card = this.closest('.card');
        if (card) {
            const song = {
                title: card.dataset.songTitle,
                artist: card.dataset.songArtist,
                src: card.dataset.songSrc,
                cover: card.querySelector('.card-img')?.src // Try to get the cover image
            };
            const playlistName = prompt("Name this playlist:");
            if (playlistName) {
                saveSongToPlaylist(song, playlistName);
            }
        }
    }

    function saveSongToPlaylist(song, playlistName) {
        let playlists = getPlaylists();
        if (!playlists) {
            playlists = {};
        }
        if (!playlists[playlistName]) {
            playlists[playlistName] = {
                name: playlistName,
                songs: []
            };
        }
        playlists[playlistName].songs.push(song);
        savePlaylists(playlists);
        alert(`"${song.title}" added to playlist "${playlistName}"`);
    }

    function getPlaylists() {
        const storedPlaylists = localStorage.getItem('moodTunesPlaylists');
        return storedPlaylists ? JSON.parse(storedPlaylists) : null;
    }

    function savePlaylists(playlists) {
        localStorage.setItem('moodTunesPlaylists', JSON.stringify(playlists));
    }

    // Add event listeners to all "Add to Playlist" icons
    const addToPlaylistIcons = document.querySelectorAll('.card .add-to-playlist-btn');
    addToPlaylistIcons.forEach(icon => {
        icon.addEventListener('click', handleAddToPlaylistClick);
    });

    // Modify the playsong function to update the footer player
    window.playsong = (card) => {
        const song = {
            title: card.dataset.songTitle,
            artist: card.dataset.songArtist,
            src: card.dataset.songSrc,
            cover: card.querySelector('.card-img')?.src
        };
        updateFooterPlayer(song.title, song.artist, song.cover, song.src);
        isPlayingFooter = true;
        playPauseBtnFooter.textContent = '⏸️';
    };

    // --- REMOVING THE SEPARATE SONG LIST GENERATION ---
    // The logic for generating the song list at the bottom is removed here.
    // If you want to keep it, you'll need to decide how it interacts with the rest of the page.

    // --- RETAINING THE HISTORY FUNCTIONALITY (if needed) ---
    function saveToHistory(song) {
        let history = JSON.parse(localStorage.getItem("history")) || [];
        if (history.length === 0 || history[history.length - 1].title !== song.title) {
            history.push(song);
        }
        if (history.length > 10) {
            history = history.slice(history.length - 10);
        }
        localStorage.setItem("history", JSON.stringify(history));
    }

    document.addEventListener("DOMContentLoaded", () => {
        const songCards = document.querySelectorAll('.card[data-song-title]');
        songCards.forEach(card => {
            card.addEventListener('click', function() {
                const song = {
                    title: this.dataset.songTitle,
                    artist: this.dataset.songArtist,
                    src: this.dataset.songSrc,
                    cover: this.querySelector('.card-img')?.src
                };
                saveToHistory(song);
            });
        });
    });

    // --- RETAINING LIKED SONGS FUNCTIONALITY (needs integration with the icons) ---
    const likeButtons = document.querySelectorAll('.card .like-song-btn');
    likeButtons.forEach((button, index) => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const card = this.closest('.card');
            if (card) {
                const song = {
                    title: card.dataset.songTitle,
                    artist: card.dataset.songArtist,
                    src: card.dataset.songSrc,
                    cover: card.querySelector('.card-img')?.src
                };
                const songKey = `liked_${song.src}`; // Use a unique identifier for the song
                let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

                if (localStorage.getItem(songKey)) {
                    this.innerHTML = '<i class="fa-regular fa-heart"></i>'; // Unlike
                    localStorage.removeItem(songKey);
                    likedSongs = likedSongs.filter(s => s.src !== song.src);
                } else {
                    this.innerHTML = '<i class="fa-solid fa-heart"></i>'; // Like
                    localStorage.setItem(songKey, true);
                    likedSongs.push(song);
                }
                localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
            }
        });
        // Initial state of like buttons (check if song is liked on load)
        const card = button.closest('.card');
        if (card) {
            const songSrc = card.dataset.songSrc;
            const songKey = `liked_${songSrc}`;
            if (localStorage.getItem(songKey)) {
                button.innerHTML = '<i class="fa-solid fa-heart"></i>';
            }
        }
    });
};