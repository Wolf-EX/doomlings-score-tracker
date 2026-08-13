import traits from '../data/traits.json' with {type: 'json'};
import CardItem from './CardItem';

type Props = {
    traitList: string[];
    removeFn: Function;
};

export default function CardList({traitList, removeFn}: Props) {

    return (
        <ul className='scrollable'>
        {
            traitList && traitList.map((traitId, index) => {
                const traitName = traits.find(e => e.code === traitId.slice(0, 2))?.name;
                return (
                    <li key={traitId + index}>{<CardItem traitName={traitName} onClick={() => removeFn(traitList, index)} />}</li>
                )
            })
        }
        </ul>
    );
}