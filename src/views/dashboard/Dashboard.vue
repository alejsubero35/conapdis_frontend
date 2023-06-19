<template>
  <div>
 <!--    <div class="cabecera">
      <img style="object-fit: cover;" src="img/logos_conapdis/CABECERA.png"  alt="">
    </div> -->
    <div class="contenedor">
      <div class="div1">
          <h4>Infografía Historia del Conapdis</h4>
          <v-timeline dense clipped>
            <v-timeline-item fill-dot class="white--text mb-2" color="#fdbd1a" large>
              <template v-slot:icon>
                <span>2015</span>
              </template>
              <div class="spam">
                <span>Instalacion del Consejo Presidencial de personas con discapacidad, encuentros estadales en 13 entidades federales</span>
              </div>
            </v-timeline-item>
            <v-timeline-item fill-dot class="white--text mb-2" color="#4f9cb9" large>
              <template v-slot:icon>
                <span>2014</span>
              </template>
              <div class="spam">
                <span>Designada Presidenta del Conapdis y de la MJGH Soc. Soraida Ramírez. Gaceta Oficial N° 40.567</span>
              </div>
            </v-timeline-item>
            <v-timeline-item fill-dot class="white--text mb-2" color="#a9ce58" large>
              <template v-slot:icon>
                <span>2013</span>
              </template>
              <div class="spam">
                <span>Descentralización del proceso de Certificación: Se inauguran 12 Unidades Regionales de Certificación
                  Ferias de Empleo para Personas con Discapacidad
                  Firma de acuerdos con: Fundación Casa del Artísta, INTT, Metro de Caracas y la ONA
                  Jornadas de Atención Integral para Personas con Discapacidad
                  Designado Presidente del Conapdis y de la MJGH Abog. Alejandro Zamora. Gaceta Oficial N° 40.283
                  Suscripción a la Convención Internacional de Derechos de las Personas con Discapacidad ante la ONU
                  Fortalecimiento del Sistema Nacional de Atención Integral de acuerdo al Nuevo Modelo Socialista Revolucionario</span>
              </div>
            </v-timeline-item>
            <v-timeline-item fill-dot class="white--text mb-2" color="#fdbd1a" large>
              <template v-slot:icon>
                <span>2012</span>
              </template>
              <div class="spam">
                <span>Designado Presidente del Conapdis Edgar Araujo. Gaceta Oficial N° 39.666
                  Discusión para la construcción del Proyecto de Reglamento de Ley en los 24 Estados</span>
              </div>
            </v-timeline-item>
            <v-timeline-item fill-dot class="white--text mb-2" color="#4f9cb9" large>
              <template v-slot:icon>
                <span>2011</span>
              </template>
              <div class="spam">
                <span>Conapi pasa a ser Conapdis desde el 05/01 Gaceta Oficial N° 38.598</span>
              </div>
            </v-timeline-item>
            <v-timeline-item fill-dot class="white--text mb-2" color="#d54949" large>
              <template v-slot:icon>
                <span>2005</span>
              </template>
              <div class="spam">
                <span>Designada Presidenta del Conapi Ludyt Ramírez
                  Aprobación en sesión extraordinaria de la Asamblea Nacional de Ley para las Personas con Discapacidad</span>
              </div>
            </v-timeline-item>
            <v-timeline-item fill-dot class="white--text mb-2" color="#a9ce58" large>
              <template v-slot:icon>
                <span>2004</span>
              </template>
              <div class="spam">
                <span>Designado Presidente del Conapi Carlos Angulo</span>
              </div>
            </v-timeline-item>
            <v-timeline-item fill-dot class="white--text mb-2" color="#4f9cb9" large>
              <template v-slot:icon>
                <span>1999</span>
              </template>
              <div class="spam">
                <span>Designado Presidente del Conapi Lenín Molina
                  Constitución de la República Bolivariana de Venezuela. Art. 81. Inclusión de las Personas con Discapacidad y sus derechos</span>
              </div>
            </v-timeline-item>
            <v-timeline-item fill-dot class="white--text mb-2" color="#fdbd1a" large>
              <template v-slot:icon>
                <span>1994</span>
              </template>
              <div class="spam">
                <span>Se crea el Conapi y se promulga la Ley para la Integración de Personas Incapacitadas LIPI</span>
              </div>
            </v-timeline-item>
          </v-timeline>
          <div class="logo">
            <img style="object-fit: cover;" src="img/logos_conapdis/rutaconapdis.png"  alt="">
          </div>
      </div>
      <div class="div2">
      
          <div class="mision">
           <h4><strong>Misión</strong></h4>
           <p>Dignificar la calidad de vida de las personas con discapacidad, mediante las políticas públicas desarrolladas 
            por el Gobierno Nacional garantizando así, la atención integral, la prevención de la discapacidad y la inclusión 
            participativa y protagónica de este colectivo y sus familiares en la sociedad de la República Bolivariana de Venezuela.</p>
          </div>
          <div class="mision mt-5">
            <h4><strong>Visión</strong></h4>
            <p>Ser el órgano nacional de referencia internacional en brindar de manera eficaz y oportuna las respuestas necesarias 
              en materia de discapacidad a todos los ciudadanos y ciudadanas de la República Bolivariana de Venezuela, enfocados en 
              generar avances significativos en la prevención, atención y promoción de cambios culturales en relación con la discapacidad, 
              con base en los principios establecidos en la Ley para las Personas con discapacidad y en la Constitución Nacional.</p>
           </div>
           <div class="mision mt-5">
            <h4><strong>Servicios</strong></h4>
              <ul>
                <li>Oficina de Atención Ciudadana</li>
                <li>Certificación</li>
                <li>Laboratorio Ortesis y Prótesis</li>
                <li>Centro Nacional de Genética Médica de Venezuela “Dr. José Gregorio Hernández”</li>
                <li>Consultoría Jurídica</li>
              </ul>
           </div>
      </div>
  
    </div>
  </div>
</template>

<script>
import MainChartExample from '../charts/MainChartExample'
import CChartLineSimple from '../charts/CChartLineSimple'
import CChartBarSimple from '../charts/CChartBarSimple'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import WidgetsBrand from '../widgets/WidgetsBrand'

export default {
  name: 'Dashboard',
}
</script>
<style scoped>
.spam{
    background-color: #d3d3d357;
    padding: 10px;
    border-radius: 5px;
    color: black;
    font-family: "verdana";
    font-size:14px;
}
.contenedor{
 display: flex;
}
.div1{
  padding: 20px;
  background: white;
  border-radius: 10px;
  margin-right: 25px;
}
.div2{
  padding: 20px;
  background: white;
  border-radius: 10px;
}
.mision{
  padding: 10px;
  box-shadow: 0 10px 10px -8px;
  font-family: verdana;
  font-size: 14px;
}
ul li {
  list-style: none;
  border: 1px solid;
  padding: 10px;
}
.logo{
  display: flex;
  justify-content: center;
}
.cabecera{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;


}
</style>
