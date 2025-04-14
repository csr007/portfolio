import subprocess
import sys
import os
from threading import Thread
import webbrowser
import time

def run_flask():
    print("Starting Flask backend...")
    if sys.platform == 'win32':
        subprocess.run(['python', 'app.py'], check=True)
    else:
        subprocess.run(['python3', 'app.py'], check=True)

def run_nextjs():
    print("Starting Next.js frontend...")
    subprocess.run(['npm', 'run', 'dev'], check=True)

def open_browser():
    time.sleep(5)  # Wait for servers to start
    webbrowser.open('http://localhost:3000')  # Frontend
    webbrowser.open('http://localhost:5000')  # Backend

if __name__ == "__main__":
    try:
        # Start Flask in a separate thread
        flask_thread = Thread(target=run_flask)
        flask_thread.daemon = True
        flask_thread.start()

        # Start browser in a separate thread
        browser_thread = Thread(target=open_browser)
        browser_thread.daemon = True
        browser_thread.start()

        # Run Next.js in the main thread
        run_nextjs()

    except KeyboardInterrupt:
        print("\nShutting down servers...")
        sys.exit(0)
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1) 