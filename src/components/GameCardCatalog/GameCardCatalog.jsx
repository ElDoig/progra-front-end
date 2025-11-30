import "./GameCardCatalog.css";


const GameCardCatalog = ({ titulo, img }) => {
  return (
    <a href={"#"} className="catalog-card-link">
    <div className="catalog-card">
      <div className="catalog-circle">
        <img src={img} alt={titulo} />
      </div>
      <h3>{titulo}</h3>
    </div>
    </a>
  );
};


export default GameCardCatalog;