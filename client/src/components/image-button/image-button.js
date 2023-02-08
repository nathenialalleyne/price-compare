import './image-button.scss'

export function ImageButton(props){
const image = props.img

    return(
        <button className="img-button-container">
            <img className="button-img" src={image}></img>
        </button>
    )
} 