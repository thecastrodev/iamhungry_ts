import UXFoodsLogo from "./assets/UXFoods.png";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://uxsoftware.com.br" target="_blank">
          <img src={UXFoodsLogo} className="logo" alt="UXFoods logo" />
        </a>
      </div>
      <main>
        <h1>
          UXFoods é uma empresa especializada em trazer felicidade por meio do
          paladar!
        </h1>
      </main>
      <footer>
        Development by{" "}
        <a href="https://linkedin.com/in/thecastrodev" target="_blank">
          @thecastrodev
        </a>
      </footer>
    </>
  );
}

export default App;
