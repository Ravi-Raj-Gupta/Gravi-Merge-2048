# ⚔️ Codex of Daedalus - Complete Game Guide

## 🏛️ The Dimensions of the Workshop

The game features a **6 columns × 10 rows** grid (60 total cells), where stones fall from the top and stack upward from the bottom.

```
Column: 1  2  3  4  5  6
Row 1:  [·][·][·][·][·][·]
Row 2:  [·][·][·][·][·][·]
...
Row 10: [·][·][·][·][·][·]
```

## 🎮 The Seven Gestures of the Architect

### Required Controls

- **← Left Arrow** or **A** - Move falling stone left
- **→ Right Arrow** or **D** - Move falling stone right
- **↓ Down Arrow** or **S** - Soft drop (gentle descent)
- **Space** - Hard drop (instant landing)
- **Enter** - Invoke reserve emissary

### Hidden Gestures (as per the Codex)

- Speed increases can be discovered
- Special sequences for power bonuses

## 📊 The Four Gifts of Prometheus

Only these four values spawn from above:

- **2** - First Gift (light amber)
- **4** - Second Gift (golden)
- **8** - Third Gift (orange)
- **16** - Fourth Gift (fiery red)

Higher values (32, 64, 128, 256, 512, 1024, 2048, etc.) are created **only through the Forge Law** when stones merge vertically.

## ⚡ The Emissaries of Olympus

On rare occasions (1 in 20 spawns), a special emissary descends instead of a numbered stone:

| Emissary       | Symbol | Power                                            | Name         |
| -------------- | ------ | ------------------------------------------------ | ------------ |
| **Hermes**     | ⊗      | Destroys stone immediately below on landing      | Cell Breaker |
| **Hephaestus** | ×2     | Doubles the value of the stone immediately below | Cell Doubler |
| **Ares**       | ⋆      | Eliminates entire row where it lands             | Line Breaker |
| **Nyx**        | •      | Consumes entire floor, adds all to Treasury      | Black Hole   |

## 🔥 The Forge Law - Vertical Reckoning

When a falling stone lands directly on another stone of **equal value** in the same column:

1. **Merge fires**: The two stones combine into one with **double the value**
2. **Chain continues**: The new stone checks the stone below it
3. **If equal again**: The chain continues upward automatically
4. **If unequal**: The chain stops, the column is stable

**Example**:

```
Before:           After Merge:
Column 3          Column 3
   8                 16
   8           →      4
   4
```

The two 8s merge into 16. The 16 looks down at 4 - unequal, so the chain stops.

## ✂️ The Judgment of the Row - Horizontal Reckoning

After the Forge Law settles, the Judgment scans every row for **horizontal runs of 3+ identical values**:

1. **Survey**: Scan from bottom to top
2. **Identify**: Find runs of 3+ adjacent identical stones
3. **Dismiss**: Remove those stones (score added to Treasury)
4. **Gravity**: Stones fall to fill gaps
5. **Repeat**: Check for new merges - the chain reaction continues

**Example**:

```
Before Judgment:      After Judgment:
[4][4][4][8][2][16]   [·][·][·][8][2][16]
[2][2][2][8][8][8]    [·][·][·][8][·][·]
A 3-run of 4s        First 3-run removed
A 3-run of 2s        Second 3-run removed
A 3-run of 8s        Third 3-run removed
```

## 💰 The Treasury and the Burden

### Two Counters Always Visible

**Treasury** (The Banked Score):

- Points secured permanently
- Increases only when:
   - Judgment dismisses stones (horizontal matches)
   - Nyx emissary visits (entire floor value)
- Never decreases

**Living Tally** (The Burden of Sisyphus):

- Current load on the workshop floor
- Sum of all stone values
- **At risk**: If floor fills before you secure points, these are lost!

### The Final Reckoning

```
Final Score = Treasury (Banked) + Living Tally (Current)
```

Both values display at the end of the trial.

## 🎯 Winning Condition

**Reach 2048 in the Treasury to achieve victory!**

The Oracle will sing when the Treasury first holds 2048 points. Each judgment removes stones and adds their value to the vault. You must balance:

- Defending the current floor
- Securing points to the Treasury
- Managing the rare but powerful Emissaries

## 🏚️ Game Over Condition

The trial ends when:

- A new stone cannot enter because the **top row is completely full**
- **No gaps remain** to place falling stones

At this point, you see your Final Reckoning and can begin a new trial.

## 🧠 Strategic Tips

### 1. Build Your Vault

- Focus on making horizontal matches (Judgment scores)
- Each row match adds significantly to Treasury
- Don't just stack - arrange for multiple matches

### 2. Clear Space

- The Judgment rule removes stones and creates space
- Strategically build patterns that match in 3+ runs
- Watch chains: Judgment → Forge → Judgment...

### 3. Use Emissaries

- **Hermes** (⊗): Remove deadly high stacks
- **Hephaestus** (×2): Create double-value stones for bigger merges
- **Ares** (⋆): Clear entire blocked rows before they seal you
- **Nyx** (•): Emergency reset - dumps Living Tally to Treasury

### 4. Chain Reactions

- After Judgment removes stones, pieces fall and may create new Forge merges
- New merges may create new Judgment matches
- The loop: Forge → Judgment → Forge... continues until stable

### 5. Column Management

- Each column grows independently from bottom
- Use emissaries strategically in columns
- Plan 5-10 turns ahead

## 🎨 Interface Breakdown

### Large Game Display (6×10 Grid)

- **Cells**: 80-112px each (responsive, scales on mobile)
- **Dark stone theme**: Easy on eyes, high contrast
- **Cyan borders**: Retro arcade aesthetic

### HUD Information

- **Treasury**: Emerald green, permanently banked score
- **Burden**: Amber orange, current at-risk value
- **Final Score**: Purple, total reckoning
- **Herald's Preview**: Next stone preview (essential planning)
- **Reserve Emissary**: Currently held reserve (press Enter to invoke)

### Game Over Screen

- Final Treasury and Living Tally breakdown
- Option to begin new trial
- Celebratory if Treasury ≥ 2048

## 📈 Point Values for Judgment

When stones are dismissed by Judgment, their full values go to Treasury:

- Three 2s: +6 points
- Three 8s: +24 points
- Three 256s: +768 points
- Three 1024s: +3,072 points

**Strategy**: Build your way to high-value stones, then match them for big Treasury boosts.

## 🎵 Sound Design

- **Soft drop**: 300Hz beep
- **Hard drop**: 400Hz placement sound
- **Forge chain**: 600Hz ascending tone
- **Judgment match**: 700Hz satisfying chime
- **Emissary use**: Unique frequency for each type
- **Game Over**: Low frequency rumble
- **Victory**: 800Hz triumphant tone

## 🎯 Current Features Implemented

✅ **Full Forge Law** - Vertical merging with chains  
✅ **Complete Judgment system** - Horizontal matching and dismissal  
✅ **All 4 Emissaries** - With unique mechanics  
✅ **Chain Reactions** - Automatic Forge → Judgment loops  
✅ **Large 6×10 Grid** - Much bigger interface than original  
✅ **Treasury vs Living Tally** - Dual score tracking  
✅ **Herald's Preview** - Next stone preview  
✅ **Reserve System** - Hold one stone with Enter key  
✅ **Keyboard Controls** - Full gesture support  
✅ **Auto-drop** - Stones fall automatically every 2 seconds  
✅ **Responsive Design** - Mobile, tablet, desktop support  
✅ **Dark Theme** - Professional arcade aesthetic  
✅ **Smooth Animations** - Framer Motion transitions

## 🚀 How to Play - Quick Start

1. **The game starts** with a stone falling from a random column
2. **Move left/right** with arrow keys or WASD
3. **Drop** with down arrow or spacebar
4. **Place stone** - it lands on the lowest empty spot in that column
5. **Forge Law fires** - if equal values touch, they merge
6. **Judgment surveys** - rows are checked for 3+ matches
7. **Chain reactions** - gravity pulls down, forge fires again, etc.
8. **Repeat** - each stone adds to the floor
9. **When 3+ match** - they're removed, value goes to Treasury
10.   **Score 2048 in Treasury** - Victory! 🏆

## 📱 Responsive Sizes

- **Mobile** (< 640px): Cells = 80px, compact HUD
- **Tablet** (640-1024px): Cells = 96px, standard HUD
- **Desktop** (> 1024px): Cells = 112px, spacious HUD

The grid is always proportional and legible.

---

**The Architects await your trial. Will you build to victory, or will the floor consume you?**

⚔️ **Begin your Codex Experience** ⚔️
