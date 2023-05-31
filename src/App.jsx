import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import { Modal } from './components/Modal'
import { generarId } from './helpers'
import { ListadoGastos } from './components/ListadoGastos'
import { Filtros } from './components/Filtros'

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  const [isValid, setIsValid] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar, setGastoEditar] = useState({})

  useEffect(() => {
    if (Object.keys(gastoEditar).length >0 ) {
      setModal(true)
   
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
    }
  }, [gastoEditar])
  
 useEffect(() => {
   localStorage.setItem('presupuesto', presupuesto ?? 0)
 }, [presupuesto])
 useEffect(() => {
  if (filtro) {
    const gastosFiltrados =  gastos.filter(gasto => gasto.categoria === filtro)
    setGastosFiltrados(gastosFiltrados)
  }
 }, [filtro])
 

 useEffect(() => {
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
  if (presupuestoLS > 0) {
   setIsValid(true)
  }
}, [])
useEffect(() => {
  localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
}, [gastos])

 
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      const gastosActuzalizado = gastos.map((gastoState) => gastoState.id === gasto.id ? gasto : gastoState) 
      setGastos(gastosActuzalizado)
      setGastoEditar({})
    }else{
      gasto.id = generarId()
      gasto.fecha=Date.now()
      setGastos([...gastos, gasto])
    }
    
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

const eliminarGasto= (id) => {
  const gastosActuzalizado = gastos.filter((gastoState) => gastoState.id!== id)
    setGastos(gastosActuzalizado)
}
  return (
    <div className={modal ? 'fijar':''}>
      <Header
        gastos={gastos}
        setGastos = {setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValid={isValid}
        setIsValid={setIsValid}
      />
      {
        isValid &&
        (
          <>
            <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />

              <ListadoGastos 
              
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className="nuevo-gasto">
              <img
                src={IconoNuevoGasto}
                alt="icon-gasto"
                onClick={handleNuevoGasto}

              />
            </div>
          </>
        )
      }
      {modal
        &&
        <Modal setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }


    </div>


  )
}

export default App
