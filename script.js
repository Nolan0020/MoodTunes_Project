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
        { title: 'Ticket to Love', artist: 'Bella', src: 'Bella.mp3', cover: 'Ticket to love.jpg' },
        { title: 'Chand', artist: 'Krrish Roa', src: 'CHAND.mp3', cover: 'chand.jpg' },
        { title: 'Knife Brows', artist: 'Knife Brows', src: 'Knife Brows.mp3', cover: 'dhanda.jpg' },
        { title: 'Murder', artist: 'Real Boss', src: 'songs/Murder (Official Video) Real Boss _ New Punjabi Songs 2022 _ Latest Punjabi Songs 2022 _ [Y2lWEVyO-qE].mp3', cover: 'playlist/murder.jpeg' },
        { title: 'Tension', artist: 'Diljit', src: 'songs/Diljit Dosanjh_ Tension (Official Music Video) Advisory [hNgI9E_-v24].mp3', cover: 'playlist/tension.jpeg' },
        { title: 'Birds of A Feather', artist: 'Billie Eilish', src: 'songs/Billie Eilish - BIRDS OF A FEATHER (Official Music Video) [V9PVRfjEBTI].mp3', cover: 'playlist/birds.jpeg' },
        { title: 'Kaley Sheshe', artist: ' Addy Nagar', src: 'songs/Kaley Sheshe – Addy Nagar _ Official Music Video _ @AddyNagar [F_Kflq6ZFp0].mp3', cover: 'playlist/k.jpeg' },
        { title: 'Die With A Smile', artist: 'Lady Gaga, Bruno Mars', src: 'songs/Lady Gaga, Bruno Mars - Die With A Smile (Official Music Video) [kPa7bsKwL-c].mp3', cover: 'playlist/smile.jpeg' },
        { title: 'We Found Love', artist: 'Rihanna- ft. Calvin Harris ', src: 'songs/Rihanna - We Found Love ft. Calvin Harris [tg00YEETFzg].mp3', cover: 'playlist/found.jpeg' },
        { title: 'APT', artist: 'ROSÉ & Bruno Mars', src: 'songs/ROSÉ & Bruno Mars - APT. (Official Music Video) [ekr2nIex040].mp3', cover: 'playlist/apt.jpeg' },
        { title: 'Uptown Funk', artist: 'Mark Ronson-Bruno Mars', src: 'songs/Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars [OPf0YbXqDm0].mp3', cover: 'playlist/up.jpeg' },
    ];

    function loadSong(index) {
        audio.src = songs[index].src;
        songTitle.textContent = songs[index].title;
        artistName.textContent = songs[index].artist;
        songCover.src = songs[index].cover;
        audio.load(); // Load the audio file
    }

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
    
    
    function playSong(songData) {
        if (songData) {
            audio.src = songData.src;
            songTitle.textContent = songData.title;
            artistName.textContent = songData.artist;
            songCover.src = songData.cover;
            audio.load();
        }
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = '⏸';
        saveToHistory(songs[currentSongIndex]); // Save to history when the song starts playing
    }
    
    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = '▶';
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
    
    function saveSongToPlaylist(song, playlistName) {
        let playlists = JSON.parse(localStorage.getItem('moodTunesPlaylists')) || {};
        if (!playlists[playlistName]) {
            playlists[playlistName] = { name: playlistName, songs: [] };
        }
        playlists[playlistName].songs.push(song);
        localStorage.setItem('moodTunesPlaylists', JSON.stringify(playlists));
        alert(`"${song.title}" added to playlist "${playlistName}"`);
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
              
              // Add to Playlist Button
              const addToPlaylistBtn = document.createElement('button');
              addToPlaylistBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
              addToPlaylistBtn.style.border = 'none';
              addToPlaylistBtn.style.background = 'transparent';
              addToPlaylistBtn.style.cursor = 'pointer';
              addToPlaylistBtn.style.marginLeft = '10px';
              addToPlaylistBtn.style.fontSize = '18px';
      
              addToPlaylistBtn.addEventListener('click', (event) => {
                  event.stopPropagation();
                  const playlistName = prompt('Enter playlist name:');
                  if (playlistName) {
                      saveSongToPlaylist(song, playlistName);
                  }
              });
      
              li.appendChild(addToPlaylistBtn);
              songList.appendChild(li);
          });
    
          audio.autoplay = true;

    // Autoplay the next song when the current song ends
    audio.addEventListener('ended', nextSong);  
    
    loadSong(currentSongIndex); // Load the first song initially.
    
    // Error handling for audio loading
    audio.addEventListener('error', () => {
        console.error('Error loading audio:', audio.src);
        alert('Failed to load audio file.');
    });

    function playsong(card) {
        const songSrc = card.dataset.songSrc;
        const songTitleText = card.dataset.songTitle;
        const songArtistText = card.dataset.songArtist;
        const songCoverSrc = card.querySelector('img') ? card.querySelector('img').src : 'default-song-cover.jpg';

        if (songSrc) {
            audio.src = songSrc;
            songTitle.textContent = songTitleText || 'Unknown Title';
            artistName.textContent = songArtistText || 'Unknown Artist';
            songCover.src = songCoverSrc;
            audio.load();
            audio.play();
            isPlaying = true;
            playPauseBtn.textContent = '⏸';
            saveToHistory({ title: songTitleText, artist: songArtistText, src: songSrc, cover: songCoverSrc });
        } else {
            alert('Song source not available.');
        }
    }

    // Attach the playsong function to all cards in the trending songs section
    document.querySelectorAll('.card-container .card').forEach(card => {
        card.addEventListener('click', () => playsong(card));
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
    
    function performSearch() {
        const query = document.getElementById('search-bar').value.trim().toLowerCase();
        const resultsList = document.getElementById('search-results-list');
        const searchResultsContainer = document.getElementById('search-results');
        resultsList.innerHTML = ''; // Clear previous results
    
        if (!query) {
            searchResultsContainer.style.display = 'none'; // Hide results if query is empty
            return;
        }
    
        const results = searchSongs(query); // Calls the searchSongs function from library.js
    
        if (results.length === 0) {
            resultsList.innerHTML = '<li>No results found.</li>';
        } else {
            results.forEach(song => {
                const li = document.createElement('li');
                li.textContent = `${song.title} - ${song.artist || 'Unknown Artist'} (${song.mood})`;
                li.style.cursor = 'pointer';
                li.dataset.songTitle = song.title;
                li.dataset.songArtist = song.artist || 'Unknown Artist';
                li.dataset.songSrc = song.src || '';
                li.dataset.songCover = song.cover || 'default-song-cover.jpg';
    
                li.addEventListener('click', () => {
                    const songData = {
                        title: li.dataset.songTitle,
                        artist: li.dataset.songArtist,
                        src: li.dataset.songSrc,
                        cover: li.dataset.songCover
                    };
                    playSong(songData); // Use the playSong function to play the selected song
                    searchResultsContainer.style.display = 'none'; // Hide results after selection
                });
    
                resultsList.appendChild(li);
            });
        }
    
        searchResultsContainer.style.display = 'block'; // Show results
    }
    
    // Ensure this function is being called when the search button is clicked or input changes
    document.getElementById('search-btn').addEventListener('click', performSearch);
    document.getElementById('search-bar').addEventListener('input', performSearch);
