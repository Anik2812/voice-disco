import speech_recognition as sr
import asyncio
import websockets
import json

recognizer = sr.Recognizer()

async def recognize_speech():
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
    try:
        text = recognizer.recognize_google(audio)
        print(f"Recognized: {text}")
        return text.lower()
    except sr.UnknownValueError:
        print("Could not understand audio")
        return ""
    except sr.RequestError as e:
        print(f"Could not request results; {e}")
        return ""

async def handle_client(websocket, path):
    while True:
        command = await recognize_speech()
        if command:
            await websocket.send(json.dumps({"command": command}))

async def main():
    server = await websockets.serve(handle_client, "localhost", 8765)
    print("Voice recognition server started")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())