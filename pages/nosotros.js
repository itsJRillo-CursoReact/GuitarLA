import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Nosotros.module.css"

const Nosotros = () => {
  return (
    
    <Layout
    pagina="Nosotros">
        <main className="contenedor">
            <h2 className="heading">Nosotros</h2>
            <div className={styles.contenido}>
                <Image layout="responsive" width={600} height={450} src="/img/nosotros.jpg" alt="imagenSobreNosotros"/>
                <div>
                    <p>Et anim nisi deserunt labore ad eiusmod quis reprehenderit officia quis cupidatat elit. Voluptate dolore fugiat occaecat anim irure deserunt elit deserunt officia reprehenderit. Mollit pariatur magna sunt ipsum. Nostrud incididunt ullamco sint enim commodo exercitation.</p>
                    <p>Et anim nisi deserunt labore ad eiusmod quis reprehenderit officia quis cupidatat elit. Voluptate dolore fugiat occaecat anim irure deserunt elit deserunt officia reprehenderit. Mollit pariatur magna sunt ipsum. Nostrud incididunt ullamco sint enim commodo exercitation.</p>
                </div>
            </div>
        </main>
      
    </Layout>
    
  );
};

export default Nosotros;
