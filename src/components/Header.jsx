import { NuevoPresupuesto } from "./NuevoPresupuesto"
import { ControlPresupuesto } from "./ControlPresupuesto"

export const Header = ({gastos,setGastos,presupuesto,setPresupuesto,isValid,setIsValid}) => {
    
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {
        isValid ? 
        <ControlPresupuesto 
        setIsValid = {setIsValid}
        gastos={gastos}
        presupuesto={presupuesto}
        setGastos={setGastos}
        setPresupuesto={setPresupuesto}
        /> 
        :(
        <NuevoPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setIsValid={setIsValid}
        />
        ) }
    </header>
  )
}
