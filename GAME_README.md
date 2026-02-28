# 🚀 Gravi-Merge 2048 - Gravity-Based Puzzle Game

A fully interactive, visually polished gravity-based 2048 puzzle game with labyrinth obstacles built using React, Tailwind CSS, and Framer Motion.

## 🎮 Features

### 🎯 Core Gameplay

- **Classic 2048 Merge Logic**: Identical tiles merge when they collide
- **Gravity Mechanics**: Tiles fall toward the gravity direction after each move
- **Obstacle Maze Layout**: Fixed blocks create a labyrinth challenge
- **Smooth Animations**: Professional-grade animations for all interactions
- **Score Tracking**: Real-time score updates with persistent best score

### 🎨 Visual Polish

- **Modern & Neon Themes**: Toggle between aesthetic designs
- **Responsive UI**: Works seamlessly on mobile, tablet, and desktop
- **Beautiful Tile Colors**: Color gradient based on tile values
- **Animated Transitions**: Smooth tile movements and merges
- **Neon Glow Effects**: Cyberpunk aesthetic in neon theme

### 🔊 Audio & Feedback

- **Sound Effects**: Move and merge sounds (toggleable)
- **Web Audio API**: Procedurally generated 8-bit style sounds
- **Visual Feedback**: Score animations and merge indicators

### 💾 Persistent Features

- **localStorage Integration**: Saves best score, theme, and sound preferences
- **Game State Management**: Automatic persistence of user preferences

## 🎮 How to Play

### Keyboard Controls

- **Arrow Keys**: Move tiles (↑ ↓ ← →)
- **WASD**: Alternative controls (W/A/S/D)

### Game Mechanics

1. Press a direction key to move all tiles
2. Identical adjacent tiles merge and double in value
3. A new tile (2 or 4) spawns after each move
4. Tiles fall based on gravity direction (affects tile placement)
5. Reach 2048 to win!
6. Game ends when no moves are possible

## 🛠️ Technical Stack

### Frontend Framework

- **React 19**: Modern UI library with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS 4**: Utility-first styling framework
- **Framer Motion**: Professional animation library

## 📁 Project Structure

```
src/
├── components/
│   ├── GameBoard.jsx      # Main game grid display
│   ├── Tile.jsx           # Individual tile component
│   ├── Header.jsx         # Score and controls header
│   ├── Controls.jsx       # Gravity and status display
│   └── GameOverlay.jsx    # Victory/Game Over screen
├── utils/
│   ├── gameUtils.js       # Grid initialization and utilities
│   ├── moveLogic.js       # Tile movement and merge logic
│   ├── gravityLogic.js    # Gravity physics
│   └── checkGameState.js  # Win/lose condition checking
├── App.jsx               # Main game component
├── App.css               # Component styles
├── index.css             # Global styles
└── main.jsx              # React entry point
```

## 🎨 Theme System

### Modern Theme

- Clean, minimalist design
- Soft colors and shadows
- Professional appearance

### Neon Theme

- Cyberpunk aesthetic
- Glowing effects and borders
- Electric color palette
- Animated background grid

## 📱 Responsive Design

Automatically adjusts to screen size:

- **Mobile**: Full-width grid with touch-friendly spacing
- **Tablet**: Optimized layout with larger tiles
- **Desktop**: Centered, spacious interface
- **Dark Mode**: Automatic detection and support

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Game Statistics

- **Grid Size**: 4x4 cells
- **Target Score**: 2048
- **Starting Tiles**: 2 (value 2 or 4)
- **Spawn Probability**: 90% chance of 2, 10% chance of 4
- **Obstacles**: 5 fixed blocks creating maze patterns

## 🐛 Edge Cases Handled

✅ No movement available → Game Over  
✅ Full grid with merge possibility → Continue  
✅ Restart during animation → Clean reset  
✅ Double merge prevention → One merge per move  
✅ Obstacle collision → Tiles stop at obstacles

---

**Have fun and reach 2048! 🚀**
