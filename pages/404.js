import Layout from "../components/Layout";
import Link from "next/link";
import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <h1 className="heading">Página no encontrada</h1>
      <Link href="/">Volver al Inicio &rarr;</Link>
    </div>
  );
};

export default NotFound;
