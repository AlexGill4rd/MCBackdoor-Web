import './FeatureButtonStyle.scss';

function FeatureButton(props: {title: string, description: string, onClick: any;}){
    return (
        <div className="feature-button" onClick={props.onClick}>
            <div className="feature-button-title">{props.title}</div>
            <div className="feature-button-description">{props.description}</div>
        </div>
    );
}
export default FeatureButton;