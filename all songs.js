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

    const playlistType = document.body.getAttribute("data-playlist");

    const playlists = {
        "90s": [
        { title: 'My Heart Will Go On', artist: 'Celine Dion', src: 'songs/Titanic • My Heart Will Go On • Celine Dion [F2RnxZnubCM].mp3', cover: 'playlist/ik.png' },
        { title: 'I Want It That Way', artist: 'Backstreet Boys', src: 'Backstreet Boys - I Want It That Way (Official HD Video) [4fndeDfaWCg].mp3', cover: 'playlist/ik.png' },
        { title: 'Pehla Nasha', artist: '', src: 'songs/Pehla Nasha Pehla Khumar Jo Jeeta Wohi Sikandar HD [zI2HJONbT5A].mp3', cover: 'playlist/ik.png' },
        { title: 'Tum Pass Aaye', artist: '', src: 'songs/Koi Mil Gaya - Full Video_Kuch Kuch Hota Hai _Shah Rukh Khan,Kajol,Rani Mukerji [Jzd4bma3QNo].mp3', cover: 'playlist/ik.png' },
        { title: 'Koi Mil Gaya', artist: '', src: 'songs/Koi Mil Gaya - Full Video_Kuch Kuch Hota Hai _Shah Rukh Khan,Kajol,Rani Mukerji [Jzd4bma3QNo].mp3', cover: 'playlist/ik.png' },
         {title: 'Tum Paas Aaye', artist: 'Alka Yagnik', src: 'songs/90s/tum.mp3', cover: 'covers/90s2.png' },
        ],
        "energy": [
            { title: 'Shape of You x Naina', artist: 'Ed Sheeran & Diljit Dosanjh', src: 'songs/Ed Sheeran & Diljit Dosanjh - Shape of You x Naina (Live in Birmingham 2024) [k0Ka-deab1s].mp3', cover: 'playlist/ik.png' },
            { title: "DÁKITI ", artist: 'BAD BUNNY x JHAY CORTEZ', src: "songs/BAD BUNNY x JHAY CORTEZ - DÁKITI (Video Oficial) [TmKh7lAwnBI].mp3", cover: 'playlist/ik.png' },
            { title: 'BIRDS OF A FEATHER ', artist: ' Billie Eilish', src: 'songs/Billie Eilish - BIRDS OF A FEATHER (Official Music Video) [V9PVRfjEBTI].mp3', cover: 'playlist/ik.png' },
            { title: 'Espresso ', artist: 'Sabrina Carpenter', src: 'songs/Sabrina Carpenter - Espresso (Official Video) [eVli-tstM5E].mp3', cover: 'playlist/ik.png' },
      ],
      "happy": [
        { title: 'Good As Hell', artist: 'lizzo', src: 'songs/Lizzo - Good As Hell (Video) [SmbmeOgWsqE].mp3', cover: 'playlist/ik.png' },
        { title: 'Firework', artist: 'Katy Perry', src: 'songs/Katy Perry - Firework (Official Music Video) [QGJuMBdaqIw].mp3', cover: 'playlist/ik.png' },
        { title: 'Party in the USA', artist: ' Miley Cyrus', src: 'songs/Miley Cyrus - Party In The U.S.A. (Official Video) [M11SvDtPBhA].mp3', cover: 'playlist/ik.png' },
        { title: 'Sugar', artist: ' Maroon 5', src: 'songs/Maroon 5 - Sugar (Official Music Video) [09R8_2nJtjg].mp3', cover: 'playlist/ik.png' },
              ],
     "love": [
        { title: 'Butterflies', artist: 'Max Schneider', src: 'songs/MAX & Ali Gatie - Butterflies (Official Music Video) [7Lna4Hu4-AQ].mp3', cover: 'playlist/ik.png' },
        { title: 'Kallzam ek zalli', artist: '7 notes band', src: 'songs/Kallzam Ek Zalim _ Konkani Love Song 2021 _ The 7 Notes Production [hBwfpkus_u4].mp3', cover: 'playlist/ik.png' },
        { title: 'Saajna', artist: 'mitraz', src: 'songs/MITRAZ - Saajna (Official Video) [mYBqt29G9cA].mp3', cover: 'playlist/ik.png' },
        { title: 'Perfect', artist: 'Ed Sheeran', src: 'songs/Ed Sheeran & Diljit Dosanjh - Shape of You x Naina (Live in Birmingham 2024) [k0Ka-deab1s].mp3', cover: 'playlist/ik.png' },
       ],
       "party": [
        { title: 'Gasolina', artist: 'Daddy Yankee', src: 'songs/Daddy Yankee - Gasolina (Video Oficial) [CCF1_jI8Prk].mp3', cover: 'playlist/ik.png' },
        { title: "We Found Love", artist: 'Rihanna ft. Calvin Harris', src: "songs/Rihanna - We Found Love ft. Calvin Harris [tg00YEETFzg].mp3", cover: 'playlist/ik.png' },
        { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', src: 'songs/Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars [OPf0YbXqDm0].mp3', cover: 'playlist/ik.png' },
        { title: 'Dákiti', artist: 'Bad Bunny & Jhay Cortez', src: 'songs/BAD BUNNY x JHAY CORTEZ - DÁKITI (Video Oficial) [TmKh7lAwnBI].mp3', cover: 'playlist/ik.png' },
     ],
     "road": [
        { title: 'Take Me Home, Country Roads', artist: 'John Denver', src: 'songs/John Denver - Take Me Home, Country Roads (Official Audio) [1vrEljMfXYo].mp3', cover: 'playlist/ik.png' },
        { title: "Summer of 69", artist: 'Brian addams', src: "songs/Bryan Adams - Summer Of '69 (Official Music Video) [eFjjO_lhf9c].mp3", cover: 'playlist/ik.png' },
        { title: 'Night changes', artist: ' one direction', src: 'songs/One Direction - Night Changes [syFZfO_wfMQ].mp3', cover: 'playlist/ik.png' },
        { title: 'Hotel California', artist: 'Eagles', src: 'songs/Eagles - Hotel California (Live 1977) (Official Video) [HD] [09839DpTctU].mp3', cover: 'playlist/ik.png' },
     ],
     "sad": [
        { title: 'The Night We Met', artist: 'Lord Huron', src: 'songs/Lord Huron - The Night We Met (Official Audio) [KtlgYxa6BMU].mp3', cover: 'playlist/ik.png' },
        { title: "When The Partys Over", artist: 'Billie Eillish', src: "songs/Billie Eilish - when the party's over (Official Music Video) [pbMwTqkKSps].mp3", cover: 'playlist/ik.png' },
        { title: 'Driver License', artist: ' Olivia Rodrigo', src: 'songs/Olivia Rodrigo - drivers license (Official Video) [ZmDBbnmKpqQ].mp3', cover: 'playlist/ik.png' },
        { title: 'Someone like you', artist: 'Adele', src: 'songs/Adele - Someone Like You (Official Music Video) [hLQl3WQQoQ0].mp3', cover: 'playlist/ik.png' },
     ],
     "sleep": [
        { title: 'Night Changes', artist: 'One Direction', src: 'songs/One Direction - Night Changes [syFZfO_wfMQ].mp3', cover: 'playlist/ik.png' },
        { title: "Can I Call You Tonight?", artist: 'Dayglow', src: "songs/Dayglow - Can I Call You Tonight_ (Official Video) [hh1WeQxfCX0].mp3", cover: 'playlist/ik.png' },
        { title: 'late Night Nostalgia', artist: ' one direction', src: 'songs/Late Night Nostalgia 🕹️ [Lofi Fruits Release] lofi mix [BLmVzm3Y44Y].mp3', cover: 'playlist/ik.png' },
     ]
    };

    const songs = playlists[playlistType] || [];

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
