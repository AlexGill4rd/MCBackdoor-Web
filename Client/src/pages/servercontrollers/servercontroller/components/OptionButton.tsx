import './OptionButtonStyle.scss';

function OptionButton(props: {Title: string, Description: string, onClick: any}){
    return (
        <div className="optionbutton" onClick={() => props.onClick()}>
            <div className="optionbutton-title">{props.Title}</div>
            <div className="optionbutton-description">{props.Description}</div>
        </div>
    );
}
export default OptionButton;