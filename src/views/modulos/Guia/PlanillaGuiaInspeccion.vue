<template>
    <div>
        <v-row>
     
        </v-row>
        <vue-html2pdf
         :show-layout="false"
         :float-layout="false"
         :enable-download="true"
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
            <section slot="pdf-content"  class="form_contacto" >
                <section style="width:100%" class="pdf-item">
                    <TitleSection v-show="btn_atras" :sectiontitle="sectiontitle"/>
                    <div class="logo">
                        <img style="object-fit: cover;" src="img/logos_CONAPDIS/CABECERA.png"  alt="">
                    </div>
                    <div class="title_section">
                        <h4 class="mt-3">{{ title_section }}</h4>
                    </div><br>
                    <div class="text-center"><h4>1.	GUÍA DE INSPECCIÓN</h4></div>
                    <div class="inspeccion">
                        <div>a) Guía N° : <strong>{{numeroguia}}</strong></div>
                        <div>b) Fecha : <strong>{{fechaguia}}</strong></div>
                    </div><br><br>
                    <table>
                        <tr>
                            <th style="font-size:14px" class="td-center" colspan="5">SE PRACTICA INSPECCIÓN EN VIRTUD DE LO ESTABLECIDO EN EL ARTÍCULO 81 DE LA CONSTITUCIÓN DE LA REPÚBLICA BOLÍVARIANA DE VENEZUELA; ARTÍCULO 9 DE LA CONVENCIÓN SOBRE LOS DERECHOS DE LAS PERSONAS CON DISCAPACIDAD; Y, LOS ARTÍCULOS 28, 31, 32, 33, 35, 72 Y 79 DE LA LEY PARA LAS PERSONAS CON DISCAPACIDAD.</th>
                          </tr>
                          <tr>
                              <th class="td-center" colspan="5">2.DEL REGISTRO:</th>
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
                    </table>
                </section>
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
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
                        <tr>
                            <th class="td-center" colspan="5">5. DE LOS DATOS DEL ADMINISTRADO (A) DESIGNADO (A) PARA PRACTICAR LA INSPECCIÓN:</th>
                        </tr>
                        <tr>
                            <td colspan="2" class="bold">5.1 Nombre(s):</td>
                            <td colspan="2" class="bold">5.2 Apellido(s</td>
                            <td colspan="2" class="bold">5.3 C.I.N°</td>
                        </tr>
                        <tr>
                            <td colspan="2">Rafael Ramon</td>
                            <td colspan="2">Urbaneja Galindo</td>
                            <td colspan="2">14525363</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="bold">5.4 Cargo :</td>
                            <td colspan="2" class="bold">5.5 Telefono:</td>
                            <td colspan="2" class="bold">5.6 Email:</td>
                        </tr>
                        <tr>
                            <td colspan="2">Coordinador</td>
                            <td colspan="2">0424-152-36-98</td>
                            <td colspan="2">coordinador@conapdis.com</td>
                        </tr>
                        <tr>
                            <td class=" bold" colspan="2">a.	Nombre (s):</td>
                            <td  colspan="2"  class=" bold">b.	Apellido (s):</td>
                            <td  colspan="2"  class=" bold">c.	C. I. N°:</td>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5">6. DE LA CLASIFICACIÓN DE LA EDIFICACIÓN SEGÚN EL TIPO DE OCUPACIÓN</th>
                        </tr>
                
                        <tr>
                            <td class="text-center" colspan="5">{{ type_ocupation }}</td>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5">7.	DEL EMPLEO PARA LAS PERSONAS CON DISCAPACIDAD – INSERCIÓN LABORAL</th>
                        </tr>
                        <tr>
                            <td colspan="5" class="text-center">Ley para las Personas con Discapacidad - G.O. N° 38.598 - 05/01/2007 Artículos: 28.
                            </td>
                     
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5">7.1.	De la Nómina Total:</th>
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
                            <th class="td-center" colspan="5"> 7.2.	Del 5% de las Personas con Discapacidad Permanente Incorporadas al Plantel de Trabajo</th>
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
                                <input type="checkbox" v-model="de_20_39_si">&nbsp;&nbsp;&nbsp;
                                <label for="vehicle1">No</label>&nbsp;
                                <input type="checkbox" v-model="de_20_39_no">
                            </td>
                            <td class="check">
                                <label for="vehicle1">Si</label>&nbsp;
                                <input type="checkbox" v-model="de_40_59_si">&nbsp;&nbsp;&nbsp;
                                <label for="vehicle1">No</label>&nbsp;
                                <input type="checkbox" v-model="de_40_59_no">
                            </td>
                            <td class="check">
                                <label for="vehicle1">Si</label>&nbsp;
                                <input type="checkbox" v-model="de_60_79_si">&nbsp;&nbsp;&nbsp;
                                <label for="vehicle1">No</label>&nbsp;
                                <input type="checkbox" v-model="de_60_79_no">
                            </td>
                            <td class="check">
                                <label for="vehicle1">Si</label>&nbsp;
                                <input type="checkbox" v-model="de_80_99_si">&nbsp;&nbsp;&nbsp;
                                <label for="vehicle1">No</label>&nbsp;
                                <input type="checkbox" v-model="de_80_99_no">
                            </td>
                            <td class="check">
                                <label for="vehicle1">Si</label>&nbsp;
                                <input type="checkbox" v-model="de_100_119_si">&nbsp;&nbsp;&nbsp;
                                <label for="vehicle1">No</label>&nbsp;
                                <input type="checkbox" v-model="de_100_119_no">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">f.	Si supera el número 119 del Total Nómina (T.N.) Especificar Número de Personas con Discapacidad Permanente Incorporadas al Plantel de Trabajo:</td>
                            <td class="text-center">{{ total_discapacidad }}</td>
                        </tr>
                    </table>
                </section>
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                        <tr>
                            <th class="td-center" colspan="5"> 8.	ATENCION PREFERENCIAL</th>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5" style="font-size:10px">Ley para las Personas con Discapacidad - G.O. N° 38.598 - 05/01/2007 Artículos: 35.</th>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">a.	Pleno Acceso</td>
                            <td  class=" bold">b.	Buen Trato</td>
                            <td  class=" bold">c. Debida Información</td>
                            <td  class=" bold">d. Agilidad en los Tramites </td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="2">{{ pleno_acceso }}</td>
                            <td class="text-center">{{ buen_trato }}</td>
                            <td class="text-center">{{ debida_informacion }}</td>
                            <td class="text-center">{{ agilidad_en_los_tramites }}</td>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5"> 9.	DEL REGISTRO DE TRABAJADORES (AS) CON DISCAPACIDAD ANTE EL CONAPDIS:</th>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5" style="font-size:10px">Ley para las Personas con Discapacidad - G.O. N° 38.598 - 05/01/2007 Artículos: 72.</th>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5">De la Información Semestral Emitida al CONAPDIS sobre el Número de Trabajadores (as) con Discapacidad Empleados (as), Su Identidad, Tipo de Discapacidad y Actividad que desempeña cada uno (a):  </th>
                        </tr>
                        <tr>
                            <td colspan="3"  class=" bold">a.	¿La entidad de trabajo ha informado al CONAPDIS?:  </td>
                            <td  class=" bold">   
                                <label for="vehicle1">b. ¿Si?</label>&nbsp;
                                <input type="checkbox" v-model="debida_informacion_si">&nbsp;&nbsp;&nbsp;
                            </td>
                            <td  class=" bold">
                                <label for="vehicle1">c.  ¿No?</label>&nbsp;
                                <input type="checkbox" v-model="debida_informacion_no">&nbsp;&nbsp;&nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">d.	Último (s) Periodo (s) Informado:</td>
                            <td class=" bold">e.	Constancia del Primer Semestre:</td>
                            <td colspan="2"   class=" bold">f.	Constancia del Segundo Semestre:</td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">g.</td>
                            <td class=" bold">h.</td>
                            <td colspan="2"   class=" bold">i.</td>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5">10.	DE LAS NORMAS Y REGLAMENTACIONES TÉCNICAS DE ACCESIBILIDAD</th>
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
                    </table>
                </section>
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                        <tr>
                            <th class="td-center" colspan="5">11.	DE LA ACCESIBILIDAD PARA PERSONAS EN EDIFICACIONES</th>
                        </tr>
                        <tr>
                            <th colspan="5"><strong>11.1.	DE LAS DEFINICIONES:</strong> Para el propósito de esta Guía de Inspección se aplican la siguientes definiciones:</th>
                        </tr>
                        <tr>
                            <th colspan="5">a.	Accesibilidad: Es la condición de las edificaciones y su entorno urbano que garantiza y/o facilita a las personas su ingreso, 
                                el recorrido, su utilización y el egreso de las mismas en forma segura, autónoma y cómoda.</th>
                        </tr>
                        <tr>
                            <th colspan="5">b.	Accesibilidad Arquitectónica: La condición de las edificaciones que garantiza el acceso a todos los ambientes a las personas, 
                                sin obstáculos ni barreras, con seguridad y de manera cómoda.</th>
                        </tr>
                        <tr>
                            <th colspan="5">c.	Accesibilidad Urbana: La condición de los ambientes y entornos urbanos que garantizan el desenvolvimiento seguro, autónomo y cómodo de las personas en ellos. </th>
                        </tr>
                        <tr>
                            <th colspan="5">d.	Adecuación Urbanística: Es aquella que establece los requisitos mínimos del diseño y la modificación de las obras urbanas existentes para que sean accesibles a las personas.</th>
                        </tr>
                        <tr>
                            <th colspan="5">e.	Barreras Físicas: Todos aquellos obstáculos físicos, infranqueables, que limiten o impidan el normal desenvolvimiento o uso de los bienes y servicios por las personas. </th>
                        </tr>
                        <tr>
                            <th colspan="5">f.	Barreras Arquitectónicas: Barreras físicas en las edificaciones que dificulten limiten o impidan el desenvolvimiento y uso seguro, autónomo, normal y cómodo de las personas en ellos.</th>
                        </tr>
                        <tr>
                            <th colspan="5">g.	Barreras Urbanísticas: Barreras físicas en los ambientes y entornos urbanos, que dificultan, limitan o impidan el desenvolvimiento y uso seguro, autónomo, normal y cómodo de las personas en ellos.</th>
                        </tr>
                        <tr>
                            <th colspan="5">h.	Transitabilidad: Características de las vías de circulación en las edificaciones y en los espacios urbanos, que permiten el libre transito de las personas con seguridad y comodidad. </th>
                        </tr>
                        <tr>
                            <th colspan="5">i.	Edificaciones Privadas de Uso Público: Son edificaciones de propiedad privada pero destinadas al uso público tal es el caso de comercios, oficinas, centros educativos y recreativos 
                                (teatros, cines y sala de espectáculos), clubes, asistenciales, entre otras.</th>
                        </tr>
                    </table>
                </section>
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                        <tr>
                            <td colspan="2"  class=" bold">11.2.	DE LOS REQUISITOS GENERALES DE ACCESIBILIDAD</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">11.2.1.	De las Aceras en las Salientes de la Edificación: 
                                ¿Las aceras ubicadas en las salientes de la edificación se encuentran libres y sin obstáculos, 
                                lo que pudiera determinar barreras urbanísticas hacia el ambiente o entorno urbano?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="aceras_salientes_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="aceras_salientes_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="aceras_salientes_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">11.2.2.	De las Rampas en Aceras: ¿Los accesos de la edificación 
                                que no están a nivel de las aceras o en los cruces de una acera a otra, cuentan con rampas 
                                en las esquinas conforme a la Referencias Normativas de la Norma Técnica (NTF) FONDONORMA 2733:2004 -   
                                Diseño Norma COVENIN 3656?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="rampas_en_aceras_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="rampas_en_aceras_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="rampas_en_aceras_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">11.3.	DE LA SEÑALIZACIÓN DE ACCESIBILIDAD:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">¿La edificación cuenta con señales que orienten y faciliten la transitabilidad 
                                conforme a la Referencias Normativas de la Norma Técnica (NTF) FONDONORMA 2733:2004 - COVENIN 187; 330; 3296; 3297 y 3298? </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="edificaciones_senales_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="edificaciones_senales_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="edificaciones_senales_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">¿En los sitios visibles de los accesos de la edificación, cuentan con el símbolo internacional de accesibilidad? </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="simbolo_internacional_senalizacion_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="simbolo_internacional_senalizacion_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="simbolo_internacional_senalizacion_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">11.4.	DE LOS ESTACIONAMIENTOS:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">11.4.1.	¿La edificación cuenta con estacionamiento de uso público 
                                y dispone de puestos para estacionar vehículos conducidos o que transporten 
                                personas con movilidad reducida cumpliendo con las debidas especificaciones 
                                tales como dimensiones, ubicación y señalización de puestos; conforme a lo 
                                dispuesto en las normas y reglamentaciones técnicas FONDONORMA NTF 2733 y la 
                                Referencia Normativa de esta - COVENIN 187?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="estacionamientos_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="estacionamientos_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="estacionamientos_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">11.5.	EN LAS EDIFICACIONES:   /  11.5.1.	De los Accesos: </td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">11.5.1.1.	¿Los accesos a la edificación disponen de rampas conjuntamente con 
                                escaleras en los desniveles entre la acera y la edificación a nivel de planta baja?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="acceso_planta_baja_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="acceso_planta_baja_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="acceso_planta_baja_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">11.5.1.2.	¿Internamente la edificación dispone de rampas 
                                conjuntamente con escaleras en los desniveles en la planta baja hasta 
                                los medios de circulación vertical?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="acceso_pb_vertical_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="acceso_pb_vertical_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="acceso_pb_vertical_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">11.5.2.	<strong>De los Pasillos:</strong> ¿Los pasillos de la edificación cumplen con 
                                las especificaciones y dimensiones tales como iluminación natural o artificial, 
                                ancho y extremo que permita el giro de una persona en silla de rueda, entre otras 
                                especificaciones que deben verificarse conforme a lo dispuesto en las reglamentaciones 
                                técnicas FONDONORMA NTF 2733?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_los_pasillos_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_los_pasillos_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_los_pasillos_na">
                            </td>
                        </tr>
                    </table>
                </section>
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                        <tr>
                            <td colspan="2">11.5.2.	<strong>11.5.3.	De las Escaleras: </strong> : Las escaleras de la 
                                edificación cumplen con las dimensiones y especificaciones conforme a lo dispuesto en 
                                las normas y reglamentaciones técnicas FONDONORMA NTF 2733 y las Referencias Normativas 
                                de esta - COVENIN 3657, 3658, 187 y 3298?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_las_escaleras_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_las_escaleras_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_las_escaleras_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">11.5.4.	De las Barandas en Rampas y Escaleras:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">En caso de ausencia de paredes laterales que representa un peligro de caída: 
                                ¿Las rampas y escaleras  disponen de barandas firmes, pasamanos con la altura de 80 y 90 cm., 
                                capacidad de carga ≥ 150 Kg y distanciamiento entre barras ≤ 15 cm. al menos en un sentido?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_las_barandas_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_las_barandas_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_las_barandas_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">11.5.5.	De las Puertas:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">¿Los ambientes de la edificación separados mediante puertas, 
                                en cualquier tipo de modalidad, se prevé el paso a personas en silla de 
                                ruedas cumpliendo con las dimensiones y especificaciones de las puertas 
                                tales como sistemas manuales de apertura y cierre y umbrales, conforme a 
                                lo dispuesto en las normas y reglamentaciones técnicas FONDONORMA NTF 2733.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_las_puertas_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_las_puertas_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_las_puertas_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">11.5.6.	De los Puntos de control:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">Si la edificación tiene establecido puntos de control, 
                                ¿al menos uno de los puntos de control cumple con las dimensiones de 
                                ancho mínimo de 90 cm., que no obstaculice el paso de una persona en 
                                silla de rueda conforme a lo dispuesto en las normas y reglamentaciones 
                                técnicas FONDONORMA NTF 2733?.</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_los_puntos_de_control_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_los_puntos_de_control_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_los_puntos_de_control_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">11.5.7.	De los Ascensores:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">Los ascensores de la edificación cumplen con las dimensiones y 
                                especificaciones de los dispositivos tales como plataforma de cabina, 
                                puertas del ascensor, botón del panel control, botón de emergencia y de 
                                parada, botón de llamada en cada nivel, pasamanos en los cerramientos 
                                fijos y dispositivos y luminosos; conforme a lo dispuesto en las normas y 
                                reglamentaciones técnicas FONDONORMA NTF 2733 y referencia normativa de esta - NTF/3656?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_los_ascensores_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_los_ascensores_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_los_ascensores_na">
                            </td>
                        </tr>
                    </table>
                </section>
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                        <tr>
                            <td colspan="2"  class=" bold">11.5.8.	De los Servicios Sanitarios:</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">Las salas de servicio sanitario de uso público de la edificación, 
                                son accesibles a una persona en silla de rueda de manera que su ocupante entre 
                                en el recinto, cierre la puerta, se dirija desde una posición frontal o lateral 
                                a las piezas sanitarias y pueda mantenerse en privado conforme a lo dispuesto en 
                                las normas y reglamentaciones técnicas FONDONORMA NTF 2733? </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_los_servicios_sanitarios_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_los_servicios_sanitarios_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="de_los_servicios_sanitarios_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>11.5.8.1. Señalización:</strong>¿Las entradas de los servicios sanitarios 
                                de uso público de la edificación (accesibles a una persona en silla de ruedas) 
                                tienen colocados el símbolo internacional de accesibilidad?  </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="senalizacion_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="senalizacion_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="senalizacion_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>11.5.8.2.	Lavamanos: </strong>¿Los lavamanos cumplen con las 
                                dimensiones y especificaciones o accesorios, de tal manera que permita su uso a personas 
                                en sillas de ruedas, conforme a lo dispuesto en las normas y reglamentaciones técnicas 
                                FONDONORMA NTF 2733?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="lavamanos_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="lavamanos_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="lavamanos_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>11.5.8.3.	Barras de Sostén: </strong>¿Los recintos privados, accesibles a 
                                una persona en silla de ruedas, tienen colocados barreras de sostén y cumplen con las dimensiones 
                                y especificaciones conforme a lo dispuesto en las normas y reglamentaciones técnicas FONDONORMA NTF 2733?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="barra_de_sosten_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="barra_de_sosten_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="barra_de_sosten_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>11.5.8.4.	Accesorios Sanitarios: </strong>¿Los accesorios sanitarios tales como 
                                dispensador de jabón, secador de manos, dispensador de toallas u otros, están ubicados a una altura 
                                máxima de 1,00 m sobre el nivel del piso? </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="accesorios_sanitarios_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="accesorios_sanitarios_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="accesorios_sanitarios_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>11.5.8.5.	Escusados en baño de uso público:  </strong>¿El recinto utilizable por la 
                                persona en silla de ruedas, se ubica lo más lejos posible de la entrada principal del sanitarios y cumple 
                                las dimensiones y demás especificaciones tales como dimensiones mínimas del recinto, ancho mínimo de la 
                                puerta, espacio lateral para la transferencia desde la silla de rueda al WC así como el espacio de giro 
                                de maniobra; conforme a lo dispuesto en las normas y reglamentaciones técnicas FONDONORMA NTF 2733? </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="excusado_bano_publico_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="excusado_bano_publico_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="excusado_bano_publico_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>11.5.8.6.	Urinarios:  </strong>¿Las salas de servicios sanitarios de uso público 
                                para varones, al menos uno de los urinarios, cumplen las dimensiones y especificaciones conforme a lo 
                                dispuesto en las normas y reglamentaciones técnicas? (NTF-2733) </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="urinarios_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="urinarios_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="urinarios_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>11.5.8.7.	Duchas: </strong>Las duchas cumplen las especificaciones conforme a lo 
                                dispuesto en las normas y reglamentaciones técnicas FONDONORMA NTF 2733? </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="duchas_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="duchas_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="duchas_na">
                            </td>
                        </tr>
                    </table>
                </section>
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-3">
                    <table>
                        <tr>
                            <td colspan="2"  class=" bold">1.1.1.	VENTANAS, CONTROLES Y ACCESORIOS EN GENERAL</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>11.5.9.1.	La altura de las cerraduras de ventanas, controles y accesorios</strong>que puedan ser 
                                manipulados por los usuarios, así como el borde inferior de las ventanas en los ambientes de permanencia prolongadas 
                                por personas ¿cumplen las especificaciones o dimensiones conforme con lo dispuesto en la norma técnica FONDONORMA NTF 2733? </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="altura_cerradura_ventanas_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="altura_cerradura_ventanas_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="altura_cerradura_ventanas_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">11.5.9.2.	TOMA DE ELECTRICIDAD, DE COMUNICACIONES E INTERRUPTORES DE CIRCUITOS DE ILUMINACIÓN</td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>11.5.9.3.	Las tomas de electricidad y de comunicaciones, </strong>así como los interruptores de los 
                                circuitos de iluminación ¿cumplen las especificaciones o dimensiones conforme con lo dispuesto 
                                en la norma técnica FONDONORMA NTF 2733? </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="tomas_electricidad_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="tomas_electricidad_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="tomas_electricidad_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"  class=" bold">11.5.10.	CENTROS CULTURALES, DE ENTRETENIMIENTO Y SALA DE ESPECTACULOS PÚBLICOS </td>
                            <td  class=" bold text-center">SI:</td>
                            <td  class=" bold text-center">NO:</td>
                            <td  class=" bold text-center">N/A </td>
                        </tr>
                        <tr>
                            <td colspan="2">11.5.10.1.	De ser un lugar de esparcimiento y recreación cerrado, tales como  teatros, cines, 
                                auditórium, entre otros, ¿tienen reservados y demarcados lugares para la ubicación de personas en silla de 
                                ruedas, conforme con lo dispuesto en la norma técnica NTF-2733?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="lugar_de_esparcimiento_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="lugar_de_esparcimiento_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="lugar_de_esparcimiento_na">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">11.5.10.2.	¿Los lugares para las personas en sillas de rueda están ubicados sobre zonas 
                                horizontales de tal manera que, permita una buena visión hacia el área donde se presenta el evento, 
                                cumpliendo así las características conforme con lo dispuesto en la norma técnica NTF-2733?</td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="lugares_psr_si">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="lugares_psr_no">
                            </td>
                            <td  class=" bold text-center">
                                <input type="checkbox" v-model="lugares_psr_na">
                            </td>
                        </tr>
                    </table>
                </section>
                <div class="html2pdf__page-break"/>
                <section class="pdf-item mt-5">
                    <table>
                        <tr>
                            <th class="td-center" colspan="5">11.6.	DE LOS DATOS DEL ADMINISTRADO (A) DESIGNADO (A) PARA EL ACOMPAÑAMIENTO DURANTE LA PRACTICA DE LA INSPECCIÓN:</th>
                        </tr>
                        <tr>
                            <th colspan="2" class="text-center">Nombre (s):</th>
                            <th colspan="2" class="text-center">Apellido (s):</th>
                            <th colspan="1" class="text-center">C. I. N°:</th>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td colspan="2"></td>
                            <td colspan="1"></td>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5">11.6.	DE LOS DATOS DEL ADMINISTRADO (A) DESIGNADO (A) PARA EL ACOMPAÑAMIENTO DURANTE LA PRACTICA DE LA INSPECCIÓN:</th>
                        </tr>
                        <tr>
                            <td class=" bold"  colspan="2" style="height: 100px;">Cargo:</td>
                            <td  colspan="2"   class=" bold text-center">Firma</td>
                            <td  colspan="2"  class=" bold text-center">Impresión Dactilar:</td>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5">11.7.	DE LOS DATOS DEL FUNCIONARIO INSPECTOR ACTUANTE:</th>
                        </tr>
                        <tr>
                            <th colspan="2" class="text-center">Nombre (s):</th>
                            <th colspan="2" class="text-center">Apellido (s):</th>
                            <th colspan="1" class="text-center">C. I. N°:</th>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td colspan="2"></td>
                            <td colspan="1"></td>
                        </tr>
                        <tr>
                            <th class="td-center" colspan="5">11.6.	DE LOS DATOS DEL ADMINISTRADO (A) DESIGNADO (A) PARA EL ACOMPAÑAMIENTO DURANTE LA PRACTICA DE LA INSPECCIÓN:</th>
                        </tr>
                        <tr>
                            <td class=" bold"  colspan="2" style="height: 100px;">Cargo:</td>
                            <td  colspan="2"   class=" bold text-center">Firma</td>
                            <td  colspan="2"  class=" bold text-center">Sello Humedo</td>
                        </tr>
                        <tr>
                            <td  colspan="3"  >Providencia Administrativa N°:</td>
                            <td  colspan="2" >Fecha y Hora</td>  
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
        

                 <!--    <v-row class="table">
                        <table>
                     
                             <tr>
                                <th class="td-center" colspan="5">3. DEL REGISTRO DE LA ENTIDAD DE TRABAJO O RAZÓN SOCIAL:</th>
                            </tr>
                            <tr>
                                <td colspan="2" class="bold">3.1 Expediente N° :</td>
                                <td colspan="2" class="bold">3.2 Solicitud de Inspección N°:</td>
                                <td colspan="2" class="bold">3.3 Unidad de Fiscalización:</td>
                            </tr>
                            <tr>
                                <td colspan="2">4524785986</td>
                                <td colspan="2">521</td>
                                <td colspan="2">1ra AMC</td>
                            </tr>
                            <tr>
                                <td colspan="2"  class=" bold">3.4 Guía de Inspección Técnica N°:</td>
                                <td  class=" bold">3.5 Fecha de la Guía Inspección:</td>
                                <td  class=" bold">3.6 Boleta de Ordenamientos N°:</td>
                                <td  class=" bold">3.7 Fecha de la Boleta de ordenamientos:</td>
                            </tr>
                            <tr>
                                <td colspan="2">0001</td>
                                <td>06/02/2023</td>
                                <td>5252</td>
                                <td>06/02/2023</td>
                            </tr--> 
            </section>
        </vue-html2pdf>
    </div>
 </template>
 <script>
 import VueHtml2pdf from 'vue-html2pdf'
 import guiaModule   from '@/store/modules/guiaModule';
  
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
            desserts : [

            ],
            detalles : [

            ],
            notification : '',
            sectiontitle : '',
            nota_entrega_id : '',
            date : new Date(Date.now()),
            customer : '',
            numeroguia:'',
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
            debida_informacion_si                   : false,
            debida_informacion_no                   : false,
            aceras_salientes_si                     : false,
            aceras_salientes_no                     : false,
            aceras_salientes_na                     : false,
            rampas_en_aceras_si                     : false,
            rampas_en_aceras_no                     : false,
            rampas_en_aceras_na                     : false,
            edificaciones_senales_si                : false,
            edificaciones_senales_no                : false,
            edificaciones_senales_na                : false,
            estacionamientos_si                     : false,
            estacionamientos_no                     : false,
            estacionamientos_na                     : false,
            simbolo_internacional_senalizacion_si   : false,
            simbolo_internacional_senalizacion_no   : false,
            simbolo_internacional_senalizacion_na   : false,
            acceso_planta_baja_si                   : false,
            acceso_planta_baja_no                   : false,
            acceso_planta_baja_na                   : false,
            acceso_pb_vertical_si                   : false,
            acceso_pb_vertical_no                   : false,
            acceso_pb_vertical_na                   : false,
            de_los_pasillos_si                      : false,
            de_los_pasillos_no                      : false,
            de_los_pasillos_na                      : false,
            de_las_escaleras_si                     : false,
            de_las_escaleras_no                     : false,
            de_las_escaleras_na                     : false,
            de_las_barandas_si                      : false,
            de_las_barandas_no                      : false,
            de_las_barandas_na                      : false,
            de_las_puertas_si                       : false,
            de_las_puertas_no                       : false,
            de_las_puertas_na                       : false,
            de_los_puntos_de_control_si             : false,
            de_los_puntos_de_control_no             : false,
            de_los_puntos_de_control_na             : false,
            de_los_ascensores_si                    : false,
            de_los_ascensores_no                    : false,
            de_los_ascensores_na                    : false,
            de_los_servicios_sanitarios_si          : false,
            de_los_servicios_sanitarios_no          : false,
            de_los_servicios_sanitarios_na          : false,
            senalizacion_si                         : false,
            senalizacion_no                         : false,
            senalizacion_na                         : false,
            lavamanos_si                            : false,
            lavamanos_no                            : false,
            lavamanos_na                            : false,
            barra_de_sosten_si                      : false,
            barra_de_sosten_no                      : false,
            barra_de_sosten_na                      : false,
            accesorios_sanitarios_si                : false,
            accesorios_sanitarios_no                : false,
            accesorios_sanitarios_na                : false,
            excusado_bano_publico_si                : false,
            excusado_bano_publico_no                : false,
            excusado_bano_publico_na                : false,
            urinarios_si                            : false,
            urinarios_no                            : false,
            urinarios_na                            : false,
            duchas_si                               : false,
            duchas_no                               : false,
            duchas_na                               : false,
            altura_cerradura_ventanas_si            : false,
            altura_cerradura_ventanas_no            : false,
            altura_cerradura_ventanas_na            : false,
            tomas_electricidad_si                   : false,
            tomas_electricidad_no                   : false,
            tomas_electricidad_na                   : false,
            lugar_de_esparcimiento_si               : false,
            lugar_de_esparcimiento_no               : false,
            lugar_de_esparcimiento_na               : false,
            lugares_psr_si                          : false,
            lugares_psr_no                          : false,
            lugares_psr_na                          : false,

            
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
             //console.log(event)
         },
         formatofecha(fecha) {
             var date = new Date(fecha);
             let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
             return  formatted_date;
         },
        async getInspectionRequestById(id){  
            this.overlay = true
            const {data} = await guiaModule.getInspectionRequestById(id)   
            console.log(data)
            this.numeroguia                 = data.data.num_guia
            this.fechaguia                  = data.data.date_inspection
            this.solicitudnumero            = data.data.inspection_request.id
            this.unidadfiscalizacion        = data.data.inspection_unit.name
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
            this.position                   = data.data.busine.position
            this.identitycard               = data.data.busine.identity_card_rl 
            this.type_ocupation             = data.data.occupation_type.name
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
                this.debida_informacion_si = true 
                this.debida_informacion_no = false
            }else{
                this.debida_informacion_si = false 
                this.debida_informacion_no = true
            }
            this.checkboxNomina(data.data.guidelaborInsertion)    
            this.guideAccessibilityReq(data.data.guideAccessibilityReq)                     
            this.overlay = false 
        },
        checkboxNomina(data){
            if(data.de_20_a_39 == 0){
                this.de_20_39_si = true 
                this.de_20_39_no = false
            }else{
                this.de_20_39_si = false 
                this.de_20_39_no = true
            }

            if(data.de_40_a_59 == 0){
                this.de_40_59_si = true 
                this.de_40_59_no = false
            }else{
                this.de_40_59_si = false 
                this.de_40_59_no = true
            }

            if(data.de_60_a_79 == 0){
                this.de_60_79_si = true 
                this.de_60_79_no = false
            }else{
                this.de_60_a_79_si = false 
                this.de_60_a_79_no = true
            }

            if(data.de_80_a_99 == 0){
                this.de_80_99_si = true 
                this.de_80_99_no = false
            }else{
                this.de_80_99_si = false 
                this.de_80_99_no = true
            }

            if(data.de_100_a_119 == 0){
                this.de_100_119_si = true 
                this.de_100_119_no = false
            }else{
                this.de_100_119_si = false 
                this.de_100_119_no = true
            }
        },
                    
           
        guideAccessibilityReq(data){
                if(data.aceras_salientes == 'si'){
                    this.aceras_salientes_si                                 =  true
                    this.aceras_salientes_no                                 =  false
                    this.aceras_salientes_na                                 =  false
                }else if(data.aceras_salientes == 'no'){            
                    this.aceras_salientes_si                                 =  false
                    this.aceras_salientes_no                                 =  true
                    this.aceras_salientes_na                                 =  false
                }else{          
                    this.aceras_salientes_si                                 =  false
                    this.aceras_salientes_no                                 =  false
                    this.aceras_salientes_na                                 =  true
                }

                if(data.rampas_en_aceras == 'si'){
                    this.rampas_en_aceras_si                                 =  true
                    this.rampas_en_aceras_no                                 =  false
                    this.rampas_en_aceras_na                                 =  false
                }else if(data.rampas_en_aceras == 'no'){            
                    this.rampas_en_aceras_si                                 =  false
                    this.rampas_en_aceras_no                                 =  true
                    this.rampas_en_aceras_na                                 =  false
                }else{          
                    this.rampas_en_aceras_si                                 =  false
                    this.rampas_en_aceras_no                                 =  false
                    this.rampas_en_aceras_na                                 =  true
                }

                if(data.edificaciones_senales == 'si'){
                    this.edificaciones_senales_si                            =  true
                    this.edificaciones_senales_no                            =  false
                    this.edificaciones_senales_na                            =  false
                }else if(data.edificaciones_senales == 'no'){       
                    this.edificaciones_senales_si                            =  false
                    this.edificaciones_senales_no                            =  true
                    this.edificaciones_senales_na                            =  false
                }else{      
                    this.edificaciones_senales_si                            =  false
                    this.edificaciones_senales_no                            =  false
                    this.edificaciones_senales_na                            =  true
                }
                if(data.estacionamientos == 'si'){
                    this.estacionamientos_si                                 =  true
                    this.estacionamientos_no                                 =  false
                    this.estacionamientos_na                                 =  false
                }else if(data.estacionamientos == 'no'){            
                    this.estacionamientos_si                                 =  false
                    this.estacionamientos_no                                 =  true
                    this.estacionamientos_na                                 =  false
                }else{          
                    this.estacionamientos_si                                 =  false
                    this.estacionamientos_no                                 =  false
                    this.estacionamientos_na                                 =  true
                }

                if(data.simbolo_internacional_senalizacion == 'si'){
                    this.simbolo_internacional_senalizacion_si                     =  true
                    this.simbolo_internacional_senalizacion_no                     =  false
                    this.simbolo_internacional_senalizacion_na                     =  false
                }else if(data.simbolo_internacional_senalizacion == 'no'){
                    this.simbolo_internacional_senalizacion_si                     =  false
                    this.simbolo_internacional_senalizacion_no                     =  true
                    this.simbolo_internacional_senalizacion_na                     =  false
                }else{
                    this.simbolo_internacional_senalizacion_si                     =  false
                    this.simbolo_internacional_senalizacion_no                     =  false
                    this.simbolo_internacional_senalizacion_na                     =  true
                }

                if(data.acceso_planta_baja == 'si'){
                    this.acceso_planta_baja_si                     =  true
                    this.acceso_planta_baja_no                     =  false
                    this.acceso_planta_baja_na                     =  false
                }else if(data.acceso_planta_baja == 'no'){
                    this.acceso_planta_baja_si                     =  false
                    this.acceso_planta_baja_no                     =  true
                    this.acceso_planta_baja_na                     =  false
                }else{
                    this.acceso_planta_baja_si                     =  false
                    this.acceso_planta_baja_no                     =  false
                    this.acceso_planta_baja_na                     =  true
                }

                if(data.acceso_pb_vertical == 'si'){
                    this.acceso_pb_vertical_si                     =  true
                    this.acceso_pb_vertical_no                     =  false
                    this.acceso_pb_vertical_na                     =  false
                }else if(data.acceso_pb_vertical == 'no'){
                    this.acceso_pb_vertical_si                     =  false
                    this.acceso_pb_vertical_no                     =  true
                    this.acceso_pb_vertical_na                     =  false
                }else{
                    this.acceso_pb_vertical_si                     =  false
                    this.acceso_pb_vertical_no                     =  false
                    this.acceso_pb_vertical_na                     =  true
                }

                if(data.de_los_pasillos == 'si'){
                    this.de_los_pasillos_si                     =  true
                    this.de_los_pasillos_no                     =  false
                    this.de_los_pasillos_na                     =  false
                }else if(data.de_los_pasillos == 'no'){
                    this.de_los_pasillos_si                     =  false
                    this.de_los_pasillos_no                     =  true
                    this.de_los_pasillos_na                     =  false
                }else{
                    this.de_los_pasillos_si                     =  false
                    this.de_los_pasillos_no                     =  false
                    this.de_los_pasillos_na                     =  true
                }

                if(data.de_las_escaleras == 'si'){
                    this.de_las_escaleras_si                     =  true
                    this.de_las_escaleras_no                     =  false
                    this.de_las_escaleras_na                     =  false
                }else if(data.de_las_escaleras == 'no'){
                    this.de_las_escaleras_si                     =  false
                    this.de_las_escaleras_no                     =  true
                    this.de_las_escaleras_na                     =  false
                }else{
                    this.de_las_escaleras_si                     =  false
                    this.de_las_escaleras_no                     =  false
                    this.de_las_escaleras_na                     =  true
                }

                if(data.de_las_barandas == 'si'){
                    this.de_las_barandas_si                     =  true
                    this.de_las_barandas_no                     =  false
                    this.de_las_barandas_na                     =  false
                }else if(data.de_las_barandas == 'no'){
                    this.de_las_barandas_si                     =  false
                    this.de_las_barandas_no                     =  true
                    this.de_las_barandas_na                     =  false
                }else{
                    this.de_las_barandas_si                     =  false
                    this.de_las_barandas_no                     =  false
                    this.de_las_barandas_na                     =  true
                }

                if(data.de_las_puertas == 'si'){
                    this.de_las_puertas_si                     =  true
                    this.de_las_puertas_no                     =  false
                    this.de_las_puertas_na                     =  false
                }else if(data.de_las_puertas == 'no'){
                    this.de_las_puertas_si                     =  false
                    this.de_las_puertas_no                     =  true
                    this.de_las_puertas_na                     =  false
                }else{
                    this.de_las_puertas_si                     =  false
                    this.de_las_puertas_no                     =  false
                    this.de_las_puertas_na                     =  true
                }

                if(data.de_los_puntos_de_control == 'si'){
                    this.de_los_puntos_de_control_si                     =  true
                    this.de_los_puntos_de_control_no                     =  false
                    this.de_los_puntos_de_control_na                     =  false
                }else if(data.de_los_puntos_de_control == 'no'){
                    this.de_los_puntos_de_control_si                     =  false
                    this.de_los_puntos_de_control_no                     =  true
                    this.de_los_puntos_de_control_na                     =  false
                }else{
                    this.de_los_puntos_de_control_si                     =  false
                    this.de_los_puntos_de_control_no                     =  false
                    this.de_los_puntos_de_control_na                     =  true
                }

                if(data.de_los_ascensores == 'si'){
                    this.de_los_ascensores_si                     =  true
                    this.de_los_ascensores_no                     =  false
                    this.de_los_ascensores_na                     =  false
                }else if(data.de_los_ascensores == 'no'){
                    this.de_los_ascensores_si                     =  false
                    this.de_los_ascensores_no                     =  true
                    this.de_los_ascensores_na                     =  false
                }else{
                    this.de_los_ascensores_si                     =  false
                    this.de_los_ascensores_no                     =  false
                    this.de_los_ascensores_na                     =  true
                }

                if(data.de_los_servicios_sanitarios == 'si'){
                    this.de_los_servicios_sanitarios_si                     =  true
                    this.de_los_servicios_sanitarios_no                     =  false
                    this.de_los_servicios_sanitarios_na                     =  false
                }else if(data.de_los_servicios_sanitarios == 'no'){
                    this.de_los_servicios_sanitarios_si                     =  false
                    this.de_los_servicios_sanitarios_no                     =  true
                    this.de_los_servicios_sanitarios_na                     =  false
                }else{
                    this.de_los_servicios_sanitarios_si                     =  false
                    this.de_los_servicios_sanitarios_no                     =  false
                    this.de_los_servicios_sanitarios_na                     =  true
                }

                if(data.senalizacion == 'si'){
                    this.senalizacion_si                     =  true
                    this.senalizacion_no                     =  false
                    this.senalizacion_na                     =  false
                }else if(data.senalizacion == 'no'){
                    this.senalizacion_si                     =  false
                    this.senalizacion_no                     =  true
                    this.senalizacion_na                     =  false
                }else{
                    this.senalizacion_si                     =  false
                    this.senalizacion_no                     =  false
                    this.senalizacion_na                     =  true
                }

                if(data.lavamanos == 'si'){
                    this.lavamanos_si                     =  true
                    this.lavamanos_no                     =  false
                    this.lavamanos_na                     =  false
                }else if(data.lavamanos == 'no'){
                    this.lavamanos_si                     =  false
                    this.lavamanos_no                     =  true
                    this.lavamanos_na                     =  false
                }else{
                    this.lavamanos_si                     =  false
                    this.lavamanos_no                     =  false
                    this.lavamanos_na                     =  true
                }

                if(data.barra_de_sosten == 'si'){
                    this.barra_de_sosten_si                     =  true
                    this.barra_de_sosten_no                     =  false
                    this.barra_de_sosten_na                     =  false
                }else if(data.barra_de_sosten == 'no'){
                    this.barra_de_sosten_si                     =  false
                    this.barra_de_sosten_no                     =  true
                    this.barra_de_sosten_na                     =  false
                }else{
                    this.barra_de_sosten_si                     =  false
                    this.barra_de_sosten_no                     =  false
                    this.barra_de_sosten_na                     =  true
                }

                if(data.accesorios_sanitarios == 'si'){
                    this.accesorios_sanitarios_si                     =  true
                    this.accesorios_sanitarios_no                     =  false
                    this.accesorios_sanitarios_na                     =  false
                }else if(data.accesorios_sanitarios == 'no'){
                    this.accesorios_sanitarios_si                     =  false
                    this.accesorios_sanitarios_no                     =  true
                    this.accesorios_sanitarios_na                     =  false
                }else{
                    this.accesorios_sanitarios_si                     =  false
                    this.accesorios_sanitarios_no                     =  false
                    this.accesorios_sanitarios_na                     =  true
                }

                if(data.excusado_bano_publico == 'si'){
                    this.excusado_bano_publico_si                     =  true
                    this.excusado_bano_publico_no                     =  false
                    this.excusado_bano_publico_na                     =  false
                }else if(data.excusado_bano_publico == 'no'){
                    this.excusado_bano_publico_si                     =  false
                    this.excusado_bano_publico_no                     =  true
                    this.excusado_bano_publico_na                     =  false
                }else{
                    this.excusado_bano_publico_si                     =  false
                    this.excusado_bano_publico_no                     =  false
                    this.excusado_bano_publico_na                     =  true
                }

                if(data.urinarios == 'si'){
                    this.urinarios_si                     =  true
                    this.urinarios_no                     =  false
                    this.urinarios_na                     =  false
                }else if(data.urinarios == 'no'){
                    this.urinarios_si                     =  false
                    this.urinarios_no                     =  true
                    this.urinarios_na                     =  false
                }else{
                    this.urinarios_si                     =  false
                    this.urinarios_no                     =  false
                    this.urinarios_na                     =  true
                }

                if(data.duchas == 'si'){
                    this.duchas_si                     =  true
                    this.duchas_no                     =  false
                    this.duchas_na                     =  false
                }else if(data.duchas == 'no'){
                    this.duchas_si                     =  false
                    this.duchas_no                     =  true
                    this.duchas_na                     =  false
                }else{
                    this.duchas_si                     =  false
                    this.duchas_no                     =  false
                    this.duchas_na                     =  true
                }

                if(data.altura_cerradura_ventanas == 'si'){
                    this.altura_cerradura_ventanas_si                     =  true
                    this.altura_cerradura_ventanas_no                     =  false
                    this.altura_cerradura_ventanas_na                     =  false
                }else if(data.altura_cerradura_ventanas == 'no'){
                    this.altura_cerradura_ventanas_si                     =  false
                    this.altura_cerradura_ventanas_no                     =  true
                    this.altura_cerradura_ventanas_na                     =  false
                }else{
                    this.altura_cerradura_ventanas_si                     =  false
                    this.altura_cerradura_ventanas_no                     =  false
                    this.altura_cerradura_ventanas_na                     =  true
                }

                if(data.tomas_electricidad == 'si'){
                    this.tomas_electricidad_si                     =  true
                    this.tomas_electricidad_no                     =  false
                    this.tomas_electricidad_na                     =  false
                }else if(data.tomas_electricidad == 'no'){
                    this.tomas_electricidad_si                     =  false
                    this.tomas_electricidad_no                     =  true
                    this.tomas_electricidad_na                     =  false
                }else{
                    this.tomas_electricidad_si                     =  false
                    this.tomas_electricidad_no                     =  false
                    this.tomas_electricidad_na                     =  true
                }

                if(data.lugar_de_esparcimiento == 'si'){
                    this.lugar_de_esparcimiento_si                     =  true
                    this.lugar_de_esparcimiento_no                     =  false
                    this.lugar_de_esparcimiento_na                     =  false
                }else if(data.lugar_de_esparcimiento == 'no'){
                    this.lugar_de_esparcimiento_si                     =  false
                    this.lugar_de_esparcimiento_no                     =  true
                    this.lugar_de_esparcimiento_na                     =  false
                }else{
                    this.lugar_de_esparcimiento_si                     =  false
                    this.lugar_de_esparcimiento_no                     =  false
                    this.lugar_de_esparcimiento_na                     =  true
                }

                if(data.lugares_psr == 'si'){
                    this.lugares_psr_si                     =  true
                    this.lugares_psr_no                     =  false
                    this.lugares_psr_na                     =  false
                }else if(data.lugares_psr == 'no'){
                    this.lugares_psr_si                     =  false
                    this.lugares_psr_no                     =  true
                    this.lugares_psr_na                     =  false
                }else{
                    this.lugares_psr_si                     =  false
                    this.lugares_psr_no                     =  false
                    this.lugares_psr_na                     =  true
                }
            }
           
     },
     mounted(){
         this.nota_entrega_id = this.$route.params.id
         this.notification = 'Guía de Inspección N°  ' + this.$route.params.id
         this.getInspectionRequestById(this.nota_entrega_id)
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

 
  
 

