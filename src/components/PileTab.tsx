type Props = {
    selectedPile: number;
    setSelectedPile: React.Dispatch<React.SetStateAction<number>>;
};

export default function PileTab({selectedPile, setSelectedPile}: Props) {
    return (
        <div className="pile-tab-container">
            <div
                className={`tab-${selectedPile === 0 ? 'selected' : 'unselected'}`}
                onClick={() => setSelectedPile(0)}
            >
                Traits
            </div>
            <div
                className={`tab-${selectedPile === 1 ? 'selected' : 'unselected'}`}
                onClick={() => setSelectedPile(1)}
            >
                Hand
            </div>
            <div
                className={`tab-${selectedPile === 2 ? 'selected' : 'unselected'}`}
                onClick={() => setSelectedPile(2)}
            >
                Discard
            </div>
        </div>
    );
}