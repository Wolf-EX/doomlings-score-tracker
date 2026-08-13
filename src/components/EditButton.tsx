type Props = {
    onClick: () => void;
};


export default function EditButton({onClick}: Props) {
    return (
        <div className="delete-button" onClick={onClick}>
            {
                '\u270E'
            }
        </div>
    )
}