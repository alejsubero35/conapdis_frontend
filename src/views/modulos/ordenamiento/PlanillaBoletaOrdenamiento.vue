<template>
    <div>
        <v-row>
     
        </v-row>
        <vue-html2pdf
         :show-layout="false"
         :float-layout="false"
         :enable-download="false"
         :preview-modal="true"
         :paginate-elements-by-height="1400"
         :filename="notification"
         :pdf-quality="2"
         :manual-pagination="false"
         pdf-format="letter"
         pdf-orientation="portrait"
         pdf-content-width="100%"
         @progress="onProgress($event)"
         @hasStartedGeneration="hasStartedGeneration()"
         @hasGenerated="hasGenerated($event)"
         ref="html2Pdf"
        >
            <section slot="pdf-content" class="form_contacto" >
                <section class="pdf-item mt-3">
                    <div class="logo">
                        <img style="object-fit: cover;" src="img/logos_conapdis/CABECERA.png"  alt="">
                    </div>
                    <div class="title_section">
                        <h4 class="mt-4">{{ title_section }}</h4>
                    </div><br>
                    <div class="text-center"><h4>1.	BOLETA DE ORDENAMIENTO</h4></div>
                    <div class="inspeccion">
                        <div>a) BOLETA N°:  : <strong>{{numeroboleta}}</strong></div>
                        <div>b) Fecha : <strong>{{fechaguia}}</strong></div>
                        <div>b) Hora : <strong>{{hour}}</strong></div>
                    </div><br><br>
                    <table>
                        <tr>
                            <th class="td-center" colspan="5">El CONSEJO NACIONAL PARA LAS PERSONAS CON DISCAPACIDAD (CONAPDIS), 
                              actuando de conformidad con lo establecido en el artículo 81 de la Constitución de la República Bolivariana de Venezuela; 
                              el artículo 3 literales “b” y “f”; artículo 4 literal “e”; artículo 5 numeral 2; artículo 8 literal “c” y el artículo 9 
                              numeral 1 literal “a” y “b” y numeral 2 literales “a”, “b” y “d” de la Convención Sobre los Derechos de las Personas con 
                              Discapacidad; y, los artículos 4, 31, 32, 33 y 35 de la Ley para las Personas con Discapacidad GO Nº 38.598 de fecha 
                              05/01/2007; se ordena la presente disposición:</th>
                          </tr>
                          <tr>
                              <th class="td-center" colspan="5">2.DE LOS DATOS DE LA INSPECCIÓN PRACTICADA SEGÚN GUÍA DE INSPECCIÓN:</th>
                          </tr>
                          <tr>
                              <th class="td-center" colspan="5">2.1 DEL REGISTRO:</th>
                          </tr>
                          <tr>
                            <td  colspan="2"  class=" bold">a.	Expediente N°:</td>
                            <td  colspan="2"  class=" bold">b.	Solicitud de Inspección N°: </td>
                            <td  colspan="2"  class=" bold">c.	Unidad de Fiscalización:</td>
                          </tr>
                          <tr>
                              <td colspan="2">00001</td>
                              <td colspan="2" class="text-center">{{solicitudnumero}}</td>
                              <td colspan="2" class="text-center"> {{unidadfiscalizacion}}</td>
                          </tr>
                          <tr>
                              <th class="td-center" colspan="5">3.	DE LOS DATOS DE LA ENTIDAD DE TRABAJO O RAZÓN SOCIAL Y DIRECCIÓN:</th>
                          </tr>
                          <tr>
                              <td colspan="3"  class=" bold"> a.	Razón Social:</td>
                              <td colspan="3"  class=" bold"> b.	Registro de Información Fiscal R.I.F.:</td>
                          </tr>
                          <tr>
                              <td colspan="3">{{razonsocial}}</td>
                              <td colspan="3">{{rif}}</td>
                          </tr>
                          <tr>
                              <td colspan="5"  class=" bold">c.	Denominación Comercial:</td>
                          </tr>
                          <tr>
                              <td colspan="5">{{denominacioncomercial}}</td>
                          </tr>
                          <tr>
                              <td class=" bold" colspan="2">d.Región</td>
                              <td class=" bold" >e.Estado</td>
                              <td class=" bold" >f.Municipio</td>
                              <td class=" bold" >g.Parroquia</td>         
                          </tr>
                          <tr>
                              <td colspan="2">{{region}}</td>
                              <td>{{estado}}</td>
                              <td>{{municipio}}</td>
                              <td>{{parroquia}}</td>        
                          </tr>
                          <tr>
                              <th class="td-center" colspan="5">4.DEL REPRESENTANTE LEGAL DE LA ENTIDAD DE TRABAJO O RAZÓN SOCIAL:</th>
                          </tr>
                          <tr>
                              <td colspan="2"  class=" bold">4.1 Nombre(s)</td>
                              <td  class=" bold">4.2 Apellido(s)</td>
                              <td  class=" bold">4.3 C.I.N°</td>
                              <td  class=" bold">4.4 Cargo</td>
                          </tr>
                          <tr>
                              <td colspan="2">{{firstname}}</td>
                              <td>{{lastname}}</td>
                              <td>{{identitycard}}</td>
                              <td>{{position}}</td>
                          </tr>
                    </table>
                </section>
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                                             
                        <tr>
                            <th class="td-center" colspan="5">5. DE LA CLASIFICACIÓN DE LA EDIFICACIÓN SEGÚN EL TIPO DE OCUPACIÓN</th>
                        </tr>
                
                        <tr>
                            <td class="text-center" colspan="5">{{ type_ocupation }}</td>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5">6.ORDENAMIENTOS:</th>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5">6.1.	DE LA INSERCIÓN LABORAL - EMPLEO PARA PERSONAS CON DISCAPACIDAD)</th>
                        </tr>
                        <tr>
                            <th  colspan="5">De conformidad con lo establecido en los artículos 28 y 30 de la Ley para las Personas con 
                                Discapacidad G. O. Nº 38.598 de fecha 05/01/2007, la entidad de trabajo ya identificada, procurará la 
                                incorporación a su plantel de trabajo no menos de un cinco por ciento (5 %) de personas con Discapacidad 
                                Permanente, de su nómina total, sean ellos ejecutivos, ejecutivas, empleados, empleadas, obreros u obreras; 
                                en los casos siguientes:</th>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">a.	Ejecutivos o ejecutivas:</td>
                            <td  class=" bold">b.	Empleados o empleadas:</td>
                            <td  class=" bold">c.	Obreros u obreras:</td>
                            <td  class=" bold">d.	TOTAL NÓMINA (T.N.):</td>
                        </tr>
                        <tr>
                            <td colspan="2">{{ ejecutivos }}</td>
                            <td>{{ empleados }}</td>
                            <td>{{ obreros }}</td>
                            <td>{{ total_nomina }}</td>
                        </tr>
                        <tr>
                            <td class="bold">a.	De 20 a 39 (T.N.)</td>
                            <td class="bold">b.	De 40 a 59 (T.N.)</td>
                            <td class="bold">c.	De 60 a 79 (T.N.)</td>
                            <td class="bold">d.	De 80 a 99 (T.N.)</td>
                            <td class="bold">e.	De100 a 119 (T.N.)</td>
                        </tr>
                        <tr>
                            <td>Persona C/Discapacidad</td>
                            <td>Persona C/Discapacidad</td>
                            <td>Persona C/Discapacidad</td>
                            <td>Persona C/Discapacidad</td>
                            <td>Persona C/Discapacidad</td>
                        </tr>
                        <tr>
                            <td class="check" >
                                <label for="vehicle1">Si</label>&nbsp;
                                <input type="checkbox" :disabled="disabled" v-model="de_20_39_si">&nbsp;&nbsp;&nbsp;
                                <label for="vehicle1">No</label>&nbsp;
                                <input type="checkbox" :disabled="disabled" v-model="de_20_39_no">
                            </td>
                            <td class="check">
                                <label for="vehicle1">Si</label>&nbsp;
                                <input type="checkbox" :disabled="disabled" v-model="de_40_59_si">&nbsp;&nbsp;&nbsp;
                                <label for="vehicle1">No</label>&nbsp;
                                <input type="checkbox" :disabled="disabled" v-model="de_40_59_no">
                            </td>
                            <td class="check">
                                <label for="vehicle1">Si</label>&nbsp;
                                <input type="checkbox" :disabled="disabled" v-model="de_60_79_si">&nbsp;&nbsp;&nbsp;
                                <label for="vehicle1">No</label>&nbsp;
                                <input type="checkbox" :disabled="disabled" v-model="de_60_79_no">
                            </td>
                            <td class="check">
                                <label for="vehicle1">Si</label>&nbsp;
                                <input type="checkbox" :disabled="disabled" v-model="de_80_99_si">&nbsp;&nbsp;&nbsp;
                                <label for="vehicle1">No</label>&nbsp;
                                <input type="checkbox" :disabled="disabled" v-model="de_80_99_no">
                            </td>
                            <td class="check">
                                <label for="vehicle1">Si</label>&nbsp;
                                <input type="checkbox" :disabled="disabled" v-model="de_100_119_si">&nbsp;&nbsp;&nbsp;
                                <label for="vehicle1">No</label>&nbsp;
                                <input type="checkbox" :disabled="disabled" v-model="de_100_119_no">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">f.	Si supera el número 119 del Total Nómina (T.N.) Especificar Número de Personas con Discapacidad Permanente Incorporadas al Plantel de Trabajo:</td>
                            <td class="text-center">{{ total_discapacidad }}</td>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5">7.DE LAS NORMAS Y REGLAMENTACIONES TÉCNICAS DE ACCESIBILIDAD</th>
                        </tr>
                        <tr>
                            <th  style="font-size:12px;" colspan="5">	Ley para las Personas con Discapacidad - G.O. N° 38.598 - 05/01/2007 Artículo 31</th>
                        </tr>
                        <tr>
                            <th style="font-size:12px;" colspan="5">	FONDONORMA 2733:2004 Principios Generales para el Diseño, Proyecto, Construcción, 
                                Remodelación y Adecuación de Edificaciones para evitar las Barreras Físicas y que dichos espacios sean completamente 
                                Accesible y Transitable con Autonomía, Comodidad y Seguridad por las Personas.</th>
                        </tr>
                        <tr>
                            <th style="font-size:12px;" colspan="5">	Normas que contienen disposiciones que al ser citadas por la Norma Venezolana 
                                NTF 2733:2004 constituyen requisitos de esta. Referencia normativa citadas: COVENIN: 187:2003 – 3296; 3297; 
                                3298; 3330:1997 (ISO 7239); – 3655; 3656; 3657; 3658 y 3660:2001.</th>
                        </tr>
                    </table>
                </section> 
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                        <tr>
                            <th style="font-size:12px;" colspan="5">	Normas Internacionales que contienen disposiciones que al ser citadas por la Norma 
                                Venezolana NTF 2733:2004, constituyen requisitos de esta hasta tanto sea publicada la Norma Venezolana Correspondiente.</th>
                        </tr>
                          <tr>
                            <th style="font-size:12px;" colspan="5">	Hasta tanto sea publicada la Norma Venezolana correspondiente, aplicarán Normas y 
                                Reglamentaciones del Instituto Uruguayo de Normas Técnicas (UNIT) en materia de Accesibilidad al Medio Físico y 
                                Accesibilidad de la Tecnología de la Información.</th>
                        </tr>
                        <tr>
                            <th style="font-size:12px;" colspan="5">	Toda edificación privada de uso público, debe cumplir con los requisitos mínimos 
                                establecidos en la Norma Técnica (NTF) FONDONORMA 2733:2004 y REFERENCIAS NORMATIVAS DE ESTA.</th>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">7.1	DE LOS REQUISITOS GENERALES DE ACCESIBILIDAD</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.1.1. Deberá construir, adecuar o mantener las aceras con un ancho mínimo libre 
                                de 1,60 mts. sin obstáculos, ni ningún elemento (publicitario, poster o tensores, cabinas telefónicas, 
                                ni cestas o recolectores de basuras, entre otros) que interrumpan el paso libre indicado. Según Norma COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_711_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_711_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_711_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.1.2.	Deberá adecuar la pendiente de la acera transversal y longitudinal máxima hasta 2%, y no debe existir descarga 
                                de lluvias, ni drenaje directamente sobre las mismas, Según Norma COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_712_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_712_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_712_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.1.3.	Deberá modificar el pavimento de las aceras de una manera uniforme, exenta de irregularidades y antirrebalante, 
                                si el pavimento no fuera continuo las juntas no deben ser mayores a 1 cm, ni debe tener una profundidad mayor a 5 mm. Según Norma 
                                COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_713_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_713_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_713_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.1.4.	Deberá colocar convenientemente una franja de paso continuo de 85 cm de ancho, si por razones de contexto urbano 
                                de casco Históricos, las aceras estuvieran recubiertas con piezas cuya junta supera 1 cm y colocar un código de Alerta indicando 
                                mediante un cambio de textura en el acabado de 1 metro de largo en los bordes de aceras y cruces en las esquinas, Según Norma 
                                COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_714_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_714_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_714_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.1.5.	Deberá nivelar las tapas metálicas, de cemento u otro material colocadas sobre las aceras para que queden al ras 
                                de la superficie del pavimento y a su vez las tapas de tanquillas no podrá tener separaciones superiores a 1 centímetro, según Norma  
                                COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_715_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_715_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_715_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.1.6.	Deberá colocarse rampas sobre las aceras en los accesos a las edificaciones que no estén a nivel de las mismas, 
                                así como en los cruces de una acera a otra y en las esquinas, Según Norma COVENIN 3656.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_716_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_716_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_716_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.1.7.	Se deberá disponer de rampas y plataforma de descanso que facilite la circulación de personas en sillas de ruedas 
                                en las aceras y en los corredores de uso públicos, cuando se presenten desniveles considerables, Según Norma COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_717_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_717_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_717_na">
                            </td>
                        </tr>
                    </table>
                </section> 
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                        <tr>
                            <td colspan="2">7.1.8.	Deberá en caso de modificaciones y/o remodelaciones se admitirá un ancho mínimo de 0,90 metros. Todo diseño de la 
                                rampa debe ser conforme a lo establecido en la Norma COVENIN 3656.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_718_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_718_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_718_na">
                            </td>
                        </tr>
                                                
                        <tr>
                            <td colspan="2"  class=" bold">7.2	DE LA SEÑALIZACIÓN DE ACCESIBILIDAD:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.2.1 Se deberá colocar señales a fin de orientar y facilitar la transitabilidad de las 
                                personas en las edificaciones conforme a lo dispuesto en la Norma COVENIN 2733-2004. </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_721_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_721_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_721_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.2.2 Se deberá colocar en sitios visibles el símbolo internacional de accesibilidad en los accesos de 
                                las edificaciones y en los distintos espacios, en los cuales se hallan dispuestos facilidades de accesibilidad 
                                y de transitabilidad de las personas conforme a la presente Norma.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_722_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_722_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_722_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">7.3	DE LOS ESTACIONAMIENTOS:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.3.1.	Debe disponer o adecuar puestos para estacionar vehículos conducidos o que transporten personas con 
                                movilidad reducida cumpliendo con las debidas especificaciones tales como dimensiones, ubicación y señalización de puestos; 
                                conforme a lo dispuesto en las normas y reglamentaciones técnicas FONDONORMA NTF 2733, y la Referencia Normativa - COVENIN 187.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_731_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_731_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_731_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.3.2.	Deberá colocar un cartel frente a cada uno de los puestos a que se hace referencia, como se muestra en la figura 9 
                                de esta Ley, cuyas medidas no deben ser menores a 30 x 45 cm y ubicado a una altura no mayor de 1,80 metros ni menor a 1 metro, 
                                esto entre el nivel del piso y la parte superior del cartel. Conforme a lo dispuesto a la Norma COVENIN 187.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_732_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_732_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_732_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">7.4	EN LAS EDIFICACIONES:   /  7.4.1.	De los Accesos: </td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.4.1.1.	Deberá disponer de rampa conjuntamente con escaleras en los desniveles 
                                entre la acera y la edificación a nivel de planta baja, en los accesos a las edificaciones, 
                                prescrito en la Norma COVENIN 3656.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_741_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_741_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_741_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.4.1.2.	Debe disponer de rampas conjuntamente con escaleras en los desniveles desde 
                                la planta baja hasta los medios de circulación vertical, según Norma COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_742_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_742_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_742_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.4.2	<strong>De los Pasillos:</strong> Deberá existir en los pasillos iluminación natural o artificial, según Norma COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_742_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_742_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_742_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.4.3.	Los pasillos deberán tener un ancho mínimo de 1,50 metros y en los extremos de los pasillos debe preverse el giro de una persona en 
                                silla de rueda, por lo cual en cada extremo del pasillo debe disponer de un diámetro libre mínimo de 1,50 metros. Según Norma COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_743_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_743_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_743_na">
                            </td>
                        </tr>
                    </table>
                </section> 
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                        <tr>
                            <td colspan="2">7.4.4.	Deberá garantizar una superficie de los pisos lisa y anti resbalante, y se debe colocar cambio de textura y/o color como código 
                                de Alerta en los ingresos a espacios, inicio y terminación de rampa, de escalera bordes, balcones, etc. Y deberá evitar el uso de alfombra sueltas 
                                y de pelo largo, de ser necesaria su colocación estas deben ser de pelo corto y adherida al piso, principalmente los bordes, véase también en la 
                                Norma COVENIN 3655.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled"  v-model="access_744_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled"  v-model="access_744_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled"  v-model="access_744_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.4.5	<strong>	De las Escaleras: </strong> 7.4.6.	Toda escalera de uso público deberá tener un ancho mínimo de 1,20 metros, 
                                su huella entre 28 y 32 centímetro y su contra huella entre 14 y 18 centímetro, sin salientes. La contra huella debe ser llena (no vacía) con
                                tope para el pie del usuario. Según Norma COVENIN 2733-2004. </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_745_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_745_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_745_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.4.7.	Toda escalera deberá disponer de pasamanos en toda su longitud y ambos sentidos de circulación, a una altura entre 80 y 90 centímetros, 
                                medidos entre la superficie del piso y con una separación de la pared de 5 centímetros, Según Norma COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_747_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_747_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_747_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">7.4.8	De las Barandas en Rampas y Escaleras:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.4.8.1.	Deberá presentar en las rampas y escaleras barras firmes, pasamanos con la altura de 80 y 90 cm., capacidad de carga ≥ 150 Kg 
                                y distanciamiento entre barras ≤ 15 cm. al menos en un sentido, Según Norma COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_748_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_748_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_748_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">7.4.9	De las Puertas:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">7.4.10	De los Puntos de control:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">Deberá estar libre de obstáculos para el paso de personas en sillas de ruedas, debe proveer un paso en aquellos sitios donde se establezcan o existan 
                                puntos de control con un ancho mínimo de 90 centímetro, Según Norma COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_7410_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_7410_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_7410_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">7.4.11	De los Ascensores:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">Deberá cumplir con las dimensiones y especificaciones de los dispositivos tales como plataforma de cabina, puertas del ascensor, botón del panel control, 
                                botón de emergencia y de parada, botón de llamada en cada nivel, pasamanos en los cerramientos fijos y dispositivos y luminosos; conforme a lo dispuesto en las normas 
                                y reglamentaciones técnicas FONDONORMA NTF 2733 y referencia Normativa de esta - NTF/3656?  </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_7411_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_7411_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_7411_na">
                            </td>
                        </tr>
                    </table>
                </section> 
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                        <tr>
                            <td colspan="2"  class=" bold">7.4.12	De los Servicios Sanitarios:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">Cada sala de servicio sanitario debe cumplir y garantizar la accesibilidad a la persona en silla de rueda de manera que su ocupante entre en el recinto, 
                                cierre la puerta, ¿se dirija desde una posición frontal o lateral a las piezas sanitarias y pueda mantenerse en privado conforme a lo dispuesto en las Normas y 
                                reglamentaciones técnicas FONDONORMA NTF 2733? </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_7412_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_7412_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_7412_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>7.4.12.1 Señalización:</strong>Deberá colocarse en las entradas de los servicios sanitarios de uso público y privado el símbolo internacional 
                                de accesibilidad, según Norma COVENIN 2733-2004  </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74121_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74121_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74121_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>7.4.12.2	Lavamanos: </strong>Deberá existir lavamanos libre de obstáculos en su parte inferior solo con sus tuberías correspondientes. 
                                La altura del borde inferior o de cualquier otro accesorio debe estar entre 70 y 75 centímetros, y al menos un grifo de los lavamanos debe ser de tipo palanca, 
                                según Norma COVENIN 2733-2004</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74122_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74122_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74122_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>7.4.12.3	Barras de Sostén: </strong>Deberá colocarse barra de sostén ubicadas en las paredes adyacentes, separadas de estos 5 centímetros, 
                                a una altura entre 80 y 90 centímetros sobre el nivel del piso. Su diámetro será entre 3 y 5 centímetros, y soportar sin doblarse ni desprenderse una fuerza de 150 Kg., 
                                según Norma COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74123_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74123_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74123_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>7.4.12.4	Accesorios Sanitarios: </strong>Deberá ubicarse a una altura máxima de 1 metro sobre la altura del piso, esto a lo correspondiente a los
                                accesorios sanitarios tales como dispensador de jabón, secador de manos, dispensador de toallas u otros, según Norma COVENIN 2733-2004 </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74124_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74124_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74124_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>7.4.12.5	Escusados en baño de uso público:  </strong>Deberá cumplir con los siguientes puntos: El recinto utilizable por la persona en silla de ruedas, 
                                debe estar  ubicado lo más lejos posible de la entrada principal del sanitarios y cumplir con las siguientes especificaciones  como dimensiones mínimas del recinto privado 
                                de 1.75 m. de ancho por 1.55 m. de largo, ancho mínimo de la puerta 0.90 m. con  espacio lateral para la transferencia desde la silla de rueda al WC cuyas dimensiones mínimas 
                                deben ser de 1.20 m x 0.80 m. y  así como el espacio de giro de maniobra entre las puerta y las piezas de 1.5 m. de diámetro( solo en los casos de espacios a remodelar se debe 
                                procurar sea posible el giro de al menos de 1.2 m de diámetros) conforme a lo dispuesto en las Normas y reglamentaciones técnicas FONDONORMA NTF 2733? </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74125_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74125_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74125_na">
                            </td>
                        </tr>
                    </table>
                </section> 
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                        <tr>
                            <td colspan="2"><strong>7.4.12.6	Urinarios:  </strong>Deberá haber en cada sala de servicios de uso público para varones, uno urinarios que debe cumplir las siguientes especificaciones; 
                                la distancia entre el borde superior de los urinarios y el piso no debe exceder de 45 centímetros, en urinarios colgados a la pared se deben instalar barras de sostén a cada lado del 
                                artefacto sanitario. Un extremo de cada barra se debe fijar al piso y el otro, a la pared, ¿en lo dispuesto en las Normas y reglamentaciones técnicas (NTF-2733) </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74126_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74126_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74126_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>7.4.12.7	Duchas: </strong>Deberá ser de grifos preferiblemente tipo palanca, se recomienda la instalación de regadera tipo teléfono, el espacio de la ducha debe 
                                ser suficiente de modo que una persona sentada en una silla de rueda pueda practicar su higiene con comodidad, debe instalarse barra de sostén en las paredes adyacentes con las mismas 
                                especificaciones dadas para la barra de sostén. En los sectores de duchas dispuestos para el uso de personas con discapacidad no deben existir brocales ni ningún otro obstáculo en el piso, 
                                el acceso a las duchas debe ser sin desniveles con pendiente suave hacia el drenaje y piso anti resbalante. Según Norma COVENIN 2733-2004. </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74127_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74127_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74127_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">7.4.13	VENTANAS, CONTROLES Y ACCESORIOS EN GENERAL</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>7.4.13.1	La altura de las cerraduras de ventanas, controles y accesorios</strong>Debe existir ventanas con controles, cerraduras y accesorios a una altura comprendida 
                                entre 0.50 y 1.20 metros para que puedan ser manipulados por los usuarios. </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74131_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74131_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74131_na">
                            </td>
                        </tr>
                          
                        <tr>
                            <td colspan="2">7.4.13.2	7.4.13.2.	Deberá existir en el borde inferior de la ventana una altura que no debe superar los 90 centímetros por encima del nivel del piso, esto en aquellos 
                                ambientes de permanencia prolongada por las personas, según Norma COVENIN 2733-2004</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74132_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74132_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74132_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">7.4.13.3	TOMA DE ELECTRICIDAD, DE COMUNICACIONES E INTERRUPTORES DE CIRCUITOS DE ILUMINACIÓN</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.4.13.4.	Deberá situarse a una altura entre 75 y 90 centímetros por encima del nivel del piso toda la toma de electricidad y de comunicaciones, Deberá situarse entre 90 y 110 
                                centímetros por encima del nivel del piso los interruptores de los circuitos de iluminación, según Norma COVENIN 2733-2004. </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74134_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74134_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74134_na">
                            </td>
                        </tr>
                    </table>
                </section> 
                   <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                        <tr>
                            <td colspan="2"  class=" bold">7.4.14	PLAZAS Y PARQUES.  </td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">Deberán existir rampas para superar desniveles u obstáculos con proximidad no mayor a 2 metros en las zonas de cominerías de plazas y parques, como se prescriben en la Norma COVENINI 3656.
                                Deberá existir en las rampas no continuas, juntas que no mayores de 1 centímetro.
                                Deberán colocar barandas en aquellas rampas o escaleras en la cual existe potencial peligro de caída.
                                Deberá tener en los bancos brazos firmes en los extremos, con agarraderas de ancho o diámetro no menor de 3.5 centímetro, según la Norma COVENIN 2733-2004. 
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74141_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74141_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74141_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">7.4.15.1	CENTROS CULTURALES, DE ENTRETENIMIENTO Y SALA DE ESPECTACULOS PÚBLICOS </td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.4.15.2.	Deberán reservar y demarcar lugares para la ubicación de personas en sillas de ruedas en los lugares de esparcimientos y recreación cerrados, tales como teatros, cines, auditórium, 
                                o en las graderías de instalaciones deportivas de acuerdo a lo especificado en la Norma COVENIN 2733-2004.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74142_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74142_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74142_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">7.4.15.3.	Deberá ubicar en zonas horizontales a las personas en sillas de ruedas, sin obstruir el tránsito en los pasillos y puertas, y cercas de las entradas o salidas principales, que permita una 
                                buena visión hacia el área donde se presenta el evento tal como se muestra en la Norma COVENIN 2733-2004. </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74143_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74143_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled" v-model="access_74143_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">7.4.15.4	PICTOGRAMAS</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">Deberá Emplearse pictogramas conforme a la norma lo siguiente:<br>
                                •	Persona con discapacidad motora (símbolo internacional de accesibilidad).<br>
                                •	Persona con discapacidad auditiva.<br>
                                •	Persona con discapacidad intelectual.<br>
                                •	Persona con discapacidad visual.
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled"  v-model="pictograma_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled"  v-model="pictograma_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" :disabled="disabled"  v-model="pictograma_na">
                            </td>
                        </tr>
                    </table>
                </section> 
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-5">
                    <table>
                        <tr>
                            <th class="td-center" colspan="5">7.5	DE LOS DATOS DEL ADMINISTRADO (A) DESIGNADO (A):</th>
                        </tr>
                        <tr>
                            <th colspan="2">Nombre(s):</th>
                            <th colspan="2" class="text-center">Apellido (s):</th>
                            <th colspan="1" class="text-center">C. I. N°:</th>
                        </tr>
                        <tr>
                            <td colspan="2">{{ firstnameadmin }}</td>
                            <td colspan="2">{{ lastnameadmin }}</td>
                            <td colspan="1">{{ cedulaadmin }}</td>
                        </tr>
                        


                        <tr>
                            <th class="td-center" colspan="5">7.6	DE LOS DATOS DEL FUNCIONARIO FISCAL ACTUANTE:</th>
                        </tr>
                        <tr>
                            <th colspan="2">Nombre (s):</th>
                            <th colspan="2" class="text-center">Apellido (s):</th>
                            <th colspan="1" class="text-center">C. I. N°:</th>
                        </tr>
                        <tr>
                            <td colspan="2">{{firstnameinspector}}</td>
                            <td colspan="2">{{lastnameinspector}}</td>
                            <td colspan="1">{{cedulainspector}}</td>
                        </tr>
                        


                        <tr>
                            <td class=" bold"  colspan="2" style="height: 100px;">Cargo:</td>
                            <td  colspan="2"   class=" bold text-center">Firma</td>
                            <td  colspan="2"  class=" bold text-center">Sello Humedo</td>
                        </tr>
                        <tr>
                            <td  colspan="3"  >Providencia Administrativa N°: {{ providenceAdmin }}</td>
                            <td  colspan="2" >Fecha y Hora : {{ providenceDate }}</td>  
                        </tr>
                    </table>
                    <v-row>
                        <div class="mt-5 d-flex justify-end ">
                            <v-btn  small @click="generateReport" color="success" v-show="btn_atras"  >{{ btnSave }}</v-btn> 
                        </div>
                    </v-row>
                    <v-row class="mt-2 parrafo">
                        <p class="text-center inter">Av. Casanova con Calle Villa Flor. Edificio Centro Profesional del Este. Piso Mezzanina 1. Oficina Edificio Anexo. Sector El Recreo
                            Caracas Distrito Capital. Zona Postal 1050. Números telefónicos: (0212) 762.00.39 / 762.96.45
                            www.conapdis.gob.ve  /  fiscalizacion@conapdis.gob.ve  /  @conapdis
                            
                        </p>
                    </v-row>
                </section> 
            </section>
        </vue-html2pdf>
    </div>
 </template>
 <script>
 import VueHtml2pdf from 'vue-html2pdf'
 import orderingModule   from '@/store/modules/orderingModule';
  
 export default {
     components: {
         VueHtml2pdf
     },
     data(){
         return{
            btnSave:'Generar PDF',
            btn_atras : true,
            title_section : 'CONSEJO NACIONAL PARA LAS PERSONAS CON DISCAPACIDAD',
            campo1 : '001',
            campo2 : '1425',
            campo3 : 'Central',
            campo4 : 'Miranda',
            campo5 : 'Simón Bolívar',
            campo6 : 'Arrau Tecnology HDD, C.A',
            headers : [

            {text: 'Serial Equipo', value: 'serial' },
            {text: 'Módelo', value: 'serial'},
            {text: 'Plan', value: 'nombrePlan'},
            {text: 'Nombre Comercio', value: 'legalName'},
            {text: 'Falla Reportada', value: 'nameError'},
            {text: 'Factura', value: 'invoice'},
            /* {text: 'Fecha Recepción', value: 'ticketDate'}, */
            ],
            disabled : true,
            desserts : [

            ],
            detalles : [

            ],
            notification : '',
            sectiontitle : '',
            nota_entrega_id : '',
            date : new Date(Date.now()),
            customer : '',
            numeroboleta:'',
            fechaguia:'',
            solicitudnumero:'',
            unidadfiscalizacion:'',
            razonsocial:'',
            rif:'',
            denominacioncomercial:'',
            region:'',
            estado:'',
            municipio:'',
            parroquia:'',
            firstname:'',
            lastname:'',
            position:'',
            identitycard:'',
            vehicle11 : true,
            type_ocupation:'',
            ejecutivos:'',
            empleados:'',
            obreros:'',
            total_nomina:'',
            hour : '',
            de_20_39_si:false,
            de_20_39_no:false,
            de_40_59_si:false,
            de_40_59_no:false,
            de_60_79_si:false,
            de_60_79_no:false,
            de_80_99_si:false,
            de_80_99_no:false,
            de_100_119_si:false,
            de_100_119_no:false,
            total_discapacidad:'',
            pleno_acceso:'',
            buen_trato:'',
            debida_informacion:'',
            agilidad_en_los_tramites:'',
            firstnameinspector:'',
            lastnameinspector:'',
            cedulainspector:'',
            firstnameadmin:'',
            lastnameadmin:'',
            cedulaadmin:'',
            providenceAdmin : '',
            providenceDate : '',
            debida_informacion_si                   : false,
            debida_informacion_no                   : false,
            access_711_si                       : false,
            access_711_no                       : false,
            access_711_na                       : false,
            access_712_si                       : false,
            access_712_no                       : false,
            access_712_na                       : false,
            access_713_si                       : false,
            access_713_no                       : false,
            access_713_na                       : false,
            access_714_si                       : false,
            access_714_no                       : false,
            access_714_na                       : false,
            access_715_si                       : false,
            access_715_no                       : false,
            access_715_na                       : false,
            access_716_si                       : false,
            access_716_no                       : false,
            access_716_na                       : false,
            access_717_si                       : false,
            access_717_no                       : false,
            access_717_na                       : false,
            access_718_si                       : false,
            access_718_no                       : false,
            access_718_na                       : false,
            access_721_si                       : false,
            access_721_no                       : false,
            access_721_na                       : false,
            access_722_si                       : false,
            access_722_no                       : false,
            access_722_na                       : false,
            access_731_si                       : false,
            access_731_no                       : false,
            access_731_na                       : false,
            access_732_si                       : false,
            access_732_no                       : false,
            access_732_na                       : false,
            access_741_si                       : false,
            access_741_no                       : false,
            access_741_na                       : false,
            access_742_si                       : false,
            access_742_no                       : false,
            access_742_na                       : false,
            access_743_si                       : false,
            access_743_no                       : false,
            access_743_na                       : false,
            access_744_si                       : false,
            access_744_no                       : false,
            access_744_na                       : false,
            access_745_si                       : false,
            access_745_no                       : false,
            access_745_na                       : false,
            access_746_si                       : false,
            access_746_no                       : false,
            access_746_na                       : false,
            access_747_si                       : false,
            access_747_no                       : false,
            access_747_na                       : false,
            access_748_si                       : false,
            access_748_no                       : false,
            access_748_na                       : false,
            access_749_si                       : false,
            access_749_no                       : false,
            access_749_na                       : false,
            access_7410_si                      : false,
            access_7410_no                      : false,
            access_7410_na                      : false,
            access_7411_si                      : false,
            access_7411_no                      : false,
            access_7411_na                      : false,
            access_7412_si                      : false,
            access_7412_no                      : false,
            access_7412_na                      : false,
            access_74121_si                     : false,
            access_74121_no                     : false,
            access_74121_na                     : false,
            access_74122_si                     : false,
            access_74122_no                     : false,
            access_74122_na                     : false,
            access_74123_si                     : false,
            access_74123_no                     : false,
            access_74123_na                     : false,
            access_74124_si                     : false,
            access_74124_no                     : false,
            access_74124_na                     : false,
            access_74125_si                     : false,
            access_74125_no                     : false,
            access_74125_na                     : false,
            access_74126_si                     : false,
            access_74126_no                     : false,
            access_74126_na                     : false,
            access_74127_si                     : false,
            access_74127_no                     : false,
            access_74127_na                     : false,
            access_74131_si                     : false,
            access_74131_no                     : false,
            access_74131_na                     : false,
            access_74132_si                     : false,
            access_74132_no                     : false,
            access_74132_na                     : false,
            access_74133_si                     : false,
            access_74133_no                     : false,
            access_74133_na                     : false,
            access_74134_si                     : false,
            access_74134_no                     : false,
            access_74134_na                     : false,
            access_74141_si                     : false,
            access_74141_no                     : false,
            access_74141_na                     : false,
            access_74142_si                     : false,
            access_74142_no                     : false,
            access_74142_na                     : false,
            access_74143_si                     : false,
            access_74143_no                     : false,
            access_74143_na                     : false,
            pictograma_si                       : false,
            pictograma_no                       : false,
            pictograma_na                       : false,
            
         }
     },
     computed: {
     /*     getCustomerId() {
             return sessionModule.getCustomerId; 
         } */
     },
     methods: {
         generateReport () {
             this.btn_atras = false
             this.$refs.html2Pdf.generatePdf()
         },
         onProgress(event){
            
         },
         formatofecha(fecha) {
             var date = new Date(fecha);
             let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
             return  formatted_date;
         },
        async getOrderingBallotById(id){  
            this.overlay = true
            const {data} = await orderingModule.getOrderingBallotById(id)   
            
            this.numeroboleta               = data.data.num_boleta
            this.fechaguia                  = data.data.date
            this.hour                       = data.data.hour
            this.solicitudnumero            = data.data.guide.inspection_request.id
            this.unidadfiscalizacion        = data.data.guide.inspection_unit.name
            this.razonsocial                = data.data.busine.company_name
            this.rif                        = data.data.busine.rif
            this.denominacioncomercial      = data.data.busine.comercial_designation
            this.region                     = data.data.busine.country.name
            this.estado                     = data.data.busine.state.name
            this.municipio                  = data.data.busine.municipality.name
            this.parroquia                  = data.data.busine.parishe.name
            this.direccion                  = data.data.busine.location    
            this.firstname                  = data.data.busine.first_name_rl
            this.lastname                   = data.data.busine.last_name_rl
            this.position                   = data.data.busine.position.name
            this.identitycard               = data.data.busine.identity_card_rl 
            this.type_ocupation             = data.data.guide.occupation_type.name
            this.ejecutivos                 = data.data.guidelaborInsertion.ejecutivos
            this.empleados                  = data.data.guidelaborInsertion.empleados
            this.obreros                    = data.data.guidelaborInsertion.obreros
            this.total_nomina               = data.data.guidelaborInsertion.total_nomina
            this.total_discapacidad         = (data.data.guidelaborInsertion.total_nomina > 119) ? this.total_nomina : ''
            this.pleno_acceso               = (data.data.guidePreferentialAttention.pleno_acceso == 0) ? 'Si' : 'No'           
            this.buen_trato                 = (data.data.guidePreferentialAttention.buen_trato == 0) ? 'Si' : 'No'             
            this.debida_informacion         = (data.data.guidePreferentialAttention.debida_informacion == 0) ? 'Si' : 'No'            
            this.agilidad_en_los_tramites   = (data.data.guidePreferentialAttention.agilidad_en_los_tramites == 0) ? 'Si' : 'No'
            this.agilidad_en_los_tramites   = (data.data.guidePreferentialAttention.agilidad_en_los_tramites == 0) ? 'Si' : 'No'
            
            if(data.data.guidePreferentialAttention.debida_informacion == 0){
                this.debida_informacion_si  = true 
                this.debida_informacion_no  = false
            }else{
                this.debida_informacion_si  = false 
                this.debida_informacion_no  = true
            }
            this.firstnameadmin = data.data.guide.name_admin_designe
            this.lastnameadmin = data.data.guide.last_name_admin_designe
            this.cedulaadmin = data.data.guide.identity_card_admin
            this.firstnameinspector         = data.data.guide.user_id_inspector.first_name
            this.lastnameinspector          = data.data.guide.user_id_inspector.last_name
            this.cedulainspector            = data.data.guide.user_id_inspector.cedula
            this.providenceAdmin            = data.data.guide.user_id_inspector.providence_administrative
            this.providenceDate             = data.data.guide.user_id_inspector.providence_date
            this.checkboxNomina(data.data.guidelaborInsertion)    
            this.guideAccessibilityReq(data.data.orderingAccessibilities)                     
            this.overlay = false 
        },
        checkboxNomina(data){
            if(data.de_20_a_39 == 'si'){
                this.de_20_39_si = true 
                this.de_20_39_no = false
            }else{
                this.de_20_39_si = false 
                this.de_20_39_no = true
            }

            if(data.de_40_a_59 == 'si'){
                this.de_40_59_si = true 
                this.de_40_59_no = false
            }else{
                this.de_40_59_si = false 
                this.de_40_59_no = true
            }

            if(data.de_60_a_79 == 'si'){
                this.de_60_79_si = true 
                this.de_60_79_no = false
            }else{
                this.de_60_a_79_si = false 
                this.de_60_a_79_no = true
            }

            if(data.de_80_a_99 == 'si'){
                this.de_80_99_si = true 
                this.de_80_99_no = false
            }else{
                this.de_80_99_si = false 
                this.de_80_99_no = true
            }

            if(data.de_100_a_119 == 'si'){
                this.de_100_119_si = true 
                this.de_100_119_no = false
            }else{
                this.de_100_119_si = false 
                this.de_100_119_no = true
            }
        },
                    
           
        guideAccessibilityReq(data){
                if(data.access_711 == 'si'){
                    this.access_711_si                                 =  true
                    this.access_711_no                                 =  false
                    this.access_711_na                                 =  false
                }else if(data.access_711 == 'no'){            
                    this.access_711_si                                 =  false
                    this.access_711_no                                 =  true
                    this.access_711_na                                 =  false
                }else{          
                    this.access_711_si                                 =  false
                    this.access_711_no                                 =  false
                    this.access_711_na                                 =  true
                }

                if(data.access_712 == 'si'){
                    this.access_712_si                                 =  true
                    this.access_712_no                                 =  false
                    this.access_712_na                                 =  false
                }else if(data.access_712 == 'no'){            
                    this.access_712_si                                 =  false
                    this.access_712_no                                 =  true
                    this.access_712_na                                 =  false
                }else{          
                    this.access_712_si                                 =  false
                    this.access_712_no                                 =  false
                    this.access_712_na                                 =  true
                }

                if(data.access_713 == 'si'){
                    this.access_713_si                                 =  true
                    this.access_713_no                                 =  false
                    this.access_713_na                                 =  false
                }else if(data.access_713 == 'no'){            
                    this.access_713_si                                 =  false
                    this.access_713_no                                 =  true
                    this.access_713_na                                 =  false
                }else{          
                    this.access_713_si                                 =  false
                    this.access_713_no                                 =  false
                    this.access_713_na                                 =  true
                }

                if(data.access_714 == 'si'){
                    this.access_714_si                                 =  true
                    this.access_714_no                                 =  false
                    this.access_714_na                                 =  false
                }else if(data.access_714 == 'no'){            
                    this.access_714_si                                 =  false
                    this.access_714_no                                 =  true
                    this.access_714_na                                 =  false
                }else{          
                    this.access_714_si                                 =  false
                    this.access_714_no                                 =  false
                    this.access_714_na                                 =  true
                }

                if(data.access_715 == 'si'){
                    this.access_715_si                                 =  true
                    this.access_715_no                                 =  false
                    this.access_715_na                                 =  false
                }else if(data.access_715 == 'no'){            
                    this.access_715_si                                 =  false
                    this.access_715_no                                 =  true
                    this.access_715_na                                 =  false
                }else{          
                    this.access_715_si                                 =  false
                    this.access_715_no                                 =  false
                    this.access_715_na                                 =  true
                }

                if(data.access_716 == 'si'){
                    this.access_716_si                                 =  true
                    this.access_716_no                                 =  false
                    this.access_716_na                                 =  false
                }else if(data.access_716 == 'no'){            
                    this.access_716_si                                 =  false
                    this.access_716_no                                 =  true
                    this.access_716_na                                 =  false
                }else{          
                    this.access_716_si                                 =  false
                    this.access_716_no                                 =  false
                    this.access_716_na                                 =  true
                }

                if(data.access_717 == 'si'){
                    this.access_717_si                                 =  true
                    this.access_717_no                                 =  false
                    this.access_717_na                                 =  false
                }else if(data.access_717 == 'no'){            
                    this.access_717_si                                 =  false
                    this.access_717_no                                 =  true
                    this.access_717_na                                 =  false
                }else{          
                    this.access_717_si                                 =  false
                    this.access_717_no                                 =  false
                    this.access_717_na                                 =  true
                }

                if(data.access_718 == 'si'){
                    this.access_718_si                                 =  true
                    this.access_718_no                                 =  false
                    this.access_718_na                                 =  false
                }else if(data.access_718 == 'no'){            
                    this.access_718_si                                 =  false
                    this.access_718_no                                 =  true
                    this.access_718_na                                 =  false
                }else{          
                    this.access_718_si                                 =  false
                    this.access_718_no                                 =  false
                    this.access_718_na                                 =  true
                }

                if(data.access_721 == 'si'){
                    this.access_721_si                                 =  true
                    this.access_721_no                                 =  false
                    this.access_721_na                                 =  false
                }else if(data.access_721 == 'no'){            
                    this.access_721_si                                 =  false
                    this.access_721_no                                 =  true
                    this.access_721_na                                 =  false
                }else{          
                    this.access_721_si                                 =  false
                    this.access_721_no                                 =  false
                    this.access_721_na                                 =  true
                }

                if(data.access_722 == 'si'){
                    this.access_722_si                                 =  true
                    this.access_722_no                                 =  false
                    this.access_722_na                                 =  false
                }else if(data.access_722 == 'no'){            
                    this.access_722_si                                 =  false
                    this.access_722_no                                 =  true
                    this.access_722_na                                 =  false
                }else{          
                    this.access_722_si                                 =  false
                    this.access_722_no                                 =  false
                    this.access_722_na                                 =  true
                }

                if(data.access_731 == 'si'){
                    this.access_731_si                                 =  true
                    this.access_731_no                                 =  false
                    this.access_731_na                                 =  false
                }else if(data.access_731 == 'no'){            
                    this.access_731_si                                 =  false
                    this.access_731_no                                 =  true
                    this.access_731_na                                 =  false
                }else{          
                    this.access_731_si                                 =  false
                    this.access_731_no                                 =  false
                    this.access_731_na                                 =  true
                }

                if(data.access_732 == 'si'){
                    this.access_732_si                                 =  true
                    this.access_732_no                                 =  false
                    this.access_732_na                                 =  false
                }else if(data.access_732 == 'no'){            
                    this.access_732_si                                 =  false
                    this.access_732_no                                 =  true
                    this.access_732_na                                 =  false
                }else{          
                    this.access_732_si                                 =  false
                    this.access_732_no                                 =  false
                    this.access_732_na                                 =  true
                }

                if(data.access_741 == 'si'){
                    this.access_741_si                                 =  true
                    this.access_741_no                                 =  false
                    this.access_741_na                                 =  false
                }else if(data.access_741 == 'no'){            
                    this.access_741_si                                 =  false
                    this.access_741_no                                 =  true
                    this.access_741_na                                 =  false
                }else{          
                    this.access_741_si                                 =  false
                    this.access_741_no                                 =  false
                    this.access_741_na                                 =  true
                }

                if(data.access_742 == 'si'){
                    this.access_742_si                                 =  true
                    this.access_742_no                                 =  false
                    this.access_742_na                                 =  false
                }else if(data.access_742 == 'no'){            
                    this.access_742_si                                 =  false
                    this.access_742_no                                 =  true
                    this.access_742_na                                 =  false
                }else{          
                    this.access_742_si                                 =  false
                    this.access_742_no                                 =  false
                    this.access_742_na                                 =  true
                }

                if(data.access_743 == 'si'){
                    this.access_743_si                                 =  true
                    this.access_743_no                                 =  false
                    this.access_743_na                                 =  false
                }else if(data.access_743 == 'no'){            
                    this.access_743_si                                 =  false
                    this.access_743_no                                 =  true
                    this.access_743_na                                 =  false
                }else{          
                    this.access_743_si                                 =  false
                    this.access_743_no                                 =  false
                    this.access_743_na                                 =  true
                }

                if(data.access_744 == 'si'){
                    this.access_744_si                                 =  true
                    this.access_744_no                                 =  false
                    this.access_744_na                                 =  false
                }else if(data.access_744 == 'no'){            
                    this.access_744_si                                 =  false
                    this.access_744_no                                 =  true
                    this.access_744_na                                 =  false
                }else{          
                    this.access_744_si                                 =  false
                    this.access_744_no                                 =  false
                    this.access_744_na                                 =  true
                }

                if(data.access_745 == 'si'){
                    this.access_745_si                                 =  true
                    this.access_745_no                                 =  false
                    this.access_745_na                                 =  false
                }else if(data.access_745 == 'no'){            
                    this.access_745_si                                 =  false
                    this.access_745_no                                 =  true
                    this.access_745_na                                 =  false
                }else{          
                    this.access_745_si                                 =  false
                    this.access_745_no                                 =  false
                    this.access_745_na                                 =  true
                }

                if(data.access_746 == 'si'){
                    this.access_746_si                                 =  true
                    this.access_746_no                                 =  false
                    this.access_746_na                                 =  false
                }else if(data.access_746 == 'no'){            
                    this.access_746_si                                 =  false
                    this.access_746_no                                 =  true
                    this.access_746_na                                 =  false
                }else{          
                    this.access_746_si                                 =  false
                    this.access_746_no                                 =  false
                    this.access_746_na                                 =  true
                }

                if(data.access_747 == 'si'){
                    this.access_747_si                                 =  true
                    this.access_747_no                                 =  false
                    this.access_747_na                                 =  false
                }else if(data.access_747 == 'no'){            
                    this.access_747_si                                 =  false
                    this.access_747_no                                 =  true
                    this.access_747_na                                 =  false
                }else{          
                    this.access_747_si                                 =  false
                    this.access_747_no                                 =  false
                    this.access_747_na                                 =  true
                }

                if(data.access_748 == 'si'){
                    this.access_748_si                                 =  true
                    this.access_748_no                                 =  false
                    this.access_748_na                                 =  false
                }else if(data.access_748 == 'no'){            
                    this.access_748_si                                 =  false
                    this.access_748_no                                 =  true
                    this.access_748_na                                 =  false
                }else{          
                    this.access_748_si                                 =  false
                    this.access_748_no                                 =  false
                    this.access_748_na                                 =  true
                }

                if(data.access_749 == 'si'){
                    this.access_749_si                                 =  true
                    this.access_749_no                                 =  false
                    this.access_749_na                                 =  false
                }else if(data.access_749 == 'no'){            
                    this.access_749_si                                 =  false
                    this.access_749_no                                 =  true
                    this.access_749_na                                 =  false
                }else{          
                    this.access_749_si                                 =  false
                    this.access_749_no                                 =  false
                    this.access_749_na                                 =  true
                }

                if(data.access_7410 == 'si'){
                    this.access_7410_si                                 =  true
                    this.access_7410_no                                 =  false
                    this.access_7410_na                                 =  false
                }else if(data.access_7410 == 'no'){            
                    this.access_7410_si                                 =  false
                    this.access_7410_no                                 =  true
                    this.access_7410_na                                 =  false
                }else{          
                    this.access_7410_si                                 =  false
                    this.access_7410_no                                 =  false
                    this.access_7410_na                                 =  true
                }

                if(data.access_7411 == 'si'){
                    this.access_7411_si                                 =  true
                    this.access_7411_no                                 =  false
                    this.access_7411_na                                 =  false
                }else if(data.access_7411 == 'no'){            
                    this.access_7411_si                                 =  false
                    this.access_7411_no                                 =  true
                    this.access_7411_na                                 =  false
                }else{          
                    this.access_7411_si                                 =  false
                    this.access_7411_no                                 =  false
                    this.access_7411_na                                 =  true
                }

                if(data.access_7412 == 'si'){
                    this.access_7412_si                                 =  true
                    this.access_7412_no                                 =  false
                    this.access_7412_na                                 =  false
                }else if(data.access_7412 == 'no'){            
                    this.access_7412_si                                 =  false
                    this.access_7412_no                                 =  true
                    this.access_7412_na                                 =  false
                }else{          
                    this.access_7412_si                                 =  false
                    this.access_7412_no                                 =  false
                    this.access_7412_na                                 =  true
                }

                if(data.access_74121 == 'si'){
                    this.access_74121_si                                 =  true
                    this.access_74121_no                                 =  false
                    this.access_74121_na                                 =  false
                }else if(data.access_74121 == 'no'){            
                    this.access_74121_si                                 =  false
                    this.access_74121_no                                 =  true
                    this.access_74121_na                                 =  false
                }else{          
                    this.access_74121_si                                 =  false
                    this.access_74121_no                                 =  false
                    this.access_74121_na                                 =  true
                }

                if(data.access_74122 == 'si'){
                    this.access_74122_si                                 =  true
                    this.access_74122_no                                 =  false
                    this.access_74122_na                                 =  false
                }else if(data.access_74122 == 'no'){            
                    this.access_74122_si                                 =  false
                    this.access_74122_no                                 =  true
                    this.access_74122_na                                 =  false
                }else{          
                    this.access_74122_si                                 =  false
                    this.access_74122_no                                 =  false
                    this.access_74122_na                                 =  true
                }

                if(data.access_74123 == 'si'){
                    this.access_74123_si                                 =  true
                    this.access_74123_no                                 =  false
                    this.access_74123_na                                 =  false
                }else if(data.access_74123 == 'no'){            
                    this.access_74123_si                                 =  false
                    this.access_74123_no                                 =  true
                    this.access_74123_na                                 =  false
                }else{          
                    this.access_74123_si                                 =  false
                    this.access_74123_no                                 =  false
                    this.access_74123_na                                 =  true
                }

                if(data.access_74124 == 'si'){
                    this.access_74124_si                                 =  true
                    this.access_74124_no                                 =  false
                    this.access_74124_na                                 =  false
                }else if(data.access_74124 == 'no'){            
                    this.access_74124_si                                 =  false
                    this.access_74124_no                                 =  true
                    this.access_74124_na                                 =  false
                }else{          
                    this.access_74124_si                                 =  false
                    this.access_74124_no                                 =  false
                    this.access_74124_na                                 =  true
                }

                if(data.access_74125 == 'si'){
                    this.access_74125_si                                 =  true
                    this.access_74125_no                                 =  false
                    this.access_74125_na                                 =  false
                }else if(data.access_74125 == 'no'){            
                    this.access_74125_si                                 =  false
                    this.access_74125_no                                 =  true
                    this.access_74125_na                                 =  false
                }else{          
                    this.access_74125_si                                 =  false
                    this.access_74125_no                                 =  false
                    this.access_74125_na                                 =  true
                }

                if(data.access_74126 == 'si'){
                    this.access_74126_si                                 =  true
                    this.access_74126_no                                 =  false
                    this.access_74126_na                                 =  false
                }else if(data.access_74126 == 'no'){            
                    this.access_74126_si                                 =  false
                    this.access_74126_no                                 =  true
                    this.access_74126_na                                 =  false
                }else{          
                    this.access_74126_si                                 =  false
                    this.access_74126_no                                 =  false
                    this.access_74126_na                                 =  true
                }

                if(data.access_74127 == 'si'){
                    this.access_74127_si                                 =  true
                    this.access_74127_no                                 =  false
                    this.access_74127_na                                 =  false
                }else if(data.access_74127 == 'no'){            
                    this.access_74127_si                                 =  false
                    this.access_74127_no                                 =  true
                    this.access_74127_na                                 =  false
                }else{          
                    this.access_74127_si                                 =  false
                    this.access_74127_no                                 =  false
                    this.access_74127_na                                 =  true
                }

                if(data.access_74131 == 'si'){
                    this.access_74131_si                                 =  true
                    this.access_74131_no                                 =  false
                    this.access_74131_na                                 =  false
                }else if(data.access_74131 == 'no'){            
                    this.access_74131_si                                 =  false
                    this.access_74131_no                                 =  true
                    this.access_74131_na                                 =  false
                }else{          
                    this.access_74131_si                                 =  false
                    this.access_74131_no                                 =  false
                    this.access_74131_na                                 =  true
                }

                if(data.access_74132 == 'si'){
                    this.access_74132_si                                 =  true
                    this.access_74132_no                                 =  false
                    this.access_74132_na                                 =  false
                }else if(data.access_74132 == 'no'){            
                    this.access_74132_si                                 =  false
                    this.access_74132_no                                 =  true
                    this.access_74132_na                                 =  false
                }else{          
                    this.access_74132_si                                 =  false
                    this.access_74132_no                                 =  false
                    this.access_74132_na                                 =  true
                }

                if(data.access_74133 == 'si'){
                    this.access_74133_si                                 =  true
                    this.access_74133_no                                 =  false
                    this.access_74133_na                                 =  false
                }else if(data.access_74133 == 'no'){            
                    this.access_74133_si                                 =  false
                    this.access_74133_no                                 =  true
                    this.access_74133_na                                 =  false
                }else{          
                    this.access_74133_si                                 =  false
                    this.access_74133_no                                 =  false
                    this.access_74133_na                                 =  true
                }

                if(data.access_74134 == 'si'){
                    this.access_74134_si                                 =  true
                    this.access_74134_no                                 =  false
                    this.access_74134_na                                 =  false
                }else if(data.access_74134 == 'no'){            
                    this.access_74134_si                                 =  false
                    this.access_74134_no                                 =  true
                    this.access_74134_na                                 =  false
                }else{          
                    this.access_74134_si                                 =  false
                    this.access_74134_no                                 =  false
                    this.access_74134_na                                 =  true
                }

                if(data.access_74141 == 'si'){
                    this.access_74141_si                                 =  true
                    this.access_74141_no                                 =  false
                    this.access_74141_na                                 =  false
                }else if(data.access_74141 == 'no'){            
                    this.access_74141_si                                 =  false
                    this.access_74141_no                                 =  true
                    this.access_74141_na                                 =  false
                }else{          
                    this.access_74141_si                                 =  false
                    this.access_74141_no                                 =  false
                    this.access_74141_na                                 =  true
                }

                if(data.access_74142 == 'si'){
                    this.access_74142_si                                 =  true
                    this.access_74142_no                                 =  false
                    this.access_74142_na                                 =  false
                }else if(data.access_74142 == 'no'){            
                    this.access_74142_si                                 =  false
                    this.access_74142_no                                 =  true
                    this.access_74142_na                                 =  false
                }else{          
                    this.access_74142_si                                 =  false
                    this.access_74142_no                                 =  false
                    this.access_74142_na                                 =  true
                }

                if(data.access_74143 == 'si'){
                    this.access_74143_si                                 =  true
                    this.access_74143_no                                 =  false
                    this.access_74143_na                                 =  false
                }else if(data.access_74143 == 'no'){            
                    this.access_74143_si                                 =  false
                    this.access_74143_no                                 =  true
                    this.access_74143_na                                 =  false
                }else{          
                    this.access_74143_si                                 =  false
                    this.access_74143_no                                 =  false
                    this.access_74143_na                                 =  true
                }

                if(data.pictograma == 'si'){
                    this.pictograma_si                                 =  true
                    this.pictograma_no                                 =  false
                    this.pictograma_na                                 =  false
                }else if(data.pictograma == 'no'){            
                    this.pictograma_si                                 =  false
                    this.pictograma_no                                 =  true
                    this.pictograma_na                                 =  false
                }else{          
                    this.pictograma_si                                 =  false
                    this.pictograma_no                                 =  false
                    this.pictograma_na                                 =  true
                }

               
            }
           
     },
     mounted(){
         this.nota_entrega_id = this.$route.params.id
         this.notification = 'Boleta N°  ' + this.nota_entrega_id
         this.getOrderingBallotById(this.nota_entrega_id)
     }
 }
 </script>
 <style scoped>
 .form_contacto{
     background: white;
     padding: 5%;
     border-radius: 8px;

     background-repeat: no-repeat;
     background-size: cover;
     background-position: center;
     height: auto;
     width: auto;
 }

 .encabezado{
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     line-height: 0.5;
     margin-left: 10%;
 }
 .titlenota{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    font-weight: bold;
 }
 .title_tramite{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    text-align: center;
    width: 80%;
    margin: auto;

 }
 .article{
    font-size: 12px;
 }
 .title_1{
    font-weight: bold;
 }
 .logo{
     display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: space-around;
     flex-wrap: wrap;
  
   
 }
 .title_section{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
 }
 .sub-title{
     margin-left: 10%;
 }
 img{
    object-fit: cover;
    width:82%;
    height:100%;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 80%;
    margin: auto;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  .td-center{
    text-align: center;
  }
  .bold{
    font-weight: bold;
  }
  .parrafo{
    width: 80%;
    margin: auto;
    font-size: 16px;
  }
  .inspeccion{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
    .inter{
        font-size: 12px;
    }
    .check{
        text-align: center;
    }

 </style>

 
  
 

