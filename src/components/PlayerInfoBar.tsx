import React, { useState } from "react";
import type { Player } from "../data/types";
import DeleteButton from "./DeleteButton";
import Popup from "./Popup";
import QRCode from "react-qr-code";
import qrlogo from "../assets/qr-icon.png";
import EditButton from "./EditButton";

type Props = {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    selectedPlayer: number;
    setSelectedPlayer: React.Dispatch<React.SetStateAction<number>>;
};

export default function PlayerInfoBar({players, setPlayers, selectedPlayer, setSelectedPlayer}: Props) {

    const [showDeleteWarning, setShowDeleteWarning] = useState<Boolean>(false);
    const [showQRCode, setShowQRCode] = useState<boolean>(false);

    const player = players[selectedPlayer];
    const playerString = JSON.stringify(player);

    function onDelete(): void {
        setShowDeleteWarning(true);
    }

    function onQRClick(): void {
        setShowQRCode(true);
    }

    function deletePlayer(): void {
        const index = players.findIndex((e) => e.id === player.id);
        players.splice(index, 1);
        setPlayers([...players]);
        setSelectedPlayer(0);
        setShowDeleteWarning(false);
    }

    return (
        <>
        {
            showDeleteWarning && <Popup>
                <h2>Delete player?</h2>
                <div className="warning-popup-buttons-container">
                    <button onClick={deletePlayer}>Yes</button>
                    <button onClick={() => setShowDeleteWarning(false)}>No</button>
                </div>
            </Popup>
        }
        {
            showQRCode && <Popup className="qr-popup-container" onClick={() => setShowQRCode(false)}>
                <QRCode style={{width: "100%", height: "auto", maxWidth: "350px"}} value={playerString} />
            </Popup>
        }
        {
            player && <div className="player-info-bar">
                <div className="player-info-bar-name">{player.name.toUpperCase()}</div>
                <div className="player-info-bar-score">Score: {player.score}</div>
                <div className="player-info-button-container">
                    <div className="qrcode-container" onClick={onQRClick}>
                        <img className="qr-logo" src={qrlogo} />
                    </div>
                    <EditButton onClick={() => console.log("EditButton.onClick")} />
                    <DeleteButton onClick={onDelete} />
                </div>
            </div>
        }
        </>
    );
}