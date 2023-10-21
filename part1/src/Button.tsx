type HandleClick = {
    handleClick: () => void;
    label: string;
}

export const Button = ({handleClick, label}: HandleClick) => {
    return (
        <div>
            <button onClick={handleClick}>{label}</button>
        </div>
    )
};