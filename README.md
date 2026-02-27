# Egg Timer 
<img width="412" height="254" alt="image" src="https://github.com/user-attachments/assets/f2dbb3ba-6459-4ebb-bc54-45fab9ae2779" />


A cute and interactive Progressive Web App (PWA) for perfectly cooking your eggs! Choose your preferred egg style and let the timer do the work with satisfying visual and audio feedback.

## Features

✨ **Four Egg Cooking Options:**
- Soft Boiled (6:30)
- Hard Boiled (10:00)
- Fried (3:00)
- Scrambled (4:00)

🎨 **Beautiful UI:**
- Retro pixel art aesthetic with the "Press Start 2P" font
- Warm, egg-themed color palette
- Custom egg illustrations for each cooking style
- Soothing pastel cloud background
- Smooth animations and transitions

🔊 **Audio Feedback:**
- Satisfying mouse click sound on button presses
- Notification "ding" sound when eggs are ready

📱 **Progressive Web App (PWA):**
- Install as a standalone app on your device
- Works offline with service worker caching
- Responsive design that works on various screen sizes
- Fixed app window size (493 x 638px) for consistent experience

⏲️ **Easy-to-Use Timer:**
- Start/Pause functionality
- Reset button to restart the timer
- Back button to return to egg selection
- Real-time countdown display

## How to Use

1. Open the Egg Timer app in your browser
2. Click on the egg type you want to cook (Soft Boiled, Hard Boiled, Fried, or Scrambled)
3. The timer screen will display with the selected egg and countdown
4. Press **Start** to begin the timer
5. The egg image will sway while cooking
6. When time is up, you'll see a celebration message and hear a ding!
7. Use **Reset** to restart the timer or **Back** to choose a different egg

## Installation

### As a Web App
Simply open the app in your browser. To install:
- On Chrome/Edge: Click the install icon in the address bar
- On Safari: Use the share menu and select "Add to Home Screen"
- On Firefox: The app can be opened as a standalone window

### Local Setup
1. Clone the repository
2. No build process needed - just open `index.html` in your browser
3. The service worker will automatically cache assets for offline use

## Technology Stack

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with custom animations
- **Vanilla JavaScript** - Logic and interactivity
- **Web Audio API** - Sound generation
- **Service Workers** - Offline functionality and caching
- **PWA Manifest** - App installation support

## File Structure

```
egg_timer/
├── index.html          # Main HTML file
├── app.js              # Application logic
├── style.css           # Styling and animations
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline caching
├── backd-img.png       # Background image
├── soft-egg.png        # Soft boiled egg image
├── hard-egg.png        # Hard boiled egg image
├── fried-egg.png       # Fried egg image
├── sunny-side-egg.png  # Scrambled egg image
└── README.md           # This file
```

## Browser Support

Works on all modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- Web Audio API
- Service Workers

## Future Enhancements

- Custom timer input
- Multiple theme options
- Sound volume control
- Haptic feedback on mobile devices
- Additional egg styles and cooking methods

## License

This project is open source and available for personal and educational use.

Enjoy cooking your eggs! 🍳
