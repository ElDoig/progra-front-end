import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Sobre nosotros</h3>
          <div className="footer-socials">
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Nosotros</h3>
          <ul>
            <li><a href="#">Conócenos</a></li>
            <li><a href="#">Responsabilidad Social</a></li>
            <li><a href="#">Nuestras Tiendas</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Atención al Cliente</h3>
          <ul>
            <li><a href="#">Ayuda</a></li>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Política de Privacidad</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 GamePlay. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;