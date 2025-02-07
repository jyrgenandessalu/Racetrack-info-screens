# Racetrack

## Overview
The Racetrack App is a real-time race management system built with Node.js, React and Socket.IO. It allows receptionists, safety officials, and spectators to manage and view race sessions efficiently. This application includes interfaces for various roles, each designed to simplify specific tasks.

---

## Features

- Configure race sessions, drivers, and cars.
- Real-time race tracking with lap times and flag statuses.
- Public displays for spectators and race drivers.
- Secure employee interfaces requiring access keys.
- Real-time updates without polling.

---

## How to Run the Server

### Prerequisites
1. Ensure [Node.js](https://nodejs.org/) and npm are installed.
2. Ensure React is installed at the latest version
    ```bash
   npm install react-scripts@latest
   ```
3. Install the required dependencies by running:

   ```bash
   npm install
   ```

### Checking Environment Variables
Before starting the server, check the following environment variables in /racetrack/backend/.env file:

- `receptionist_key` (Access key for Receptionist interface)
- `observer_key` (Access key for Lap-line Observer interface)
- `safety_key` (Access key for Safety Official interface)

The keys are needed to access the interfaces.

### Start the Server

- To run the backend server by navigating to racetrack/backend and inserting:

  ```bash
  npm start
  ```

- Then run the frontend server by navigating to racetrack/frontend/client and inserting:

  ```bash
  npm start
  ```

---

## System Interfaces and Routes

### Employee Interfaces (Admin Login Required)

| Interface        | Persona            | Route            |
|------------------|--------------------|------------------|
| Front Desk       | Receptionist       | `/front-desk`    |
| Race Control     | Safety Official    | `/race-control`  |
| Lap-line Tracker | Lap-line Observer  | `/lap-line-tracker` |

### Public Displays (No Login Required)

| Interface      | Persona         | Route             |
|----------------|-----------------|-------------------|
| Leader Board   | Spectator       | `/leader-board`   |
| Next Race      | Race Driver     | `/next-race`      |
| Race Countdown | Race Driver     | `/race-countdown` |
| Race Flags     | Race Driver     | `/race-flags`     |

---

## User Guide

### Front Desk Interface (`/front-desk`)

1. **Accessing the Interface**:
    - Enter the receptionist access key to unlock the interface.
2. **Configuring Races**:
    - View the list of upcoming race sessions.
    - Add a new session with drivers by providing their names (names must be unique within a session).
    - Remove or edit existing race sessions or drivers.

### Race Control Interface (`/race-control`)

1. **Accessing the Interface**:
    - Enter the safety official access key to unlock the interface.
2. **Managing Races**:
    - Start the race using the "Start Race" button.
    - Use the flag mode buttons (Safe, Hazard, Danger, Finish) to change the flag status in real time.
    - End the session once all cars are in the pit lane.

### Lap-line Tracker Interface (`/lap-line-tracker`)

1. **Accessing the Interface**:
    - Enter the observer access key to unlock the interface.
2. **Recording Lap Times**:
    - Press the car’s button as it crosses the lap line to log its lap time.
    - Buttons are disabled after the race ends.

### Leader Board Interface (`/leader-board`)

1. **Accessing the Interface**:
    - Open the `/leader-board` route in a browser.
2. **Viewing Leader Board**:
    - Displays the fastest lap times and current race standings in real time.
    - Includes race session timer and flag status.

### Next Race Interface (`/next-race`)

- Displays the upcoming race session drivers and their assigned car numbers.

### Race Countdown Interface (`/race-countdown`)

- Shows the timer for the current race session.

### Race Flags Interface (`/race-flags`)

- Displays the current flag status in full screen.
- Supports Safe, Hazard, Danger, and Finish flags.

### Accessing Interfaces on Devices Across Networks

The interfaces can currently only be accessed from the same device hosting the application. To provide access to the interfaces from other devices or networks, a tunneling service like **ngrok** must be used. Follow the steps below to set it up:

1. **Sign Up for ngrok**  
   - Sign up for the free version of ngrok at [ngrok.com](https://ngrok.com).

2. **Install ngrok on the Hosting Device**  
   - Download and install ngrok on the computer that will be hosting the application. Follow the instructions provided by ngrok for your operating system.

3. **Start the Backend**  
   - Run the backend by navigating to the project directory in your terminal and executing:
   ```bash
   npm start
   ```

4. **Start ngrok**  
    - In a separate terminal, run the following command to start ngrok:
    ```bash
    ngrok http --host-header=localhost:3000 3000
    ```

    - This will provide a public URL (e.g., https://<random-subdomain>.ngrok.io). Note this URL.
5.  **Update the Frontend URL**
    - Replace the URL(const newSocket) in App.js(racetrack/frontend/client/App.js) with the public ngrok URL

6.  **Start the Frontend**
    - In another terminal, navigate to the frontend project directory and run:
        ```bash
        npm start
        ```

    -  The client must opened through the ngrok public URL and not localhost:3000
---


## Error Handling

1. If an incorrect access key is entered, the system will delay for 500ms and display an error message.
2. If environment variables are not set, the server will fail to start and provide an error message.

---

## Notes

- This application is an MVP.
- Ensure all devices accessing the interfaces are on the same network or use a tunneling service (e.g., ngrok) to expose the server.
- To run the command npm run dev the raceData.js file needs to be removed temporarily. Data will not persist in developer mode.
- Race session data is persisted and stored in the backend/server/data/races.json file. Session data is read from this file when the server starts but is only useful when interfaces are open. This file should be deleted between test runs.

---

## Development and Contributions

Made by Oskar Kusmin, Sulev Sillaste, Jürgen Andessalu
