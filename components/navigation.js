export const Navigation = {
  render() {
    return `
      <nav class="fixed top-0 left-0 right-0 bg-gradient-to-r from-pink-400 to-pink-500 shadow-lg z-40">
        <div class="flex items-center justify-center space-x-4 p-4">
          <button 
            id="valentineDateBtn" 
            class="nav-btn bg-white text-pink-500 px-6 py-2 rounded-full font-bold hover:bg-pink-50 transition-all transform hover:scale-105 shadow-md flex items-center space-x-2"
          >
            <span>Valentine Date</span>
            <span>💕</span>
          </button>
          <button 
            id="familyBtn" 
            class="nav-btn text-white px-6 py-2 rounded-full font-bold hover:bg-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <span>Family</span>
            <span>💝</span>
          </button>
        </div>
      </nav>
    `;
  },

  attachEvents(onNavigate) {
    document.getElementById('valentineDateBtn').addEventListener('click', () => {
      onNavigate('valentine');
    });
    
    document.getElementById('familyBtn').addEventListener('click', () => {
      onNavigate('family');
    });
  },

  setActivePage(page) {
    const valentineBtn = document.getElementById('valentineDateBtn');
    const familyBtn = document.getElementById('familyBtn');
    
    if (page === 'valentine') {
      valentineBtn.classList.add('bg-white', 'text-pink-500');
      valentineBtn.classList.remove('text-white', 'bg-pink-600');
      familyBtn.classList.remove('bg-white', 'text-pink-500');
      familyBtn.classList.add('text-white');
    } else {
      familyBtn.classList.add('bg-white', 'text-pink-500');
      familyBtn.classList.remove('text-white', 'bg-pink-600');
      valentineBtn.classList.remove('bg-white', 'text-pink-500');
      valentineBtn.classList.add('text-white');
    }
  }
};
