export const ValentinePage = {
  state: {
    yesButtonScale: 1,
    noClickCount: 0,
    noIndex: 0,
    noTexts: ['Sure ka???', 'Sure na jud???', 'Di na ma usob imong mind???']
  },

  render() {
    return `
      <div class="page-fade min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 pt-20 pb-32">
        <div class="max-w-2xl w-full text-center">
          <img 
            id="catGif" 
            src="assets/images/initial.gif" 
            alt="Cat" 
            class="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-3xl shadow-2xl object-cover mb-8" 
          />
          
          <h1 id="questionText" class="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600 mb-6 px-4">
            Do you want to be my VALENTINES??
          </h1>

          <div id="successMessage" class="hidden mb-6 animate-bounce">
            <p class="text-2xl font-bold text-green-600">
              💖 Yay! You said YES! 💖
            </p>
          </div>

          <div id="hintText" class="hidden mt-6">
            <p class="text-lg text-pink-600 font-medium italic animate-pulse">
              (Notice the YES button growing? 👀 That's a hint!)
            </p>
          </div>

          <!-- YES/NO Buttons -->
          <div class="flex items-center justify-center gap-6 mt-8">
            <button id="yesBtn" class="animate-grow px-8 py-4 bg-pink-500 text-white text-lg font-bold rounded-full shadow-lg hover:bg-pink-600 transition-all hover:shadow-xl">
              YES 💖
            </button>

            <button id="noBtn" class="px-8 py-4 bg-gray-400 text-white text-lg font-bold rounded-full shadow-lg hover:bg-gray-500 transition-all">
              NO 💔
            </button>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents() {
    document.getElementById('yesBtn').addEventListener('click', () => this.handleYesClick());
    document.getElementById('noBtn').addEventListener('click', () => this.handleNoClick());
  },

  handleYesClick() {
    document.getElementById('catGif').src = 'assets/images/yes.gif';
    document.getElementById('questionText').textContent = 'Wala nay bawiay ha!! Bantay ka!!! hehe 😼💘';
    document.getElementById('successMessage').classList.remove('hidden');
    document.getElementById('noBtn').classList.add('hidden');
    document.getElementById('hintText').classList.add('hidden');
    
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.style.transform = 'scale(1)';
    this.state.yesButtonScale = 1;
    this.state.noClickCount = 0;
  },

  handleNoClick() {
    this.state.yesButtonScale += 0.3;
    this.state.noClickCount++;
    
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.style.transform = `scale(${this.state.yesButtonScale})`;
    
    // Move NO button to random position
    const noBtn = document.getElementById('noBtn');
    noBtn.classList.add('no-button-moving');
    
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    const randomX = Math.random() * Math.max(0, maxX);
    const randomY = Math.random() * Math.max(0, maxY);
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    if (this.state.noClickCount > 0) {
      document.getElementById('hintText').classList.remove('hidden');
    }
    
    document.getElementById('catGif').src = 'assets/images/no.gif';
    document.getElementById('questionText').textContent = this.state.noTexts[this.state.noIndex];
    this.state.noIndex = (this.state.noIndex + 1) % this.state.noTexts.length;
    
    noBtn.classList.add('animate-pulse');
    setTimeout(() => noBtn.classList.remove('animate-pulse'), 500);
  },

  reset() {
    this.state.yesButtonScale = 1;
    this.state.noClickCount = 0;
    this.state.noIndex = 0;
  }
};
