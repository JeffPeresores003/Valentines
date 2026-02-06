import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('valentine');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [catGif, setCatGif] = useState('/assets/images/valentines.gif');
  const [questionText, setQuestionText] = useState('Do you want to be my VALENTINES??');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [yesButtonPosition, setYesButtonPosition] = useState({ x: 0, y: 0 });
  const [showNoButton, setShowNoButton] = useState(true);
  const valentineRef = useRef(null);
  const valentinePageRef = useRef(null);
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noClickCount, setNoClickCount] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playlist, setPlaylist] = useState([
    { name: 'Davichi - This Love', file: '/assets/music/Davichi - This Love Lyrics (easy lyrics).mp3' },
    { name: 'Lee Hi - My Love', file: '/assets/music/Lee Hi (이하이)- My Love (내 사랑) (Scarlet Heart Ryeo OST, Part 10) Han Rom Eng lyrics.mp3' },
    { name: 'Tahanan', file: '/assets/music/Tahanan (Live at The Cozy Cove) - El Manu, Jessy Kang, Jason Marvin.mp3' }
  ]);
  const noTexts = ['Sure ka???', 'Sure na jud???', 'Di na ma usob imong mind???'];
  const noIndex = useRef(0);

  const computePositions = () => {
    if (!valentineRef.current || !valentinePageRef.current) return;
    const rect = valentineRef.current.getBoundingClientRect();
    const pageRect = valentinePageRef.current.getBoundingClientRect();
    // compute positions relative to the page container so buttons scroll with content
    const top = rect.bottom - pageRect.top + 40; // gap below the content
    const centerX = rect.left - pageRect.left + rect.width / 2;
    const gap = Math.min(120, rect.width * 0.18); // spacing between NO and YES
    const yesX = centerX + gap;
    const noX = centerX - gap;
    setYesButtonPosition({ x: yesX, y: top });
    setNoButtonPosition({ x: noX, y: top });
  };

  const loadSong = (index) => {
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = playlist[index].file;
    audioRef.current.load();
    document.getElementById('currentSongName')?.replaceWith?.(document.createElement('span'));
  };

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[currentSongIndex].file);
    }

    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
    setMusicPlaying(!musicPlaying);
  };

  const nextSong = () => {
    const next = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(next);
    if (audioRef.current) {
      audioRef.current.src = playlist[next].file;
      if (musicPlaying) audioRef.current.play();
    }
  };

  const prevSong = () => {
    const prev = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prev);
    if (audioRef.current) {
      audioRef.current.src = playlist[prev].file;
      if (musicPlaying) audioRef.current.play();
    }
  };

  const yesClicked = () => {
    setCatGif('/assets/images/yes.gif');
    setQuestionText('Wala nay bawiay ha!! Bantay ka!!! hehe 😼💘');
    setShowNoButton(false);
    setYesButtonScale(1); // Reset to normal size
    setShowSuccessMessage(true);
    setNoClickCount(0);
    // center YES in the visible viewport but keep it inside the page container
    if (valentinePageRef.current) {
      const pageRect = valentinePageRef.current.getBoundingClientRect();
      const centerX = window.innerWidth / 2 - pageRect.left;
      const centerY = window.innerHeight / 2 - pageRect.top;
      setYesButtonPosition({ x: centerX, y: centerY });
    }

    // play and remove 'Tahanan' from the playlist
    const targetIndex = playlist.findIndex(p => p.name === 'Tahanan' || (p.file && p.file.includes('Tahanan')));
    if (targetIndex !== -1) {
      const target = playlist[targetIndex];
      if (!audioRef.current) audioRef.current = new Audio();
      audioRef.current.src = target.file;
      audioRef.current.play().catch(err => console.log('play failed', err));
      setMusicPlaying(true);

      // remove from playlist
      setPlaylist(prev => prev.filter((_, i) => i !== targetIndex));
      // reset currentSongIndex to 0 to keep it in range
      setCurrentSongIndex(0);
    } else {
      // fallback: recompute positions if no special song found
      computePositions();
    }
    // previously showed an in-page spotify button; now user requested navbar link
  };

  const noClicked = () => {
    // Increase the Yes button size by 30% each click, but cap it to prevent overflow on mobile
    const newScale = Math.min(yesButtonScale + 0.3, 2.5);
    setYesButtonScale(newScale);

    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    // Move NO button to a random fixed position on the viewport (keeps fixed)
    // position NO randomly within the valentine page container bounds
    if (valentinePageRef.current) {
      const pageRect = valentinePageRef.current.getBoundingClientRect();
      const pageWidth = pageRect.width;
      const pageHeight = pageRect.height;
      // Use smaller padding on mobile
      const padding = Math.min(60, pageWidth * 0.1);
      const buttonWidth = 100; // approximate button width
      const rx = padding + Math.random() * Math.max(0, pageWidth - padding * 2 - buttonWidth);
      const ry = (rect => {
        try {
          const contentRect = valentineRef.current.getBoundingClientRect();
          const topRel = contentRect.bottom - pageRect.top + 40;
          const minY = topRel;
          return minY + Math.random() * Math.max(0, pageHeight - minY - padding - 100);
        } catch (e) { return padding + Math.random() * Math.max(0, pageHeight - padding * 2); }
      })();
      setNoButtonPosition({ x: rx, y: ry });
    } else {
      const maxX = Math.max(16, window.innerWidth - 140);
      const maxY = Math.max(16, window.innerHeight - 120);
      const randomX = 16 + Math.random() * (maxX - 16);
      const randomY = 80 + Math.random() * (maxY - 80);
      setNoButtonPosition({ x: randomX, y: randomY });
    }

    // Change cat gif depending on how many times NO was clicked
    let gifPath = '/assets/images/no1.gif';
    if (newCount === 1) gifPath = '/assets/images/no1.gif';
    else if (newCount === 2) gifPath = '/assets/images/no2.gif';
    else gifPath = '/assets/images/no3.gif';

    setCatGif(gifPath);
    setQuestionText(noTexts[noIndex.current]);
    noIndex.current = (noIndex.current + 1) % noTexts.length;
  };

  const resetValentinePage = () => {
    setCatGif('/assets/images/valentines.gif');
    setQuestionText('Do you want to be my VALENTINES??');
    setShowNoButton(true);
    setYesButtonScale(1);
    setNoClickCount(0);
    setShowSuccessMessage(false);
    noIndex.current = 0;
    computePositions();
  };

  const spotifyUrl = 'https://open.spotify.com/playlist/1jhumhTcQq8Fd2QkrehWO3?si=ziyuVVhiQZ6_357FNDGx1g';

  useEffect(() => {
    // compute initial positions when valentine page becomes active
    if (currentPage === 'valentine') {
      // small timeout to allow images to load and layout to settle
      setTimeout(() => computePositions(), 50);
      const onResize = () => computePositions();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, [currentPage, catGif]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-pink via-valentine-light to-valentine-pink">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-valentine-dark shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex space-x-2 sm:space-x-4">
              <button
                onClick={() => {
                  setCurrentPage('valentine');
                  resetValentinePage();
                }}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 ${
                  currentPage === 'valentine'
                    ? 'bg-valentine-light text-valentine-accent border-2 border-valentine-button'
                    : 'bg-white text-valentine-accent hover:bg-valentine-light'
                }`}
              >
                Valentine Date 💘
              </button>
              <button
                onClick={() => setCurrentPage('spotify')}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 ${
                  currentPage === 'spotify'
                    ? 'bg-valentine-light text-valentine-accent border-2 border-valentine-button'
                    : 'bg-white text-valentine-accent hover:bg-valentine-light'
                }`}
              >
                Spotify Playlist 🎵
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Valentine Page */}
      {currentPage === 'valentine' && (
        <div id="valentine-page" ref={valentinePageRef} className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 sm:p-8">
          <div className="max-w-2xl w-full text-center">
            <div ref={valentineRef}>
              <img
                src={catGif}
                alt="Cat"
                className="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-3xl shadow-2xl object-cover mb-6 sm:mb-8"
              />

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-valentine-accent mb-4 sm:mb-6 px-4">
                {questionText}
              </h1>
            </div>

            <div className="min-h-[200px] sm:min-h-[250px]">
              {/* YES button - fixed and horizontally centered under the valentine content */}
              <button
                onClick={yesClicked}
                style={{
                  position: 'absolute',
                  left: `${yesButtonPosition.x}px`,
                  top: `${yesButtonPosition.y}px`,
                  transform: `translateX(-50%) scale(${yesButtonScale})`,
                  zIndex: 60,
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-valentine-button text-white text-base sm:text-lg font-bold rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 hover:shadow-xl"
              >
                YES 💖
              </button>

              {showNoButton && (
                <button
                  onClick={noClicked}
                  style={{
                    position: 'absolute',
                    left: `${noButtonPosition.x}px`,
                    top: `${noButtonPosition.y}px`,
                    transform: 'translateX(-50%)',
                    zIndex: 60,
                  }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-400 text-white text-base sm:text-lg font-bold rounded-full shadow-lg hover:bg-gray-500 transition-all duration-300"
                >
                  NO 💔
                </button>
              )}
            
            </div>

            {noClickCount > 0 && showNoButton && (
              <p className="mt-6 text-base sm:text-lg text-valentine-accent font-medium italic animate-pulse">
                (Notice the YES button growing? 👀 That's a hint!)
              </p>
            )}
          </div>
        </div>
      )}

      {/* Bottom Music Player */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full shadow-2xl px-3 sm:px-6 py-2 sm:py-3 flex items-center gap-2 sm:gap-6 max-w-[95vw]">
        <button onClick={prevSong} className="text-pink-500 hover:text-pink-600 text-sm sm:text-base">
          ◀◀
        </button>

        <button onClick={toggleMusic} className="bg-pink-500 text-white rounded-full p-2 sm:p-3 shadow-md text-sm sm:text-base">
          {musicPlaying ? '⏸' : '▶'}
        </button>

        <button onClick={nextSong} className="text-pink-500 hover:text-pink-600 text-sm sm:text-base">
          ▶▶
        </button>

        <div className="text-xs sm:text-sm text-gray-700 font-medium ml-1 sm:ml-2 truncate max-w-[80px] sm:max-w-[150px] md:max-w-none">
          {playlist[currentSongIndex]?.name}
        </div>
      </div>

      {/* Spotify Page */}
      {currentPage === 'spotify' && (
        <div className="min-h-[calc(100vh-4rem)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-valentine-accent text-center mb-6">
              My Spotify Playlist 🎶
            </h1>

            <div className="relative w-full min-h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
              {/* center spotify button */}
              <button
                onClick={() => window.open(spotifyUrl, '_blank')}
                className="px-4 sm:px-6 py-3 sm:py-4 bg-green-600 text-white font-bold rounded-full z-20 animate-bounce hover:scale-110 transition-transform duration-300 text-sm sm:text-base"
                style={{
                  boxShadow: '0 10px 25px rgba(22, 163, 74, 0.5), 0 20px 40px rgba(0, 0, 0, 0.3)',
                }}
              >
                Open Spotify Playlist
              </button>

              {/* four cute GIFs around the button - responsive sizing and positioning */}
              <img src="/assets/images/cat.gif" alt="gif1" className="absolute w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-xl shadow-xl top-2 left-2 sm:-top-6 sm:-left-10" />
              <img src="/assets/images/cat2.gif" alt="gif2" className="absolute w-24 h-24 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-xl shadow-xl top-0 right-2 sm:-top-8 sm:-right-12" />
              <img src="/assets/images/cat3.gif" alt="gif3" className="absolute w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-xl shadow-xl bottom-2 left-2 sm:-bottom-8 sm:-left-16" />
              <img src="/assets/images/cat4.gif" alt="gif4" className="absolute w-24 h-24 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-xl shadow-xl bottom-0 right-2 sm:-bottom-8 sm:-right-8" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
