import DeleteButton from "./DeleteButton";

export default function CardItem({traitName, onClick}:{traitName: string | undefined, onClick: () => void}) {
    return (
        <div className="card-item-container">
            {traitName}
            <DeleteButton onClick={onClick} />
        </div>
    );
}