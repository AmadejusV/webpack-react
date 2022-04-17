import "../styles/index.scss";
import Recipes from "./Recipes";
import dark from "../images/kapoor.png"

const App = () => {
  return (
    <>
      <section className="my-section">
      </section>
        <main>
          <section>
            <h1>Oh hello there.</h1>
          </section>
          <img src={dark} alt="dark" width="240" />
        <Recipes />
        </main>
    </>
  )
}

export default App;