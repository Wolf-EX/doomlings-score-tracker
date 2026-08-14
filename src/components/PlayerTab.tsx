import React, { useState } from "react";
import type { Catastrophe, Player } from "../data/types";
import AddPlayerWindow from "./AddPlayerWindow";

type Props = {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    selectedPlayer: number;
    setSelectedPlayer: React.Dispatch<React.SetStateAction<number>>;
    selectedPlayerName: string;
    setSelectedPlayerName: React.Dispatch<React.SetStateAction<string>>;
    selectedCatastrophe: Catastrophe;
    uId: {current: number}
};

export default function PlayerTab({
    players,
    setPlayers,
    selectedPlayer,
    setSelectedPlayer,
    selectedPlayerName,
    setSelectedPlayerName,
    selectedCatastrophe,
    uId
}: Props) {
    
    const [showAddPlayer, setShowAddPlayer] = useState<Boolean>(false);

    return (
        <div className="player-tab-container">
            {
                showAddPlayer && <AddPlayerWindow
                    players={players}
                    setPlayers={setPlayers}
                    selectedPlayerName={selectedPlayerName}
                    setSelectedPlayerName={setSelectedPlayerName}
                    selectedCatastrophe={selectedCatastrophe}
                    showAddPlayer={showAddPlayer}
                    setShowAddPlayer={setShowAddPlayer}
                    edit={false}
                    uId={uId}
                />
            }
            <h2>Players</h2>
            <div className="player-item-container">
            {
                players.map((player, index) => (
                    <div 
                        className={selectedPlayer === index ? 'player-highlighted' : 'player-button'}
                        key={player.id}
                        onClick={() => setSelectedPlayer(index)}
                    >
                        <div className="player-item">
                            <div>{player.name} </div>
                            ({player.score})
                        </div>
                    </div>
                ))
            }
            {
                players.length < 6 && <div className="add-player-button" onClick={() => setShowAddPlayer(true)}>Add Player</div>
            }
            </div>
        </div>
    );
}