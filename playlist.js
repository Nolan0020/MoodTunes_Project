document.addEventListener('DOMContentLoaded', function() {
    const playlistList = document.getElementById('playlist-list');
    const currentPlaylistName = document.querySelector('.playlist-header h1');
    const playlistSongCount = document.getElementById('playlist-song-count');
    const playlistSongsList = document.getElementById('playlist-songs-list');
    const emptyPlaylistMessage = document.getElementById('empty-playlist-message');
    const createPlaylistBtn = document.getElementById('create-playlist-btn');
    const deletePlaylistBtn = document.getElementById('delete-playlist-btn');

    const player = document.querySelector('.player');
    const playerSongTitle = document.getElementById('player-song-title');
    const playerSongArtist = document.getElementById('player-song-artist');
    const playPauseBtnFooter = document.getElementById('play-pause-btn');
    const prevBtnFooter = document.getElementById('prev-btn');
    const nextBtnFooter = document.getElementById('next-btn');
    const audioPlayer = document.getElementById('audio-player');
    let currentPlayingSong = null;
    let isPlayingFooter = false;
    let playlistsData = {};
    let currentPlaylistId = null;
    let currentSongIndex = -1;

    function loadPlaylists() {
        const storedPlaylists = localStorage.getItem('moodTunesPlaylists');
        playlistsData = storedPlaylists ? JSON.parse(storedPlaylists) : {};
        renderPlaylistList();
        updateDeleteButtonVisibility();
    }

    function renderPlaylistList() {
        playlistList.innerHTML = '';
        for (const playlistName in playlistsData) {
            if (playlistsData.hasOwnProperty(playlistName)) {
                const listItem = document.createElement('li');
                listItem.textContent = playlistName;
                listItem.dataset.playlistId = playlistName;
                listItem.addEventListener('click', () => {
                    loadPlaylistSongs(playlistName);
                    document.querySelectorAll('#playlist-list li').forEach(li => li.classList.remove('active'));
                    listItem.classList.add('active');
                    currentPlaylistId = playlistName;
                    updateDeleteButtonVisibility();
                });
                playlistList.appendChild(listItem);
            }
        }
        if (Object.keys(playlistsData).length > 0 && !currentPlaylistId) {
            const firstPlaylistName = Object.keys(playlistsData)[0];
            loadPlaylistSongs(firstPlaylistName);
            const firstListItem = playlistList.querySelector(`[data-playlist-id="${firstPlaylistName}"]`);
            if (firstListItem) {
                firstListItem.classList.add('active');
                currentPlaylistId = firstPlaylistName;
                updateDeleteButtonVisibility();
            }
        } else if (Object.keys(playlistsData).length === 0) {
            clearPlaylistView();
            updateDeleteButtonVisibility();
        } else if (currentPlaylistId) {
            updateDeleteButtonVisibility();
        }
    }

    function loadPlaylistSongs(playlistId) {
        const playlist = playlistsData[playlistId];
        currentPlaylistName.textContent = playlist ? playlist.name : '';
        playlistSongCount.textContent = playlist && playlist.songs ? `${playlist.songs.length} songs` : '0 songs';
        playlistSongsList.innerHTML = '';
        emptyPlaylistMessage.style.display = 'none';
        currentSongIndex = -1;

        if (playlist && playlist.songs && playlist.songs.length > 0) {
            playlist.songs.forEach((song, index) => {
                const songItem = document.createElement('div');
                songItem.classList.add('song-item');
                songItem.dataset.songSrc = song.src;
                songItem.dataset.songTitle = song.title;
                songItem.dataset.songArtist = song.artist;
                songItem.dataset.songIndex = index;

                const songInfo = document.createElement('div');
                songInfo.classList.add('song-info');
                const titleHeading = document.createElement('h4');
                titleHeading.textContent = song.title;
                const artistParagraph = document.createElement('p');
                artistParagraph.textContent = song.artist;
                songInfo.appendChild(titleHeading);
                songInfo.appendChild(artistParagraph);

                songItem.appendChild(songInfo);
                playlistSongsList.appendChild(songItem);

                songItem.addEventListener('click', () => {
                    playSongFromList(song, index);
                });
            });
        } else {
            emptyPlaylistMessage.style.display = 'block';
        }
    }

    function playSongFromList(song, index) {
        currentPlayingSong = song;
        currentSongIndex = index;
        audioPlayer.src = song.src;
        audioPlayer.load();
        audioPlayer.play();
        isPlayingFooter = true;
        if (playPauseBtnFooter) {
            playPauseBtnFooter.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
        player.style.display = 'flex';
        playerSongTitle.textContent = song.title;
        playerSongArtist.textContent = song.artist;
        updateActiveSongInList(index);
    }

    function playNextSong() {
        if (currentPlaylistId && playlistsData[currentPlaylistId] && playlistsData[currentPlaylistId].songs) {
            const currentPlaylist = playlistsData[currentPlaylistId].songs;
            if (currentSongIndex < currentPlaylist.length - 1) {
                currentSongIndex++;
                const nextSong = currentPlaylist[currentSongIndex];
                playSongFromList(nextSong, currentSongIndex);
            } else {
                console.log("End of playlist");
                isPlayingFooter = false;
                if (playPauseBtnFooter) {
                    playPauseBtnFooter.innerHTML = '<i class="fa-solid fa-play"></i>';
                }
            }
        }
    }

    function playPreviousSong() {
        if (currentPlaylistId && playlistsData[currentPlaylistId] && playlistsData[currentPlaylistId].songs) {
            if (currentSongIndex > 0) {
                currentSongIndex--;
                const prevSong = playlistsData[currentPlaylistId].songs[currentSongIndex];
                playSongFromList(prevSong, currentSongIndex);
            } else {
                console.log("Beginning of playlist");
            }
        }
    }

    function updateActiveSongInList(index) {
        document.querySelectorAll('#playlist-songs-list .song-item').forEach(item => item.classList.remove('active'));
        const activeItem = document.querySelector(`#playlist-songs-list .song-item[data-song-index="${index}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    function clearPlaylistView() {
        currentPlaylistName.textContent = '';
        playlistSongCount.textContent = '0 songs';
        playlistSongsList.innerHTML = '';
        emptyPlaylistMessage.style.display = 'block';
        emptyPlaylistMessage.textContent = 'No playlist selected.';
        currentSongIndex = -1;
        updateDeleteButtonVisibility();
        player.style.display = 'none'; // Hide player when no playlist is selected
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        currentPlayingSong = null;
        if (playPauseBtnFooter) {
            playPauseBtnFooter.innerHTML = '<i class="fa-solid fa-play"></i>';
            isPlayingFooter = false;
        }
    }

    function deleteCurrentPlaylist() {
        if (currentPlaylistId) {
            const confirmDelete = confirm(`Are you sure you want to delete the playlist "${currentPlaylistId}"?`);
            if (confirmDelete) {
                delete playlistsData[currentPlaylistId];
                savePlaylists(playlistsData);
                currentPlaylistId = null;
                clearPlaylistView();
                renderPlaylistList();
            }
        } else {
            alert("No playlist selected to delete.");
        }
    }

    function updateDeleteButtonVisibility() {
        if (currentPlaylistId) {
            deletePlaylistBtn.style.display = 'inline-block';
        } else {
            deletePlaylistBtn.style.display = 'none';
        }
    }

    if (playPauseBtnFooter) {
        playPauseBtnFooter.addEventListener('click', () => {
            if (currentPlayingSong) {
                if (isPlayingFooter) {
                    audioPlayer.pause();
                    playPauseBtnFooter.innerHTML = '<i class="fa-solid fa-play"></i>';
                } else {
                    audioPlayer.play();
                    playPauseBtnFooter.innerHTML = '<i class="fa-solid fa-pause"></i>';
                }
                isPlayingFooter = !isPlayingFooter;
            }
        });
    }

    if (nextBtnFooter) {
        nextBtnFooter.addEventListener('click', playNextSong);
    }

    if (prevBtnFooter) {
        prevBtnFooter.addEventListener('click', playPreviousSong);
    }

    if (deletePlaylistBtn) {
        deletePlaylistBtn.addEventListener('click', deleteCurrentPlaylist);
    }

    audioPlayer.addEventListener('ended', playNextSong);

    player.style.display = 'none';
    loadPlaylists();

    window.savePlaylists = function(playlists) {
        localStorage.setItem('moodTunesPlaylists', JSON.stringify(playlists));
        loadPlaylists();
    };

    window.getPlaylists = function() {
        const storedPlaylists = localStorage.getItem('moodTunesPlaylists');
        return storedPlaylists ? JSON.parse(storedPlaylists) : {};
    };

    window.addSongToExistingPlaylist = function(song, playlistName) {
        let playlists = getPlaylists();
        if (playlists[playlistName]) {
            playlists[playlistName].songs.push(song);
            savePlaylists(playlists);
            alert(`"${song.title}" added to playlist "${playlistName}"`);
        } else {
            alert(`Playlist "${playlistName}" not found.`);
        }
    };
});