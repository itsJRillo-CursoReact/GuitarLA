import Layout from "../components/Layout";
import ListadoGuitarra from "../components/ListadoGuitarra";
import Curso from "../components/Curso";
import ListadoBlog from "../components/ListadoBlog";

export default function Home({ guitarras, curso, entradas }) {
  return (
    <Layout pagina="Inicio"
      guitarra={guitarras[3]}>
      <main className="contenedor">
        <h1 className="heading">Nuestra Colección</h1>
        <ListadoGuitarra guitarras={guitarras} />
      </main>

      <Curso curso={curso} />
      <ListadoBlog entradas={entradas}/>
    </Layout>
  );
}

// Múltiples consultas en Next.js

export async function getServerSideProps() {
  /*
  // Syntaxis correcta, pero mal perfomance de la web
  
    const urlGuitar = `${process.env.API_URL}/guitarras`;
    const res1 = await fetch(urlGuitar);
    const guitarras = await res1.json();    

    const urlCursos = `${process.env.API_URL}/cursos`;
    const res2 = await fetch(urlCursos);
    const cursos = await res2.json();
    */

  const urlGuitar = `${process.env.API_URL}/guitarras?_limit=6`;
  const urlCursos = `${process.env.API_URL}/cursos`;
  const urlBlogs = `${process.env.API_URL}/blogs?_limit=3`;

  const [resGuitarra, resCursos, resEntradas] = await Promise.all([
    fetch(urlGuitar),
    fetch(urlCursos),
    fetch(urlBlogs)
  ]);

  const [guitarras, curso, entradas] = await Promise.all([
    resGuitarra.json(),
    resCursos.json(),
    resEntradas.json()
  ]);

  return {
    props: {
      guitarras,
      curso,
      entradas
    }
  };
}
