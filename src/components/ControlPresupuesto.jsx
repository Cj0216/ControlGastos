import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
export const ControlPresupuesto = ({ gastos,
    presupuesto,
    setGastos,
    setPresupuesto,
    setIsValid
}) => {
    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        console.log(totalGastado)
        const totalDisponible = presupuesto - totalGastado;
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
        setPorcentaje(nuevoPorcentaje)
        setDisponible(totalDisponible)
        setGastado(totalGastado)
    }, [gastos])

    const handleResetApp = () => {
        const resultado = confirm('Seguro que quieres reiniciar la app?')
        if (resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValid(false)
        }

    }

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }


    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas" >
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? 'red' : '#3B82F6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 100 ? 'red' : '#3B82F6',
                        trailWidth: 2,
                        textWidth: 100,
                        percentColor: '#3B82F6',
                    })}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto</span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible</span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado</span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}
