import {submitFormulario, leerValor} from './funciones.js'
import {consultarCriptomonedas} from './api.js'
import {criptomonedasSelect, form, monedaSelect} from './interfaz.js'

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas()
    form.addEventListener('submit', submitFormulario)

    criptomonedasSelect.addEventListener('change', leerValor)
    monedaSelect.addEventListener('change', leerValor)
})