# 💖 Valentine Website - Modular JavaScript Framework

A beautifully organized Valentine's Day website built with **modular ES6 JavaScript**, Tailwind CSS, and a component-based architecture. Works perfectly on both desktop and mobile browsers!

## ✨ Features

### Valentine Page 💘
- **Fixed Button Positions**: YES button on the left, NO button on the right
- **Interactive Growth Feature**: YES button grows 30% bigger each time NO is clicked
- **Dynamic Content**: Changes GIFs and messages based on user interaction
- Success animations when YES is clicked
- Hint text to guide the user

### Family Page 💕
- Beautiful responsive card grid
- Hover animations on cards
- Heartwarming family messages
- Mobile-friendly design

### Music Player 🎵
- **Centered at bottom** of the page
- **Previous/Play/Pause/Next** controls
- Displays current song name
- Auto-plays next song when current ends
- Easy to add your own MP3 files

### Navigation
- **Centered navigation bar**
- Smooth page transitions
- Active page highlighting

## 🗂️ Project Structure

```
Valentines/
├── index.html              # Main entry point
├── app.js                  # Main application controller
│
├── components/             # Reusable components
│   ├── navigation.js       # Navigation bar component
│   ├── musicPlayer.js      # Music player with controls
│   └── buttons.js          # YES/NO button components
│
├── pages/                  # Page components
│   ├── valentine.js        # Valentine page logic
│   └── family.js           # Family page logic
│
├── styles/                 # Stylesheets
│   └── main.css            # Main styles and animations
│
├── assets/                 # Static assets
│   ├── music/              # MP3 files go here
│   │   ├── song1.mp3
│   │   ├── song2.mp3
│   │   └── song3.mp3
│   └── images/             # Images (optional)
│
└── README.md              # This file
```

## 🚀 Getting Started

### Option 1: Simple - Just Open in Browser
1. Double-click `index.html`
2. Or right-click → Open with → Your browser

### Option 2: Use a Local Server (Recommended)
For better ES6 module support:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎵 Adding Your Music

1. **Prepare your MP3 files**:
   - Name them: `song1.mp3`, `song2.mp3`, etc.
   - Place them in `assets/music/` folder

2. **Update the playlist** in `components/musicPlayer.js`:
   ```javascript
   this.playlist = [
     { name: 'Perfect - Ed Sheeran', file: 'assets/music/song1.mp3' },
     { name: 'Lover - Taylor Swift', file: 'assets/music/song2.mp3' },
     { name: 'Your Favorite Song', file: 'assets/music/song3.mp3' }
   ];
   ```

3. **That's it!** The player will automatically loop through all songs.

## 🎨 Architecture & Design Patterns

### Component-Based Architecture
- Each UI component is a separate ES6 class
- Components manage their own rendering and state
- Clean separation of concerns

### Modular Structure
- **Components**: Reusable UI pieces (`navigation.js`, `musicPlayer.js`, `buttons.js`)
- **Pages**: Complete page views (`valentine.js`, `family.js`)
- **Main App**: Orchestrates everything (`app.js`)

### ES6 Features Used
- ✅ ES6 Modules (import/export)
- ✅ Classes and constructors
- ✅ Arrow functions
- ✅ Template literals
- ✅ Destructuring
- ✅ Spread operators

## 🛠️ Technologies

- **Vanilla JavaScript** (ES6+)
- **Tailwind CSS** (via CDN)
- **HTML5 Audio API**
- **CSS3 Animations**
- **Modular ES6 Architecture**

## 💡 Customization

### Changing Button Growth Rate
Edit `components/buttons.js`:
```javascript
growYesButton() {
  this.yesButtonScale += 0.3; // Change this value
  // ...
}
```

### Changing Messages
Edit `components/buttons.js`:
```javascript
this.noTexts = ['Your message 1', 'Message 2', 'Message 3'];
```

### Changing Button Positions
Edit `styles/main.css`:
```css
.yes-button-container {
  left: 10%;  /* Adjust position */
}

.no-button-container {
  right: 10%;  /* Adjust position */
}
```

### Adding More Family Cards
Edit `pages/family.js`:
```javascript
this.cards = [
  { emoji: '🐱', text: 'Your text here' },
  // Add more cards...
];
```

## 📱 Responsive Design

Fully responsive breakpoints:
- **Mobile**: 0-768px
- **Tablet**: 768px-1024px
- **Desktop**: 1024px+

## 🐛 Troubleshooting

### Modules not loading (CORS error)
- Use a local server instead of opening file directly
- Or use VS Code Live Server extension

### Music not playing
- Ensure MP3 files are in `assets/music/` folder
- Check file paths in `components/musicPlayer.js`
- Some browsers block autoplay until user interaction

### Buttons not responding
- Check browser console for errors
- Ensure all JavaScript files are loading
- Verify file paths are correct

## 🌟 Key Features Explained

### 1. Fixed Button Positions
- YES button stays on the left side
- NO button stays on the right side
- Responsive positioning on mobile

### 2. Growing YES Button
- Increases by 30% with each NO click
- Smooth scale animation
- Resets to normal when YES is clicked

### 3. Music Player
- Full playback controls
- Playlist management
- Auto-advance to next song
- Visual feedback (play/pause icons)

### 4. Centered Navigation
- Navigation buttons centered in navbar
- Active page highlighting
- Smooth transitions

## 🚀 Deployment

Can be deployed to:
- **GitHub Pages**
- **Netlify** - Drag and drop
- **Vercel** - Import repository
- **Any static hosting**

No build step required!

## 📝 License

Open source - free for personal use.

## 💝 Happy Valentine's Day!

Show your love with this modern, well-architected website! Perfect for proposals or spreading the love! 🎉💖

---

**Built with ❤️ using modern JavaScript patterns**

## ✨ Features

### Valentine Page 💘
- Interactive YES/NO buttons
- **Special Feature**: YES button grows bigger (30% larger) each time you click NO!
- NO button moves randomly around the screen when clicked
- Changes cat GIF based on your choices
- Success message when YES is clicked
- Button returns to normal size after clicking YES
- Hint text appears after clicking NO to guide the user

### Family Page 💕
- Beautiful responsive card grid layout
- Heartwarming messages for family
- Animated GIFs
- Hover effects on cards
- Mobile-friendly design

### Additional Features
- Background music toggle 🎵
- Smooth page navigation
- Beautiful gradient backgrounds
- Fully responsive design (works on phones, tablets, and desktops)
- Modern UI with Tailwind CSS
- Smooth animations and transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will open automatically in your default browser at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📱 Responsive Design

The app is fully responsive and works seamlessly across:
- 📱 Mobile phones (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)

Features responsive:
- Navigation buttons adapt to screen size
- Images scale appropriately
- Card grid adjusts columns based on screen width
- Text sizes adjust for readability
- Touch-friendly button sizes on mobile

## 🎨 Design

The app uses:
- **React** - Modern JavaScript library for building UIs
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Custom color palette** - Valentine-themed colors
  - Pink gradients (#ffd6e8, #fff0f6)
  - Accent colors (#ff477e, #ff4d6d)
  - Romantic UI elements
  - Shadow and hover effects

## 📱 How It Works

### Interactive YES Button Feature
1. When you click the NO button, the YES button grows by 30% each time
2. A hint message appears telling you to notice the YES button
3. This continues until you click YES
4. Once YES is clicked:
   - Button returns to normal size
   - Success message appears
   - NO button disappears
   - Cat GIF changes to a happy one

### NO Button Behavior
- Moves to random positions when clicked using absolute positioning
- Changes the question text with each click (cycles through 3 messages)
- Updates the cat GIF to show a sad cat
- Keeps track of click count

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **JavaScript (ES6+)** - Programming language
- **HTML5 Audio API** - Music playback
- **CSS3 Animations** - Smooth transitions

## 📂 Project Structure

```
valentine-app/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── README.md           # This file
```

## 💡 Customization

### Changing Messages
Edit the arrays and strings in `src/App.jsx`:
```javascript
const noTexts = ['Sure ka???', 'Sure na jud???', 'Di na ma usob imong mind???'];
const questionText = 'Do you want to be my VALENTINES??';
```

### Adjusting Button Growth Rate
Modify the scale increment in the `noClicked` function:
```javascript
const newScale = yesButtonScale + 0.3; // Change 0.3 to your preferred value
```

### Changing Colors
Update the Tailwind config in `tailwind.config.js`:
```javascript
colors: {
  'valentine-pink': '#ffd6e8',
  'valentine-light': '#fff0f6',
  // Add more custom colors
}
```

### Changing Images/GIFs
Replace the Giphy URLs in `src/App.jsx` with your own image URLs.

## 🐛 Troubleshooting

### Music not playing
- Click the music button and allow audio in your browser
- Some browsers block autoplay - user interaction is required
- Check your browser's audio permissions

### Development server not starting
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build fails
Make sure all dependencies are installed:
```bash
npm install
```

## 🌐 Deployment

You can deploy this app to:
- **Vercel** - `vercel deploy`
- **Netlify** - Drag and drop the `dist` folder
- **GitHub Pages** - Use gh-pages package
- **Any static hosting** - Upload the `dist` folder

## 📝 License

This project is open source and available for personal use.

## 💝 Happy Valentine's Day!

Show your love with this interactive website! Perfect for Valentine's Day proposals or just spreading the love! 🎉💖