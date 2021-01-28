import React ,{useState}from 'react';
import Error from './Error'

const Formulario = ({guardarBusqueda}) => {

    const [error,guardarError]=useState(false)
    const [termino,guardarTermino]=useState('')

    const buscarImagenes = e =>{
        e.preventDefault();
        //validar
        if(termino.trim()===''){
            guardarError(true);
            return;
        }

        guardarError(false)


        //enviar el termino de busqueda al componente principal
        guardarBusqueda(termino)

    }

    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className='row' >
                <div className='form-group col-md-8'>
                    <input
                        type='text'
                        placeholder='Busca una imagen'
                        className='form-control form-control-lg'
                        onChange={e =>  guardarTermino( e.target.value)}
                    />
                </div>
                <div className='form-group col-md-4'>
                    <input
                        type='submit'
                        value='Buscar'
                        className='btn btn-lg btn-danger btn-block'
                    />
                </div>
            </div>
            {error?<Error mensaje='Ingresa un termino de busqueda valido' />:null}
        </form>
     );
}
 
export default Formulario;