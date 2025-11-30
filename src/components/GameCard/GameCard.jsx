import './GameCard.css';

const GameCard = (props) => {
    return(
        <article>
              <h3>{props.titulo}</h3>
              <h4>{props.categoria}</h4>
              <img src={props.img} />
              <p>{props.descripcion}</p>
              <p>S/ {props.precio}</p>
        </article>
    )
}

export default GameCard