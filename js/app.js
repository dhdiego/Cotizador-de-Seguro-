/// Constructores

function Seguro(marca, year, tipo) {
    this.marca  = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI(){}

// Llena las opciones de los años

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 23 
          

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}


// realiza cotizacion

Seguro.prototype.cotizarSeguro = function(){

    /* 
     1 = americano 1.15
     2 = Asiatico 1.05
     3 = Europeo 1.35
    */

     let cantidad;
     const base = 2000;

     console.log(this.marca)

     switch(this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
     }

     // leer el año
     const diferencia = new Date().getFullYear() - this.year;
     /// cada año el costo se reduce un 3%

    cantidad -= ((diferencia *3 ) * cantidad ) / 100;



    /* si el seguro es basico se * 30% + 
    si es completo un 50% + */

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }

   return cantidad;

     
}

// muestra alertas en pantalla 

UI.prototype.mostrarMensaje = function(mensaje, tipo) {

    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('mensaje', 'error');

    }else {
        div.classList.add('mensaje', 'correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;


    //insertar en HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);

}

UI.prototype.mostrarResultado = (total, seguro) =>  {

    const {marca, year, tipo } = seguro;

    let textoMarca;


    switch(marca) {

        case '1': 
            textoMarca = 'Americano';
            break;
        case '2': 
            textoMarca = 'Asiatico';
            break;
        case '3': 
            textoMarca = 'Europeo';
            break;

        default:

            break;


    }
    // crear resultado

    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header"> Tu Resumen </p>
        <p class="font-bold"> Marca: <span class="font-normal" </span> ${textoMarca} </p>
        <p class="font-bold"> Año: <span class="font-normal" </span> ${year} </p>
        <p class="font-bold"> Tipo: <span class="font-normal capitalize" </span> ${tipo} </p>
        <p class="font-bold"> Total: <span class="font-normal" </span>$ ${total} </p>
    
    `;

    const resultadoDiv = document.querySelector('#resultado');
   


    // mostrar spinner

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';


    setTimeout(() => {
        spinner.style.display = 'none' // se borra spinner y se muestra resultado
        resultadoDiv.appendChild(div)
    }, 3000);


}

// instanciar UI

const ui = new UI();





document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); // llena el select con los años

})


eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);

}

function cotizarSeguro(e){
    e.preventDefault();

    // leer la marca

    const marca = document.querySelector('#marca').value;
    

    // leer el año
    const year = document.querySelector('#year').value;

    // leer el tipo de cobertura

    const tipo = document.querySelector('input[name="tipo"]:checked').value;
   
    if(marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos Los Campos Son Obligatorios', 'error');
        
        return;

    } else {
        ui.mostrarMensaje('Cotizando', 'exito');

        // ocultar cotizaciones previas

        const resultados = document.querySelector('#resultado div');

        if(resultados != null) {
            resultados.remove();
        }
    }

    // instanciar el seguro

    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro()

    

    // utilizar prototype que va a cotizar

    ui.mostrarResultado(total, seguro);


   
}