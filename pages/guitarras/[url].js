import Image from "next/image";
import { useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Guitarra.module.css";

const VerGuitarra = ({ guitarra, agregarCarrito }) => {
  const { nombre, descripcion, precio, imagen, id } = guitarra[0];
  const [cantidad, setCantidad] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cantidad < 1) {
      alert("Cantidad no válida");
      return;
    }

    const guitarraSeleccionada = {
      id,
      imagen: imagen.url,
      nombre,
      precio,
      cantidad,
    };

    agregarCarrito(guitarraSeleccionada);
    alert(`Guitarra ${nombre} se ha subido al carrito`);
  };

  return (
    <Layout pagina={`Guitarra ${nombre}`}>
      <div className={styles.guitarra}>
        <Image
          priority="true"
          width={180}
          height={350}
          src={imagen.url}
          alt={`imagen guitarra ${nombre}`}
          layout="responsive"
        />
        <div className={styles.contenido}>
          <h1>{nombre}</h1>
          <p className={styles.descripcion}>{descripcion}</p>
          <p className={styles.precio}>{precio} €</p>
          <form onSubmit={handleSubmit} className={styles.formulario}>
            <label>Cantidad:</label>
            <select
              onChange={(e) => setCantidad(parseInt(e.target.value))}
              value={cantidad}
            >
              <option value="0">-- Seleccione --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
            <input value="Agregar al Carrito" type="submit"></input>
          </form>
        </div>
      </div>
    </Layout>
  );
};

/* 
Routing Dinámico

Consultando la API para obtener las entradas del Blog por ID

-------------------------------------------------

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
    props: { guitarra: guitarra[0] },
  };
}

-------------------------------------------------

*/

export async function getServerSideProps({ query: { url } }) {
  const urlGuitar = `${process.env.API_URL}/guitarras?url=${url}`;
  const respuesta = await fetch(urlGuitar);
  const guitarra = await respuesta.json();

  return {
    props: { guitarra },
  };
}

export default VerGuitarra;
