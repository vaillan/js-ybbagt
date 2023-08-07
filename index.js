// Imports section
import './style.css';
const _ = require('lodash');

/**
 * Variables globales
 */
const porcentajeDescuentos = [40, 20, 10];
let total = 0;
let subtotal = 0;
let descuento = 0;
let porcentajeAplicado = 0;

/**
 * Procesos Generales
 */

document.getElementById('c').addEventListener('click', onSubmit);

/**
 *Función para inicializar proceso principal
 *@return {void}
 */
function onSubmit(e) {
  let unidades = document.getElementById('unidades').value;
  let precioUnitario = document.getElementById('precioUnitario').value;
  calcular(unidades, precioUnitario);
  setAlert();
}

/**
 * Calcula el porcentaje de descuento al precio unitario.
 *
 * @param {integer} unidades
 * @param {integer} precioUnitario
 * @return {void}
 */
function calcular(unidades, precioUnitario) {
  if (unidades > 100) {
    //40%.
    setVariablesGlobales(porcentajeDescuentos[0], precioUnitario)
  } else if (_.inRange(unidades, 25, 100)) {
    //20%.
    setVariablesGlobales(porcentajeDescuentos[1], precioUnitario)
  } else if (_.inRange(unidades, 10, 24)) {
    //10%
    setVariablesGlobales(porcentajeDescuentos[2], precioUnitario)
  } else {
    if (unidades < 10) {
      setVariablesGlobales(0, precioUnitario)
    }
  }
}

/**
 * Configura variables globales
 * 
 * @param {integer} procentajeDescuento
 * @param {integer} precioUnitario
 * @returns {void}
 */
function setVariablesGlobales(procentajeDescuento, precioUnitario) {
  subtotal = precioUnitario;
  descuento = aplicarDescuento(procentajeDescuento / 100, subtotal);
  total = subtotal - descuento;
  porcentajeAplicado = procentajeDescuento;
}

/**
 * Aplica descuento al precio unitario.
 *
 *@param {float} porcentajeImpuesto
 *@param {integer} precioUnitario
 *@returns {float}
 */
function aplicarDescuento(porcentajeImpuesto, precioUnitario) {
  return precioUnitario * porcentajeImpuesto;
}

/**
 * Función para mostrar etiqueta de montos
 * @return {void}
 */
function setAlert() {
  let formatoMoneda = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  let alert = document.getElementById('alert');
  alert.removeAttribute('hidden');

  alert.innerHTML = `
  <p>Sub-total: 
    <span class="badge text-bg-secondary">${formatoMoneda.format(
      subtotal
    )}</span>
  </p>
  
  <p>Descuento aplicado: 
    <span class="badge text-bg-success">${formatoMoneda.format(
      descuento
    )}</span>
  </p>
 
  <p>Total a pagar:
    <span class="badge text-bg-success">${formatoMoneda.format(total)}</span>
  </p>

  <p>Porcentaje descuento:
    <span class="badge text-bg-warning">${porcentajeAplicado}%</span>
  </p>
  `;
}