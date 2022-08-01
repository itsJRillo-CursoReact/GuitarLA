import Image from "next/image";
import Layout from "../../components/Layout";
import styles from "../../styles/Guitarra.module.css"

const VerGuitarra = ({ guitarra }) => {
  const { nombre, descripcion, precio, imagen, url } = guitarra;

  return (
    <Layout pagina={nombre}>
      <main className="contenedor">
        <h1 className="heading">{nombre}</h1>
        <div className={styles.entra}>
          <Image
            layout="responsive"
            width={800}
            height={600}
            src={imagen.url}
            alt={`Imagen Guitarra ${nombre}`}
          />
          <div className={styles.contenido}>
            <p className={styles.precio}>{precio}€</p>
            <p className={styles.descripcion}>{descripcion}</p> 
          </div>
        </div>
      </main>
    </Layout>
  );
};

/* 
Routing Dinámico

Consultando la API para obtener las entradas del Blog por ID

-------------------------------------------------
-- getServerSideProps()

    export async function getServerSideProps({ query: { id } }) {

    const url = `${process.env.API_URL}/blogs/${id}`;
    const respuesta = await fetch(url);
    const entrada = await respuesta.json();

    return {
        props: {entrada},
    };
    }
-------------------------------------------------

*/

// getStaticPath se encarga de recoger las urls que se
// van a cargar una vez nuestra app termine de construirse.

export async function getStaticPaths() {
  // Le pasamos la URL y fetcheamos aquellas que nos interesan
  const url = `${process.env.API_URL}/guitarras`;
  const respuesta = await fetch(url);
  const guitarras = await respuesta.json();

  // Una vez tengamos la respuesta de la API, se las pasamos a getStaticProps como params
  const paths = guitarras.map((guitarra) => ({
    params: { url: guitarra.url },
  }));

  return {
    paths,

    // Fallback (true) viene bien si tienes miles y miles de URL's
    // Next.js generará las rutas que sean solicitadas
    // y las demás estarán servidas de forma estática

    // Fallback (false) tienes que definir todas las rutas que
    // se construirán, que es lo que se está haciendo en este proyecto
    // Es bueno utilizarlo cuando el proyecto es de una escala pequeña

    // Fallback ("blocking"), tiene un comportamiento similar a getServerSideProps

    fallback: false,
  };
}

// Hace otra petición a la API pero esta vez de
// los elementos que nos interesan, en este caso el ID,
// y retornamos la respuesta que ya es accesible para el componente

export async function getStaticProps({ params: { url } }) {
  const urlGuitar = `${process.env.API_URL}/guitarras?url=${url}`;
  const respuesta = await fetch(urlGuitar);
  const guitarra = await respuesta.json();

  return {
    props: { guitarra:guitarra[0] },
  };
}

export default VerGuitarra;
