const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const progressContainer = document.getElementById('progress-container')
const music = document.querySelector('audio')
const progress = document.getElementById('progress')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document .getElementById('duration')

const songs = [
    
        {
            name: 'jacinto-1',
            displayName: 'Electric Chill Machine',
            artist:'Jacinto Design'
        },
        {
            name: 'jacinto-2',
            displayName:'Seven Nation Army (Remix)',
            artist: 'Jacinto Design'
        },
        {
            name: 'jacinto-3',
            displayName:'Goodnight, Disco Queen',
            artist: 'Jacinto Design'
        },
        {
            name: 'metric-1',
            displayName:'Front Row (Remix)',
            artist: 'Metric/Jacinto Design',
        }
        
]


let isPlaying = false


function playSong(){
    isPlaying = true
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.setAttribute('title','pause')
    music.play()
}


function pauseSong(){
    isPlaying = false
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title','play')
    music.pause()

}
function loadSong(song){
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src= `img/${song.name}.jpg`
}

let songIndex =  0


function prevSong(){
    songIndex--
    if (songIndex < 0){
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex])
    playSong()

}

function nextSong(){
    songIndex++
    if (songIndex> songs.length-1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

function updateProgressBar(e){
    if(isPlaying){
        const {duration,currentTime} = e.srcElement
        const progressPercent = (currentTime/duration)*100
        progress.style.width = `${progressPercent}%`
        const durationMinutes = Math.floor(duration/60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds <10){
            durationSeconds = `0${durationSeconds}`
        }
        if (durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        const currentMinutes = Math.floor(currentTime/60)
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds<10){
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`

    }
    
 

}
function setProgressBar(e){
    console.log(e);
    const width = this.clientWidth
    const clickX = e.offsetX
    const {duration} = music
    music.currentTime = (clickX/width)*duration

}


playBtn.addEventListener('click',() => {isPlaying? pauseSong(): playSong()})

prev.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)
music.addEventListener('ended',nextSong)

music.addEventListener('timeupdate',updateProgressBar)
progressContainer.addEventListener('click',setProgressBar)
