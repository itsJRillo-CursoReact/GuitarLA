import Head from 'next/head'
import Link from "next/link"
import Layout from '../components/Layout'

export default function Home() {
  return (    
    <Layout
    pagina="Inicio">
      <h1>Desde Inicio</h1>
      <Link href="/nosotros">A nosotros</Link>
    </Layout>
  )
}
