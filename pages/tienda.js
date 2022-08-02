import Layout from "../components/Layout";
import ListadoGuitarra from "../components/ListadoGuitarra";

const Tienda = ({ guitarras }) => {
  return (
    <Layout pagina="Tienda">
      <main className="contenedor">
        <h1 className="heading">Nuestra colección</h1>
        <div>
          <ListadoGuitarra guitarras={guitarras} />
        </div>
      </main>
    </Layout>
  );
};
export async function getServerSideProps() {
  const url = `${process.env.API_URL}/guitarras`;
  const respuesta = await fetch(url);
  const guitarras = await respuesta.json();

  return {
    props: {
      guitarras,
    },
  };
}
export default Tienda;
