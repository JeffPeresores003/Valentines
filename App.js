// Main Application
import { Navigation } from './components/navigation.js';
import { MusicPlayer } from './components/musicPlayer.js';
import { ValentinePage } from './pages/valentine.js';
import { FamilyPage } from './pages/family.js';

class App {
  constructor() {
    this.navigation = new Navigation();
    this.musicPlayer = new MusicPlayer();
    this.valentinePage = new ValentinePage();
    this.familyPage = new FamilyPage();
    this.currentPage = 'valentine';
  }

  init() {
    // Render navigation
    document.getElementById('navigation').innerHTML = this.navigation.render();
    
    // Render music player
    document.getElementById('music-player').innerHTML = this.musicPlayer.render();
    
    // Initialize music player
    this.musicPlayer.init();
    
    // Render initial page (valentine)
    this.renderPage('valentine');
    
    // Attach navigation event listeners
    this.navigation.attachEventListeners((page) => this.renderPage(page));
  }

  renderPage(pageName) {
    this.currentPage = pageName;
    const appContainer = document.getElementById('app');

    if (pageName === 'valentine') {
      // Reset valentine page before rendering
      if (this.currentPage === 'valentine') {
        this.valentinePage.reset();
      }
      appContainer.innerHTML = this.valentinePage.render();
      this.valentinePage.init();
    } else if (pageName === 'family') {
      appContainer.innerHTML = this.familyPage.render();
      this.familyPage.init();
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
