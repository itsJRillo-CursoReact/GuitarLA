import Guitarra from "./Guitarra"
import styles from "../styles/Listado.module.css"

const Listado = ({guitarras}) => {
  return (
    <div className={styles.contenido}>
         {guitarras.map(guitarra => (
            <Guitarra
              key={guitarra.url}
              guitarra={guitarra}
            />
        ))}
    </div>
  )
}

export default Listado