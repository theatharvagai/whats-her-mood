<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Made_with-React_&_Vite-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/CSS-Claymorphism-FFB6C1?style=for-the-badge" alt="Design" />
  <br />
  <br />
  <h1>🌸 What's Her Mood? 🌸</h1>
  <p><h3><em>Solving every man's ultimate mystery: "What mood is my girlfriend in today?"</em></h3></p>
</div>

---

## 🤔 The Problem

Let's be real. Navigating a relationship can sometimes feel like walking through a minefield blindfolded. One week she’s incredibly happy and motivated, the next she’s easily frustrated, and by the weekend she's overwhelmed with love and affection. 

For ages, men have struggled to predict these shifts. But it's not magic—it's biology! The intricate balance of estrogen, progesterone, and menstrual cycle phases deeply impact emotional states, energy levels, and libido. We needed a tool to decipher this mystery.

## 💡 The Solution

**"What's Her Mood?"** is a sleek, locally-run, **Light Claymorphism** dashboard built for guys who want to be proactive. By tracking the start and end dates of her cycles, this tool predicts her current biological phase (Menstrual, Follicular, Ovulation, or Luteal) and translates it into completely plain, natural language so you know exactly what to expect.

- **Is she likely feeling low energy today?** (Bring chocolate & give extra care)
- **Is she highly motivated?** (Plan an activity)
- **Is she in her ovulation phase?** (Expect high affection and libido)

---

## ✨ Features

- 🎨 **Flawless Light Clay Aesthetic**: A vibrant, 3D white-clay UI painted in soft pinks, mint greens, and lavender. 
- 🗓️ **Panoramic 3-Month View**: See the past, present, and future at a glance so you can plan dates appropriately.
- 🗣️ **Conversational Prediction**: Clicking a date doesn't just show data; it gives you an intuitive sentence on what she's feeling and what you should expect!
- 🔒 **Absolute Privacy**: All data is stored strictly on your computer directly in your browser's Local Storage. No cloud, no tracking.

---

## 🧠 The Brains: Machine Learning Engine

Predicting a cycle isn't as simple as assuming a 28 day split. To provide highly accurate mood forecasting, this app utilizes a client-side localized algorithm mapping:

1. **Exponential Moving Average (EMA)**: Instead of treating all historical cycles equally, the engine assigns greater weight to the most recent data points. If her cycle shifts naturally over time, the algorithm instantly adapts to the new baseline.
2. **Seasonal / Climate Modifiers**: Recognizing that heavy summer heat and intense monsoons place different physical stressors on the body, the regression engine dynamically alters cycle lengths adjusting metrics depending on the season.
3. **Dynamic Phase Mapping**: Instead of using rigid day-counting, the engine calculates the fertile window dynamically by pinpointing Ovulation and determining Luteal overlap.

---

## 🚀 How To Run

```bash
# Clone the repository
git clone https://github.com/theatharvagai/whats-her-mood.git

# Enter the directory
cd whats-her-mood

# Install dependencies
npm install

# Start the dashboard
npm run dev
```

<div align="center">
  <br>
  <p><em>Never be caught off guard again. Be the supportive, understanding partner you are meant to be! ❤️</em></p>
</div>
