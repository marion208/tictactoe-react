import './GridBox.css';

function GridBox(props) {
    return (
        <div className="Box EmptyBox" onClick={() => props.boxClicked()}>
            <p id={props.id_box}></p>
        </div>
    )
}

export default GridBox;