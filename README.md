# 🕺 Interactive Disco Lights with Voice Control 💃
<div align="center">

  ![Disco Ball](https://github.com/user-attachments/assets/f275bcc9-4eff-4a30-a12a-54c8bbbfbce3)
</div>


Turn your screen into a dazzling disco experience with this interactive, voice-controlled virtual disco light system!

## ✨ Features

- 🔮 Interactive disco ball with dynamic lighting effects
- 🌈 Color-changing background
- 🎭 Multiple lighting effects: Strobe, Rainbow, and Pulse
- 🎙️ Voice control for hands-free operation
- 🖱️ Simple and intuitive user interface

## 🛠️ Components

1. **HTML** (`index.html`): Structure of the web application
2. **CSS** (`styles.css`): Styling for disco elements and controls
3. **JavaScript** (`script.js`): Client-side logic and WebSocket communication
4. **Python** (`voice_recognition_server.py`): Voice recognition and WebSocket server

## 🚀 Setup and Installation

1. Ensure you have Python 3.x installed
2. Install required Python packages:
   ```bash
   pip install SpeechRecognition websockets pyaudio
   ```

3. Place all files in the same directory


## 🎛️ Usage

1. **Start the voice recognition server**:
   ```bash
     python voice_recognition_server.py
   ```

2. Open `index.html` in a web browser

3.Use on-screen buttons for manual control

4. Click "Start Voice Recognition" for voice commands


## 🗣️ Voice Commands

| Command | Action |
|---------|--------|
| "Red" | Change background color to red |
| "Green" | Change background color to green |
| "Blue" | Change background color to blue |
| "Yellow" | Change background color to yellow |
| "Purple" | Change background color to purple |
| "Strobe" | Activate strobe effect |
| "Rainbow" | Activate rainbow effect |
| "Pulse" | Activate pulse effect |
| "Off" | Turn off disco lights |


## Usage Tips

- Speak clearly and directly into your microphone.
- Wait for a brief moment after the "Listening..." prompt before speaking your command.
- If a command isn't recognized, try repeating it more slowly.
- Ensure there isn't too much background noise for optimal recognition.


## 🧰 Dependencies

* Web Browser with JavaScript enabled
* Python 3.x
* SpeechRecognition library
* websockets library
* pyaudio library


## 📝 Notes

* Ensure your microphone is properly configured
* Voice recognition server must be running for voice commands
* This project is for educational purposes


---
<div align="center"> Made by Anik </div>
