export class MusicPlayer {
  constructor(playlist) {
    this.playlist = playlist;
    this.currentSongIndex = 0;
    this.audio = new Audio();
    this.isPlaying = false;
  }

  render() {
    return `
      <div class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-2xl border-t-4 border-pink-400 z-40">
        <div class="max-w-2xl mx-auto p-4">
          <div class="flex items-center justify-center space-x-6">
            <button 
              id="prevBtn" 
              class="text-pink-500 hover:text-pink-600 transition-all transform hover:scale-110"
            >
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            
            <button 
              id="playPauseBtn" 
              class="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 transition-all transform hover:scale-110 shadow-lg"
            >
              <svg id="playIcon" class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <svg id="pauseIcon" class="w-8 h-8 hidden" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            </button>
            
            <button 
              id="nextBtn" 
              class="text-pink-500 hover:text-pink-600 transition-all transform hover:scale-110"
            >
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 18h2V6h-2zm-11-7l8.5-6v12z"/>
              </svg>
            </button>
          </div>
          
          <div class="text-center mt-2">
            <p id="currentSong" class="text-sm text-gray-600 font-medium">
              ${this.playlist[0].name}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  init() {
    this.loadSong(this.currentSongIndex);
    
    document.getElementById('playPauseBtn').addEventListener('click', () => this.togglePlay());
    document.getElementById('nextBtn').addEventListener('click', () => this.nextSong());
    document.getElementById('prevBtn').addEventListener('click', () => this.previousSong());
  }

  loadSong(index) {
    this.audio.src = this.playlist[index].file;
    document.getElementById('currentSong').textContent = this.playlist[index].name;
  }

  togglePlay() {
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    
    if (this.isPlaying) {
      this.audio.pause();
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
    } else {
      this.audio.play();
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
    }
    this.isPlaying = !this.isPlaying;
  }

  nextSong() {
    this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
    this.loadSong(this.currentSongIndex);
    if (this.isPlaying) {
      this.audio.play();
    }
  }

  previousSong() {
    this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
    this.loadSong(this.currentSongIndex);
    if (this.isPlaying) {
      this.audio.play();
    }
  }
}
