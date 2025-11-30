import "./BestSeller.css";

const BestSeller = ({ titulo, categoria, precio, img }) => {
  return (
    <div className="product-card">
      <img src={img} alt={titulo} />
      <h3>{titulo}</h3>
      <p>{categoria}</p>
      <p>S/ {precio.toFixed(2)}</p>
      <button>Agregar</button>
    </div>
  );
};

export default BestSeller;