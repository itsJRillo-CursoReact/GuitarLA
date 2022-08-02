import Image from "next/image";
import Layout from "../../components/Layout";
import { formatearFecha } from "../../helpers";
import styles from "../../styles/Entrada.module.css";

const EntradaBlog = ({ entrada }) => {
  const { titulo, contenido, imagen, published_at } = entrada;

  return (
    <Layout pagina={titulo}>
      <main className="contenedor">
        <h1 className="heading">{titulo}</h1>
        <article className={styles.entra}>
          <Image
            layout="responsive"
            width={800}
            height={600}
            src={imagen.url}
            alt={`imagen blog ${titulo}`}
          />
          <div className={styles.contenido}>
            <p className={styles.fecha}>
              Publicado el {formatearFecha(published_at)}
            </p>
            <p className={styles.texto}>{contenido}</p>
          </div>
        </article>
      </main>
    </Layout>
  );
};

/* 
Routing Dinámico

Consultando la API para obtener las entradas del Blog por ID

-------------------------------------------------
-- 

}

-------------------------------------------------

*/

// getStaticPath se encarga de recoger las urls que se
// van a cargar una vez nuestra app termine de construirse.


export async function getStaticPaths() {
  // Le pasamos la URL y fetcheamos aquellas que nos interesan
  const url = `${process.env.API_URL}/blogs`;
  const respuesta = await fetch(url);
  const entradas = await respuesta.json();

  // Una vez tengamos la respuesta de la API, se las pasamos a getStaticProps como params
  const paths = entradas.map((entrada) => ({
    params: { url: entrada.url },
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

    fallback: false
  };
}

// Hace otra petición a la API pero esta vez de
// los elementos que nos interesan, en este caso el ID,
// y retornamos la respuesta que ya es accesible para el componente

export async function getStaticProps({ params: { url } }) {
  const urlBlog = `${process.env.API_URL}/blogs?url=${url}`;
  const respuesta = await fetch(urlBlog);
  const entrada = await respuesta.json();

  return {
    props: { entrada: entrada[0] },
  };
}


export default EntradaBlog;
