import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../App";
import { RaceSessionContext } from "../contexts/RaceSessionContext";

const NextRace = () => {
    const socket = useContext(SocketContext);
    const { raceSessions } = useContext(RaceSessionContext);
    const [nextRace, setNextRace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!socket) return;

        const fetchNextRace = () => {
            // Find current active race and next race
            const activeRace = raceSessions.find(session => session.status === 'in-progress');
            const nextAvailableRace = raceSessions.find(session => 
                session.status === 'upcoming' || session.status === 'confirmed'
            );

            setLoading(false);

            if (activeRace) {
                // If there's an active race, show the next one in queue
                if (nextAvailableRace) {
                    setNextRace({
                        sessionName: nextAvailableRace.sessionName,
                        drivers: nextAvailableRace.drivers.map((driver, index) => ({
                            ...driver,
                            car: `Car ${index + 1}`
                        }))
                    });
                    setMessage("");
                } else {
                    setNextRace(null);
                    setMessage("No more races scheduled");
                }
            } else {
                // If no active race, show the next available race
                if (nextAvailableRace) {
                    setNextRace({
                        sessionName: nextAvailableRace.sessionName,
                        drivers: nextAvailableRace.drivers.map((driver, index) => ({
                            ...driver,
                            car: `Car ${index + 1}`
                        }))
                    });
                    setMessage("");
                } else {
                    setNextRace(null);
                    setMessage("No upcoming race available");
                }
            }
        };

        const handleRaceStarted = () => {
            fetchNextRace();
        };

        const handleSessionEnded = () => {
            fetchNextRace();
            setMessage("Please proceed to the paddock");
        };

        // Initial fetch
        fetchNextRace();

        // Listen for race events
        socket.on("race-started", handleRaceStarted);
        socket.on("session-deleted", handleSessionEnded);
        socket.on("fetch-sessions-response", fetchNextRace);

        return () => {
            socket.off("race-started", handleRaceStarted);
            socket.off("session-deleted", handleSessionEnded);
            socket.off("fetch-sessions-response", fetchNextRace);
        };
    }, [socket, raceSessions]);


    // ** Full-Screen Toggle Function **
        const toggleFullScreen = () => {
            const element = document.documentElement;
            if (!document.fullscreenElement) {
             element.requestFullscreen().catch(err => {
                 console.error(`Error attempting to enable full-screen mode: ${err.message}`);
              });
          } else {
                document.exitFullscreen();
          }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Next Race</h1>
            <button style={styles.fullScreenButton} onClick={toggleFullScreen}>
                Toggle Fullscreen
            </button>
            {loading ? (
                <p style={styles.loading}>Loading...</p>
            ) : nextRace ? (
                <div style={styles.card}>
                    <h2 style={styles.subTitle}>
                        {message ? "RACE ENDED" : "UPCOMING RACE"}
                    </h2>
                    <p style={styles.sessionName}>{nextRace.sessionName}</p>
                    <div style={styles.driversContainer}>
                        <h3 style={styles.driversTitle}>DRIVERS</h3>
                        <ul style={styles.driversList}>
                            {nextRace.drivers.map((driver) => (
                                <li key={driver.id} style={styles.driverItem}>
                                    <span style={styles.driverName}>
                                        {driver.name}
                                    </span>
                                    <span style={styles.carNumber}>
                                        {driver.car}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {message && <p style={styles.message}>{message}</p>}
                </div>
            ) : (
                <p style={styles.message}>{message}</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
    },
    fullScreenButton: {
        position: "absolute", top: "10px", right: "10px", padding: "10px",
        fontSize: "16px", cursor: "pointer", background: "#007BFF",
        color: "#fff", border: "none", borderRadius: "5px"
    },
    title: {
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: "20px",
        textAlign: "center",
    },
    card: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        maxWidth: "400px",
        width: "100%",
    },
    subTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    sessionName: {
        fontSize: "18px",
        marginBottom: "20px",
    },
    driversContainer: {
        textAlign: "center",
    },
    driversTitle: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    driversList: {
        listStyleType: "none",
        padding: 0,
    },
    driverItem: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        marginBottom: "5px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    driverName: {
        fontSize: "16px",
    },
    carNumber: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    loading: {
        fontSize: "18px",
    },
    message: {
        fontSize: "24px",
        color: "#dc3545",
        fontWeight: "bold",
        textAlign: "center",
    }
};

export default NextRace;
