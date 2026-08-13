type Props = {
    children?: React.ReactNode;
    className?: string;
    onClick?: Function;
}

export default function Popup({children, className, onClick}: Props) {

    function onClickFn() {
        if(onClick) {
            onClick();
        }
    }

    return (
        <div className="outer-modal" onClick={onClickFn}>
            <div className={className + " modal window"}>
                {
                    children
                }
            </div>
        </div>
    );
}