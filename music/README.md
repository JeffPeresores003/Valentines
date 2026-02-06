# 🎵 Music Folder

## Add Your MP3 Files Here

1. Place your MP3 files in this folder
2. Recommended names: `song1.mp3`, `song2.mp3`, `song3.mp3`

## Update the Playlist

Open `components/musicPlayer.js` and update:

```javascript
this.playlist = [
  { name: 'Your Song Name', file: 'assets/music/song1.mp3' },
  { name: 'Another Song', file: 'assets/music/song2.mp3' },
  { name: 'More Songs', file: 'assets/music/song3.mp3' }
];
```

## Tips

- Use MP3 format for best browser compatibility
- Keep file sizes reasonable (under 10MB each)
- Use descriptive names for the songs
- Add as many songs as you want!

The music player will automatically:
- Loop through all songs
- Auto-play the next song
- Display the song name
- Provide previous/next controls

Enjoy! 💖
