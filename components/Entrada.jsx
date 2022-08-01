import styles from "../styles/Entrada.module.css";
import { formatearFecha } from "../helpers/index.js";
import Link from "next/link";
import Image from "next/image";

const Entrada = ({ entrada }) => {
  const { titulo, resumen, imagen, published_at, id, url} = entrada;

  return (
    <article>
      <Image
        priority="true"
        width={800}
        height={600}
        src={imagen.url}
        alt={`imagen blog ${titulo}`}
        layout="responsive"
      />
      <div className={styles.contenido}>
        <h3>{titulo}</h3>
        <p className={styles.fecha}>{formatearFecha(published_at)}</p>
        <p className={styles.resumen}>{resumen}</p>
        <Link href={`/blog/${url}`}>
          <a className={styles.enlace}>Leer entrada</a>
        </Link>
      </div>
    </article>
  );
};

export default Entrada;
