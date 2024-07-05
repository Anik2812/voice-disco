document.addEventListener('DOMContentLoaded', () => {
    const discoBall = document.getElementById('disco-ball');
    const voiceBtn = document.getElementById('voice-btn');
    const colorBtns = document.querySelectorAll('.color-btn');
    const strobeBtn = document.getElementById('strobe-btn');
    const rainbowBtn = document.getElementById('rainbow-btn');
    const pulseBtn = document.getElementById('pulse-btn');
    const offBtn = document.getElementById('off-btn');
    const statusElement = document.getElementById('status');

    let currentEffect;
    let socket;

    function changeColor(color) {
        stopCurrentEffect();
        document.body.style.backgroundColor = color;
        discoBall.style.boxShadow = `0 0 20px ${color}`;
        statusElement.textContent = `Status: Color changed to ${color}`;
    }

    function strobe() {
        stopCurrentEffect();
        let isWhite = true;
        statusElement.textContent = 'Status: Strobe effect active';
        currentEffect = setInterval(() => {
            document.body.style.backgroundColor = isWhite ? 'white' : 'black';
            isWhite = !isWhite;
        }, 100);
    }

    function rainbow() {
        stopCurrentEffect();
        let hue = 0;
        statusElement.textContent = 'Status: Rainbow effect active';
        currentEffect = setInterval(() => {
            const color = `hsl(${hue}, 100%, 50%)`;
            document.body.style.backgroundColor = color;
            discoBall.style.boxShadow = `0 0 20px ${color}`;
            hue = (hue + 1) % 360;
        }, 10);
    }

    function pulse() {
        stopCurrentEffect();
        let scale = 1;
        let increasing = true;
        statusElement.textContent = 'Status: Pulse effect active';
        currentEffect = setInterval(() => {
            if (increasing) {
                scale += 0.01;
                if (scale >= 1.2) increasing = false;
            } else {
                scale -= 0.01;
                if (scale <= 1) increasing = true;
            }
            discoBall.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }, 20);
    }

    function stopCurrentEffect() {
        if (currentEffect) {
            clearInterval(currentEffect);
            currentEffect = null;
        }
        discoBall.style.transform = 'translate(-50%, -50%) scale(1)';
    }

    function processCommand(command) {
        if (command.includes('red')) changeColor('red');
        else if (command.includes('green')) changeColor('green');
        else if (command.includes('blue')) changeColor('blue');
        else if (command.includes('yellow')) changeColor('yellow');
        else if (command.includes('purple')) changeColor('purple');
        else if (command.includes('strobe')) strobe();
        else if (command.includes('rainbow')) rainbow();
        else if (command.includes('pulse')) pulse();
        else if (command.includes('off')) changeColor('black');
    }

    function connectWebSocket() {
        socket = new WebSocket('ws://localhost:8765');

        socket.onopen = function(e) {
            console.log("Connected to voice recognition server");
            statusElement.textContent = 'Status: Connected to voice recognition server';
            voiceBtn.textContent = 'Stop Voice Recognition';
        };

        socket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            console.log('Received command:', data.command);
            processCommand(data.command);
        };

        socket.onclose = function(event) {
            console.log("Disconnected from voice recognition server");
            statusElement.textContent = 'Status: Disconnected from voice recognition server';
            voiceBtn.textContent = 'Start Voice Recognition';
        };

        socket.onerror = function(error) {
            console.log(`WebSocket Error: ${error}`);
            statusElement.textContent = 'Status: Error connecting to voice recognition server';
        };
    }

    voiceBtn.addEventListener('click', () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
        } else {
            connectWebSocket();
        }
    });

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            changeColor(btn.dataset.color);
        });
        btn.style.backgroundColor = btn.dataset.color;
    });

    strobeBtn.addEventListener('click', strobe);
    rainbowBtn.addEventListener('click', rainbow);
    pulseBtn.addEventListener('click', pulse);
    offBtn.addEventListener('click', () => {
        changeColor('black');
        statusElement.textContent = 'Status: Disco lights turned off';
    });
});