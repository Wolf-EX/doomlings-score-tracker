type Props = {
    onClick: () => void;
};

export default function DeleteButton({onClick}: Props) {
    return (
        <div className="delete-button" onClick={onClick}>
            {
                '\u274C'
            }
        </div>
    );
}