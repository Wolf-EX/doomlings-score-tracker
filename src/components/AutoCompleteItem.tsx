type Props = {
    cardName: string;
    onClick: () => void;
    isHighlighted: boolean;
};

export default function AutoCompleteItem({cardName, onClick, isHighlighted}: Props){
    return (
        <div className={isHighlighted ? 'highlighted' : '' + " autocomplete-item-container"} onClick={onClick}>
            {cardName}
        </div>
    );
}