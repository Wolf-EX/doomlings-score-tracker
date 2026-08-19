import { useEffect, useRef, useState } from 'react';
import type { Catastrophe, Player } from '../data/types';
import catastrophe from '../data/catastrophe.json' with {type: 'json'};
import { checkScore } from '../util/score';

type Props = {
    players: Player[];
    selectedCatastrophe: Catastrophe;
    setSelectedCatastrophe: React.Dispatch<React.SetStateAction<Catastrophe>>;
};

export default function CatastropheButton({players, selectedCatastrophe, setSelectedCatastrophe}: Props) {
    const [showCatastropheList, setShowCatastropheList] = useState<boolean>(false);
    const [catastropheName, setCatastropheName] = useState<string>("None");

    const catastropheRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        function onOuterClick(event: MouseEvent) {
            if(catastropheRef.current && event.target instanceof Node && !catastropheRef.current.contains(event.target)) {
                setShowCatastropheList(false);
            }
        }

        document.addEventListener("mouseup", onOuterClick);

        return () => {
            document.removeEventListener("mouseup", onOuterClick);
        }
    }, [catastropheRef])
    
    function onCatastropheClick(catastropheItem: Catastrophe): void {
        setSelectedCatastrophe(catastropheItem);
        setCatastropheName(catastropheItem.name);
        setShowCatastropheList(false);
        checkScore(players, catastropheItem);
    }

    function catastropheButtonClick(): void {
        setShowCatastropheList(true);
    }

    return (
        <div ref={catastropheRef}>
            <button className='catastrophe' onClick={catastropheButtonClick}>
                Catastrophe: {selectedCatastrophe === null ? "None" : catastropheName}
            </button>
            <div className='list-container'>
                {
                    showCatastropheList && catastrophe.map((catastropheItem, index: number) => (
                        <div
                            key={index + catastropheItem.id}
                            className='list-item'
                            onClick={() => onCatastropheClick(catastropheItem as Catastrophe)}
                        >
                            {catastropheItem.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}