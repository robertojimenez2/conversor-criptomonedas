import { criptomonedasSelect, objBusqueda, resultado} from "./interfaz.js"
import {consultarAPI} from "./api.js"


export function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach( cripto => {
        const {Name, FullName} = cripto.CoinInfo

        const option = document.createElement('option')
        option.value = Name
        option.text = FullName
        
        criptomonedasSelect.appendChild(option)
    })
    const monedaDOGE = document.createElement('option')
        monedaDOGE.value = 'DOGE'
        monedaDOGE.text = 'Dogecoin'
        
        criptomonedasSelect.appendChild(monedaDOGE)
}

export function leerValor (e) {
    objBusqueda[e.target.name] = e.target.value
}

export function submitFormulario(e) {
    e.preventDefault()
    
    //validar
    const {moneda, criptomoneda} = objBusqueda

    if(moneda === '' || criptomoneda === '') {
        mostrarAlerta('Todos los campos son obligatorios')
        return
    }

    //consultar API
    consultarAPI()
}

export function mostrarCotizacionHTML(cotizacion) {
    console.log(cotizacion);
    limpiarHTML()
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE, TOTALVOLUME24H, MARKET, LASTMARKET} = cotizacion

    const precio = document.createElement('p')
    precio.classList.add('precio')
    precio.innerHTML = `Valor actual: <span>${PRICE}</span>`

    const precioAlto = document.createElement('p')
    precioAlto.innerHTML = `Valor mas alto del dia: <span>${HIGHDAY}</span>`

    const precioBajo = document.createElement('p')
    precioBajo.innerHTML = `Valor mas bajo del dia: <span>${LOWDAY}</span>`

    const ultimasHoras = document.createElement('p')
    ultimasHoras.innerHTML = `Variacion en las últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`

    const volumenUltimasHoras = document.createElement('p')
    volumenUltimasHoras.innerHTML = `Volumen en las últimas 24 horas: <span>${TOTALVOLUME24H}</span>`

    const ultimaActualizacion = document.createElement('p')
    ultimaActualizacion.innerHTML = `Ultima actualización: <span>${LASTUPDATE}</span>`

    const ultimoMercado = document.createElement('p')
    ultimoMercado.innerHTML = `Market: <span>${LASTMARKET}</span>`

    const consulta = document.createElement('p')
    consulta.innerHTML = `Datos obtenidos de: <span>${MARKET}</span>`

    resultado.appendChild(precio)
    resultado.appendChild(precioAlto)
    resultado.appendChild(precioBajo)
    resultado.appendChild(ultimasHoras)
    resultado.appendChild(volumenUltimasHoras)
    resultado.appendChild(ultimaActualizacion)
    resultado.appendChild(ultimoMercado)
    resultado.appendChild(consulta)
}

function mostrarAlerta(msg) {
    const existeError = document.querySelector('.error')
    if(!existeError) {
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('error')
    
        divMensaje.textContent = msg
        resultado.appendChild(divMensaje)
    
        setTimeout(() => {
            divMensaje.remove()
        }, 3000)
    
    }
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

export function mostrarSpinner() {
    limpiarHTML()
    const spinner = document.createElement('div')
    spinner.classList.add('spinner')

    spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
    `

    resultado.appendChild(spinner)
}

