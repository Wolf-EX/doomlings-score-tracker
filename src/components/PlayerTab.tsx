import React, { useRef, useState } from "react";
import type { Catastrophe, Player } from "../data/types";
import Popup from "./Popup";
import { checkScore } from "../util/score";
import qrlogo from "../assets/qr-icon.png";
import QRScanner from "./QRScanner";

type Props = {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    selectedPlayer: number;
    setSelectedPlayer: React.Dispatch<React.SetStateAction<number>>;
    selectedCatastrophe: Catastrophe;
};


export default function PlayerTab({players, setPlayers, selectedPlayer, setSelectedPlayer, selectedCatastrophe}: Props) {

    const [showAddPlayer, setShowAddPlayer] = useState<Boolean>(false);
    const [playerName, setPlayerName] = useState<string>("");
    const [genePool, setGenePool] = useState<number>(5);
    const [catastropheBonus, setCatastropheBonus] = useState<number>(0);
    const [useQr, setUseQr] = useState<boolean>(false);

    const uid = useRef(0);

     const onNewScanResult = (decodedText: string) => {

        const newPlayer: Player = JSON.parse(decodedText);
        if(newPlayer) {
            addPlayer(newPlayer);
            setUseQr(false);
            setShowAddPlayer(false);
        }
    };

    function onInputKeyDown(e: React.KeyboardEvent): void {
        if(showAddPlayer && e.key === 'Enter') {
            addPlayer();
        }
    }

    function showPlayerPopup() {
        setShowAddPlayer(true);
    }

    function hidePlayerPopup() {
        setPlayerName("");
        setGenePool(5);
        setCatastropheBonus(0);
        setShowAddPlayer(false);
    }

    function addPlayer(playerData?: Player) {
        if(playerData || playerName.trim().length > 0) {
            const _playerData: Player = playerData || {
                "id": 0,
                "name": playerName,
                "score": 0,
                "genePool": genePool,
                "traitPile": [],
                "hand": [],
                "modifier": [],
                "catastropheBonus": catastropheBonus
            }

            // Checks if duplicate playername and adds unique number to end of it
            const playerNames: string[] = players.map(p => p.name);
            let index: number = 0;
            let name: string = _playerData.name;

            while(playerNames.includes(name)) {
                name = `${_playerData.name}_${index.toString()}`;
                index++;
            }

            _playerData.name = name;
            _playerData.id = uid.current++
            const newPlayers = [...players, _playerData];

            checkScore(newPlayers, selectedCatastrophe);
            setPlayers(newPlayers);
            setGenePool(5);
            setCatastropheBonus(0);
            hidePlayerPopup();
        }
    }

    function onInputChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>): void {
            setPlayerName(e.target.value);
    }

    return (
        <div className="player-tab-container">
        {
        showAddPlayer && (
            <Popup className="add-player-popup-container">
                <h2>Add Player</h2>
                {
                    useQr ?
                    (
                        <div>
                            <QRScanner
                                fps={10}
                                qrbox={250}
                                disableFlip={false}
                                qrCodeSuccessCallback={onNewScanResult}
                            />
                            <button className="qr-scanner-button" onClick={() => setUseQr(false)}>Back</button>
                        </div>
                        
                    )
                    :
                    (
                        <div>
                            <input
                                className="add-player-popup-input"
                                placeholder="Enter name"
                                value={playerName}
                                onChange={e => onInputChange(e)}
                                onKeyDown={onInputKeyDown}
                                autoFocus
                            />
                            <div className="add-player-popup-gene-container">
                                <p>Gene Pool:</p>
                                <button onClick={() => setGenePool(Math.max(genePool - 1, 0))}>-</button>
                                {genePool}
                                <button onClick={() => setGenePool(Math.min(genePool + 1, 8))}>+</button>
                            </div>
                            <div className="add-player-popup-gene-container">
                                <p>Catastrophy Bonus:</p>
                                <button onClick={() => setCatastropheBonus(Math.max(catastropheBonus - 1, -10))}>-</button>
                                {catastropheBonus}
                                <button onClick={() => setCatastropheBonus(Math.min(catastropheBonus + 1, 10))}>+</button>
                            </div>

                            <div className="qr-scanner-container">
                                <div className="qr-scanner-img-container" onClick={() => setUseQr(true)}>
                                    <img src={qrlogo} />
                                </div>
                            </div>
                            <div className="add-player-popup-button-container">
                                <button onClick={() => addPlayer()}>Add</button>
                                <button onClick={hidePlayerPopup}>Cancel</button>
                            </div>
                        </div>
                    )
                }
            </Popup>
        )
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
                players.length < 6 && <div className="add-player-button" onClick={showPlayerPopup}>Add Player</div>
            }
            </div>
        </div>
    );
}