import {selectCriptomonedas, mostrarCotizacionHTML, mostrarSpinner} from "./funciones.js"
import {objBusqueda} from "./interfaz.js"

//crear promise

const obtenerCriptomonedas = criptomonedas => new Promise (resolve => {
    resolve(criptomonedas)
})

export function consultarCriptomonedas () {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

    fetch(url)
        .then( response => response.json())
        .then( resultado => obtenerCriptomonedas(resultado.Data))
        .then( criptomonedas => selectCriptomonedas(criptomonedas))
}

export function consultarAPI () {
    const {moneda, criptomoneda} = objBusqueda
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    mostrarSpinner()

    fetch(url) 
        .then( response => response.json())
        .then( cotizacion => {
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
        })
}

