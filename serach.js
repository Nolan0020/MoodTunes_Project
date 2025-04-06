// Sample song list – You can replace this with your real data
const allSongs = [
    { title: "Bella", mood: "romantic", artist: "Bella Artist", src: "Bella.mp3", cover: "playlist/bel.jpg" },
    { title: "CHAND", mood: "sad", artist: "Krrish Rao", src: "CHAND.mp3", cover: "playlist/cha.jpg" },
    { title: "Knife Brows", mood: "energetic", artist: "Knife Brows Band", src: "Knife Brows.mp3", cover: "playlist/dhanda.jpg" },
    { title: "Paro", mood: "romantic", artist: "Aditya Rikhari", src: "songs/Aditya Rikhari - Paaro.mp3", cover: "playlist/par.jpg" },
    { title: "Husn", mood: "calm", artist: "Anuv Jain", src: "songs/Anuv Jain - HUSN.mp3", cover: "playlist/husun.jpg" },
    { title: "Finding Her", mood: "dreamy", artist: "Kushagar", src: "songs/Finding Her.mp3", cover: "playlist/find.jpg" },
    { title: "Anxiety", mood: "intense", artist: "Doechii", src: "songs/Doechii - Anxiety.mp3", cover: "playlist/Anx.jpg" },
    { title: "Halka Halka", mood: "romantic", artist: "Sunidhi Chauhan", src: "songs/song1.mp3", cover: "playlist/img1.jpg" },
    { title: "Mahahetvali", mood: "energetic", artist: "Aditya Gadhvi", src: "songs/song2.mp3", cover: "playlist/img2.jpg" },
    { title: "Malang Sajna", mood: "romantic", artist: "Sachet Tandon", src: "songs/song3.mp3", cover: "playlist/img3.jpg" },
    { title: "Tum Prem Ho", mood: "calm", artist: "Mohit Lalwani", src: "songs/song4.mp3", cover: "playlist/img4.jpg" },
    { title: 'Murder', mood:'roadtrip', artist: 'Real Boss', src: 'songs/Murder (Official Video) Real Boss _ New Punjabi Songs 2022 _ Latest Punjabi Songs 2022 _ [Y2lWEVyO-qE].mp3', cover: 'playlist/murder.jpeg' },
    { title: 'Tension',  mood:'roadtrip', artist: 'Diljit', src: 'songs/Diljit Dosanjh_ Tension (Official Music Video) Advisory [hNgI9E_-v24].mp3', cover: 'playlist/tension.jpeg'},
    { title: 'Birds of A Feather',mood:'energetic', artist: 'Billie Eilish', src: 'songs/Billie Eilish - BIRDS OF A FEATHER (Official Music Video) [V9PVRfjEBTI].mp3', cover: 'playlist/birds.jpeg' },
    { title: 'Kaley Sheshe',mood:'roadtrip', artist: ' Addy Nagar', src: 'songs/Kaley Sheshe – Addy Nagar _ Official Music Video _ @AddyNagar [F_Kflq6ZFp0].mp3', cover: 'playlist/k.jpeg' },
    { title: 'Die With A Smile', mood:'roadtrip', artist: 'Lady Gaga, Bruno Mars', src: 'songs/Lady Gaga, Bruno Mars - Die With A Smile (Official Music Video) [kPa7bsKwL-c].mp3', cover: 'playlist/smile.jpeg'},
    { title: 'We Found Love',mood:'party', artist: 'Rihanna- ft. Calvin Harris ', src: 'songs/Rihanna - We Found Love ft. Calvin Harris [tg00YEETFzg].mp3', cover: 'playlist/found.jpeg'},
    { title: 'APT', mood:'energetic',artist: 'ROSÉ & Bruno Mars', src: 'songs/ROSÉ & Bruno Mars - APT. (Official Music Video) [ekr2nIex040].mp3', cover: 'playlist/apt.jpeg'},
    { title: 'Uptown Funk', mood:'party',  artist: 'Mark Ronson-Bruno Mars', src: 'songs/Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars [OPf0YbXqDm0].mp3', cover: 'playlist/up.jpeg'},
    { title: 'Gasolina', mood:'party', artist: 'Daddy Yankee', src: 'songs/Daddy Yankee - Gasolina (Video Oficial) [CCF1_jI8Prk].mp3', cover: 'playlist/ik.png' },
    { title: 'Dákiti', mood:'party', artist: 'Bad Bunny & Jhay Cortez', src: 'songs/BAD BUNNY x JHAY CORTEZ - DÁKITI (Video Oficial) [TmKh7lAwnBI].mp3', cover: 'playlist/ik.png' },
    { title: 'Butterflies', mood: "romantic",artist: 'Max Schneider', src: 'songs/MAX & Ali Gatie - Butterflies (Official Music Video) [7Lna4Hu4-AQ].mp3', cover: 'playlist/ik.png' },
    { title: 'Kallzam ek zalli',mood: "romantic", artist: '7 notes band', src: 'songs/Kallzam Ek Zalim _ Konkani Love Song 2021 _ The 7 Notes Production [hBwfpkus_u4].mp3', cover: 'playlist/ik.png' },
    { title: 'Saajna',mood: "romantic", artist: 'mitraz', src: 'songs/MITRAZ - Saajna (Official Video) [mYBqt29G9cA].mp3', cover: 'playlist/ik.png' },
    { title: 'Perfect',mood: "romantic", artist: 'Ed Sheeran', src: 'songs/Ed Sheeran & Diljit Dosanjh - Shape of You x Naina (Live in Birmingham 2024) [k0Ka-deab1s].mp3', cover: 'playlist/ik.png' },
    { title: 'Take Me Home, Country Roads', mood:'roadtrip',artist: 'John Denver', src: 'songs/John Denver - Take Me Home, Country Roads (Official Audio) [1vrEljMfXYo].mp3', cover: 'playlist/ik.png' },
    { title: "Summer of 69",mood:'roadtrip', artist: 'Brian addams', src: "songs/Bryan Adams - Summer Of '69 (Official Music Video) [eFjjO_lhf9c].mp3", cover: 'playlist/ik.png' },
    { title: 'Night changes', mood:'roadtrip',artist: ' one direction', src: 'songs/One Direction - Night Changes [syFZfO_wfMQ].mp3', cover: 'playlist/ik.png' },
    { title: 'Hotel California', mood:'roadtrip',artist: 'Eagles', src: 'songs/Eagles - Hotel California (Live 1977) (Official Video) [HD] [09839DpTctU].mp3', cover: 'playlist/ik.png' },
    { title: 'My Heart Will Go On',mood:'90s', artist: 'Celine Dion', src: 'songs/Titanic • My Heart Will Go On • Celine Dion [F2RnxZnubCM].mp3', cover: 'playlist/ik.png' },
    { title: 'I Want It That Way',mood:'90s',  artist: 'Backstreet Boys', src: 'C:\Users\Ebony\Downloads\MOODTUNE\eb\NEW\try mood\songs\Backstreet Boys - I Want It That Way (Official HD Video) [4fndeDfaWCg].mp3', cover: 'playlist/ik.png' },
    { title: 'Pehla Nasha',mood:'90s', artist: '', src: 'songs/Pehla Nasha Pehla Khumar Jo Jeeta Wohi Sikandar HD [zI2HJONbT5A].mp3', cover: 'playlist/ik.png' },
    { title: 'Tum Pass Aaye',mood:'90s', artist: '', src: 'songs/Koi Mil Gaya - Full Video_Kuch Kuch Hota Hai _Shah Rukh Khan,Kajol,Rani Mukerji [Jzd4bma3QNo].mp3', cover: 'playlist/ik.png' },
    { title: 'Koi Mil Gaya',mood:'90s', artist: '', src: 'songs/Koi Mil Gaya - Full Video_Kuch Kuch Hota Hai _Shah Rukh Khan,Kajol,Rani Mukerji [Jzd4bma3QNo].mp3', cover: 'playlist/ik.png' },
    { title: 'Shape of You x Naina',mood:'energetic', artist: 'Ed Sheeran & Diljit Dosanjh', src: 'songs/Ed Sheeran & Diljit Dosanjh - Shape of You x Naina (Live in Birmingham 2024) [k0Ka-deab1s].mp3', cover: 'playlist/ik.png' },
    { title: 'Espresso ',mood:'energetic', artist: 'Sabrina Carpenter', src: 'songs/Sabrina Carpenter - Espresso (Official Video) [eVli-tstM5E].mp3', cover: 'playlist/ik.png' },
    { title: 'Good As Hell',mood:'happy',artist: 'lizzo', src: 'songs/Lizzo - Good As Hell (Video) [SmbmeOgWsqE].mp3', cover: 'playlist/ik.png' },
    { title: 'Firework',mood:'happy', artist: 'Katy Perry', src: 'songs/Katy Perry - Firework (Official Music Video) [QGJuMBdaqIw].mp3', cover: 'playlist/ik.png' },
    { title: 'Party in the USA',mood:'happy', artist: ' Miley Cyrus', src: 'songs/Miley Cyrus - Party In The U.S.A. (Official Video) [M11SvDtPBhA].mp3', cover: 'playlist/ik.png' },
    { title: 'Sugar',mood:'happy', artist: ' Maroon 5', src: 'songs/Maroon 5 - Sugar (Official Music Video) [09R8_2nJtjg].mp3', cover: 'playlist/ik.png' },
    { title: 'The Night We Met',mood: "sad", artist: 'Lord Huron', src: 'songs/Lord Huron - The Night We Met (Official Audio) [KtlgYxa6BMU].mp3', cover: 'playlist/ik.png' },
    { title: "When The Partys Over",mood: "sad", artist: 'Billie Eillish', src: "songs/Billie Eilish - when the party's over (Official Music Video) [pbMwTqkKSps].mp3", cover: 'playlist/ik.png' },
    { title: 'Driver License',mood: "sad", artist: ' Olivia Rodrigo', src: 'songs/Olivia Rodrigo - drivers license (Official Video) [ZmDBbnmKpqQ].mp3', cover: 'playlist/ik.png' },
    { title: 'Someone like you',mood: "sad", artist: 'Adele', src: 'songs/Adele - Someone Like You (Official Music Video) [hLQl3WQQoQ0].mp3', cover: 'playlist/ik.png' },
    { title: 'Night Changes',mood: "dreamy", artist: 'One Direction', src: 'songs/One Direction - Night Changes [syFZfO_wfMQ].mp3', cover: 'playlist/ik.png' },
    { title: "Can I Call You Tonight?",mood: "dreamy",artist: 'Dayglow', src: "songs/Dayglow - Can I Call You Tonight_ (Official Video) [hh1WeQxfCX0].mp3", cover: 'playlist/ik.png' },
    { title: 'late Night Nostalgia',mood: "dreamy", artist: ' one direction', src: 'songs/Late Night Nostalgia 🕹 [Lofi Fruits Release] lofi mix [BLmVzm3Y44Y].mp3', cover: 'playlist/ik.png' },
];

function searchSongs(query) {
    query = query.toLowerCase();
    return allSongs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.mood.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) // Include artist name in search
    );
}

// Add the setupSongPlayListeners function here
function setupSongPlayListeners() {
    const songItems = document.querySelectorAll('.song-item');

    songItems.forEach(item => {
        item.addEventListener('click', function() {
            // Assuming your song objects now have an 'id' property
            const songId = this.dataset.songId;
            const selectedSong = allSongs.find(song => song.title === this.querySelector('h3').textContent); // Fallback to title if no ID

            if (selectedSong) {
                playSong(selectedSong);
            } else {
                console.error("Song not found:", songId || this.querySelector('h3').textContent);
            }
        });
    });
}

// Add the playSong function here
function playSong(song) {
    console.log("Playing song:", song.title, song.src, song.cover, song.artist);

    const audioPlayer = document.getElementById('audioPlayer');
    const songCover = document.getElementById('song-cover');
    const songTitle = document.getElementById('song-title');
    const artistName = document.getElementById('artist-name');

    if (audioPlayer) {
        // Stop the current song if it's playing
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            // Optionally, you might want to reset the currentTime to 0 as well:
            // audioPlayer.currentTime = 0;
        }

        audioPlayer.src = song.src;
        audioPlayer.play().catch(error => {
            console.error("Autoplay prevented:", error);
            // If autoplay is prevented, you might want to update the play/pause button
            // to show the "play" state.
        });
    } else {
        console.error("Audio player element with ID 'audioPlayer' not found.");
    }

    if (songCover) {
        songCover.src = song.cover;
        songCover.alt = `${song.title} Cover`;
    } else {
        console.error("Element with ID 'song-cover' not found in the player.");
    }

    if (songTitle) {
        songTitle.textContent = song.title;
    } else {
        console.error("Element with ID 'song-title' not found in the player.");
    }

    if (artistName) {
        artistName.textContent = song.artist;
    } else {
        console.error("Element with ID 'artist-name' not found in the player.");
    }

    // You might also want to update the progress bar and time display here
    // if your existing logic doesn't handle it automatically on source change.
}

function displaySearchResults(results) {
    const resultsContainer = document.getElementById('searchResults'); // Assuming you have an element with this ID
    resultsContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(song => {
            const songElement = document.createElement('div');
            songElement.classList.add('song-item'); // Add the class

            // If you add IDs to your song objects, you can use this:
            // songElement.dataset.songId = song.id;

            songElement.innerHTML = `
                <h3>${song.title}</h3>
                <p>Artist: ${song.artist}</p>
                `;
            resultsContainer.appendChild(songElement);
        });
        setupSongPlayListeners(); // Call this after displaying results
    } else {
        resultsContainer.innerHTML = '<p>No songs found.</p>';
    }
}

// Example of your search input event listener (you might already have this):
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const query = this.value;
        const searchResults = searchSongs(query);
        displaySearchResults(searchResults);
    });
}