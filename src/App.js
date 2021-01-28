import React ,{useEffect,useState} from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda,guardarBusqueda]=useState('')
  const [imagenes,guardarImagenes]=useState([])
  const [paginactual,guardarPaginactual]=useState(1)
  const [totalpaginas,guardarTotalPaginas]=useState(1)

  useEffect(()=>{
    const consultarApi= async ()=>{

      if(busqueda==='') return 

      const imagenesPorPagina=30;
      const key = '19399336-8dce5a72ed2c1c3ad41844b53'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginactual}`

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      guardarImagenes(resultado.hits)

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)

      guardarTotalPaginas(calcularTotalPaginas)

      //mover la pantalla hasta el inicio

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'})
    }

    consultarApi()
    

  },[busqueda,paginactual])

  //definir la pagina anterior
  const paginaAnterior = ()=>{
    const nuevaPaginaActual = paginactual - 1;

    if(nuevaPaginaActual === 0) return

    guardarPaginactual(nuevaPaginaActual)

  }

  //definir la pagina siguiente 
  const paginaSiguiente = ()=>{

    const nuevaPaginaActual = paginactual + 1;

    if(nuevaPaginaActual > totalpaginas) return

    guardarPaginactual(nuevaPaginaActual)

  }


  return (
    <div className='container' >
      <div className='jumbotron'>
        <p className='text-center lead' >Buscador De Imagenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className='row justify-content-center'>
        <ListadoImagenes
          imagenes={imagenes}
        />
        {(paginactual === 1 )? null :( <button 
          onClick={paginaAnterior}
          type='button'
          className='btn btn-info mr-1'
        >&laquo;Anterior</button>
        )}
       
       {(paginactual === totalpaginas)?null :(<button 
          onClick={paginaSiguiente}
          type='button'
          className='btn btn-info mr-1'
        >Siguiente &raquo;</button>
        )}
        
      </div>
    </div>
  );
}

export default App;
