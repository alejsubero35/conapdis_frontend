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
            <section slot="pdf-content"  >
                <div class="form_contacto">
                    <TitleSection v-show="btn_atras" :sectiontitle="sectiontitle"/>
                    <div class="logo">
                        <img style="object-fit: cover;" src="img/logos_CONAPDIS/CABECERA.png"  alt="">
                    </div>
                    <div class="title_section">
                        <h2 class="mt-4">{{ title_section }}</h2>
                    </div><br>
                    <div class="text-center"><h4>1.	GUÍA DE INSPECCIÓN</h4></div>
                    <div class="inspeccion">
                        <div>a) Guía N° : ______________ </div>
                        <div>b) Fecha : __/__/____</div>
                    </div><br><br>
    
                    <v-row class="table">
                        <table>
                            <tr>
                              <th class="td-center" colspan="5">SE PRACTICA INSPECCIÓN EN VIRTUD DE LO ESTABLECIDO EN EL ARTÍCULO 81 DE LA CONSTITUCIÓN DE LA REPÚBLICA BOLÍVARIANA DE VENEZUELA; ARTÍCULO 9 DE LA CONVENCIÓN SOBRE LOS DERECHOS DE LAS PERSONAS CON DISCAPACIDAD; Y, LOS ARTÍCULOS 28, 31, 32, 33, 35, 72 Y 79 DE LA LEY PARA LAS PERSONAS CON DISCAPACIDAD.</th>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">2.DEL REGISTRO:</th>
                            </tr>
                            <tr>
                              <td  colspan="2"  class=" bold">a.	Expediente N°:</td>
                              <td  colspan="2"  class=" bold">b.	Solicitud de Inspección N°:</td>
                              <td  colspan="2"  class=" bold">c.	Unidad de Fiscalización:</td>
                            </tr>
                            <tr>
                                <td colspan="2">00001</td>
                                <td colspan="2">J-123456789-0</td>
                                <td colspan="2">J-123456789-0</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">3.	DE LOS DATOS DE LA ENTIDAD DE TRABAJO O RAZÓN SOCIAL Y DIRECCIÓN:</th>
                            </tr>
                            <tr>
                                <td colspan="3"  class=" bold"> a.	Razón Social:</td>
                                <td colspan="3"  class=" bold"> b.	Registro de Información Fiscal R.I.F.:</td>
                            </tr>
                            <tr>
                                <td colspan="3">Central</td>
                                <td colspan="3">Miranda</td>
                            </tr>
                            <tr>
                                <td colspan="5"  class=" bold">c.	Denominación Comercial:</td>
                            </tr>
                            <tr>
                                <td colspan="5">San Francisco de Yare, Edo. Miranda</td>
                            </tr>
                            <tr>
                                <td class=" bold" colspan="2">d.Región</td>
                                <td class=" bold" >e.Estado</td>
                                <td class=" bold" >f.Municipio</td>
                                <td class=" bold" >g.Parroquia</td>         
                            </tr>
                            <tr>
                                <td class=" bold" colspan="2">Central</td>
                                <td class=" bold" >Miranda</td>
                                <td class=" bold" >Paz Castillo</td>
                                <td class=" bold" >Santa Lucia</td>        
                            </tr>
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
                                <td colspan="2">Juan José</td>
                                <td>Perez Perez</td>
                                <td>20222111</td>
                                <td>Supervisor</td>
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
                                <td class="bold">6.1. Comercial:</td>
                                <td class="bold">6.2. Industrial:</td>
                                <td class="bold">6.3. Oficinas:</td>
                                <td class="bold">6.4. Educacional:</td>
                                <td class="bold">6.5. Recreativo:</td>
                            </tr>
                            <tr>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                            </tr>
                            <tr>
                                <td class="bold">6.6. Asistencial:</td>
                                <td class="bold">6.7. Alojamioento Turístico:</td>
                                <td class="bold">6.8. Sitio de Reunión:</td>
                                <td class="bold">6.9. Estacionamiento para vehículos:</td>
                                <td class="bold">6.10.Otros:</td>
                            </tr>
                            <tr>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
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
                                <td colspan="2">5</td>
                                <td>5</td>
                                <td>40</td>
                                <td>50</td>
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
                                <td>1 Persona C/Discapacidad</td>
                                <td>2 Persona C/Discapacidad</td>
                                <td>3 Persona C/Discapacidad</td>
                                <td>4 Persona C/Discapacidad</td>
                                <td>5 Persona C/Discapacidad</td>
                            </tr>
                            <tr>
                                <td class="check" >
                                    <label for="vehicle1">Si</label>&nbsp;
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">&nbsp;&nbsp;&nbsp;
                                    <label for="vehicle1">No</label>&nbsp;
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td class="check">
                                    <label for="vehicle1">Si</label>&nbsp;
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">&nbsp;&nbsp;&nbsp;
                                    <label for="vehicle1">No</label>&nbsp;
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td class="check">
                                    <label for="vehicle1">Si</label>&nbsp;
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">&nbsp;&nbsp;&nbsp;
                                    <label for="vehicle1">No</label>&nbsp;
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td class="check">
                                    <label for="vehicle1">Si</label>&nbsp;
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">&nbsp;&nbsp;&nbsp;
                                    <label for="vehicle1">No</label>&nbsp;
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td class="check">
                                    <label for="vehicle1">Si</label>&nbsp;
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">&nbsp;&nbsp;&nbsp;
                                    <label for="vehicle1">No</label>&nbsp;
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">f.	Si supera el número 119 del Total Nómina (T.N.) Especificar Número de Personas con Discapacidad Permanente Incorporadas al Plantel de Trabajo:</td>
                                <td></td>
                            </tr>
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
                                <td colspan="2"></td>
                                <td></td>
                                <td></td>
                                <td></td>
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">&nbsp;&nbsp;&nbsp;
                                </td>
                                <td  class=" bold">
                                    <label for="vehicle1">c.  ¿No?</label>&nbsp;
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">&nbsp;&nbsp;&nbsp;
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">11.2.2.	De las Rampas en Aceras: ¿Los accesos de la edificación 
                                    que no están a nivel de las aceras o en los cruces de una acera a otra, cuentan con rampas 
                                    en las esquinas conforme a la Referencias Normativas de la Norma Técnica (NTF) FONDONORMA 2733:2004 -   
                                    Diseño Norma COVENIN 3656?</td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">¿En los sitios visibles de los accesos de la edificación, cuentan con el símbolo internacional de accesibilidad? </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">11.5.1.2.	¿Internamente la edificación dispone de rampas 
                                    conjuntamente con escaleras en los desniveles en la planta baja hasta 
                                    los medios de circulación vertical?</td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">11.5.2.	<strong>De los Pasillos:</strong> ¿Los pasillos de la edificación cumplen con 
                                    las especificaciones y dimensiones tales como iluminación natural o artificial, 
                                    ancho y extremo que permita el giro de una persona en silla de rueda, entre otras 
                                    especificaciones que deben verificarse conforme a lo dispuesto en las reglamentaciones 
                                    técnicas FONDONORMA NTF 2733?</td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">11.5.2.	<strong>11.5.3.	De las Escaleras: </strong> : Las escaleras de la 
                                    edificación cumplen con las dimensiones y especificaciones conforme a lo dispuesto en 
                                    las normas y reglamentaciones técnicas FONDONORMA NTF 2733 y las Referencias Normativas 
                                    de esta - COVENIN 3657, 3658, 187 y 3298?</td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"><strong>11.5.8.1. Señalización:</strong>¿Las entradas de los servicios sanitarios 
                                    de uso público de la edificación (accesibles a una persona en silla de ruedas) 
                                    tienen colocados el símbolo internacional de accesibilidad?  </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"><strong>11.5.8.2.	Lavamanos: </strong>¿Los lavamanos cumplen con las 
                                    dimensiones y especificaciones o accesorios, de tal manera que permita su uso a personas 
                                    en sillas de ruedas, conforme a lo dispuesto en las normas y reglamentaciones técnicas 
                                    FONDONORMA NTF 2733?</td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"><strong>11.5.8.3.	Barras de Sostén: </strong>¿Los recintos privados, accesibles a 
                                    una persona en silla de ruedas, tienen colocados barreras de sostén y cumplen con las dimensiones 
                                    y especificaciones conforme a lo dispuesto en las normas y reglamentaciones técnicas FONDONORMA NTF 2733?</td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"><strong>11.5.8.4.	Accesorios Sanitarios: </strong>¿Los accesorios sanitarios tales como 
                                    dispensador de jabón, secador de manos, dispensador de toallas u otros, están ubicados a una altura 
                                    máxima de 1,00 m sobre el nivel del piso? </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"><strong>11.5.8.5.	Escusados en baño de uso público:  </strong>¿El recinto utilizable por la 
                                    persona en silla de ruedas, se ubica lo más lejos posible de la entrada principal del sanitarios y cumple 
                                    las dimensiones y demás especificaciones tales como dimensiones mínimas del recinto, ancho mínimo de la 
                                    puerta, espacio lateral para la transferencia desde la silla de rueda al WC así como el espacio de giro 
                                    de maniobra; conforme a lo dispuesto en las normas y reglamentaciones técnicas FONDONORMA NTF 2733? </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"><strong>11.5.8.6.	Urinarios:  </strong>¿Las salas de servicios sanitarios de uso público 
                                    para varones, al menos uno de los urinarios, cumplen las dimensiones y especificaciones conforme a lo 
                                    dispuesto en las normas y reglamentaciones técnicas? (NTF-2733) </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"><strong>11.5.8.7.	Duchas: </strong>Las duchas cumplen las especificaciones conforme a lo 
                                    dispuesto en las normas y reglamentaciones técnicas FONDONORMA NTF 2733? </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
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
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">11.5.10.2.	¿Los lugares para las personas en sillas de rueda están ubicados sobre zonas 
                                    horizontales de tal manera que, permita una buena visión hacia el área donde se presenta el evento, 
                                    cumpliendo así las características conforme con lo dispuesto en la norma técnica NTF-2733?</td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                                <td  class=" bold text-center">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                                </td>
                            </tr>
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
                    </v-row>
                  <!--   <v-row>
                        <div class="mt-5 d-flex justify-end ">
                            <v-btn  small @click="generateReport" color="success" v-show="btn_atras"  >{{ btnSave }}</v-btn> 
                        </div>
                    </v-row> -->
                    <v-row class="mt-5 parrafo">
                        <p class="text-center inter">Av. Casanova con Calle Villa Flor. Edificio Centro Profesional del Este. Piso Mezzanina 1. Oficina Edificio Anexo. Sector El Recreo
                            Caracas Distrito Capital. Zona Postal 1050. Números telefónicos: (0212) 762.00.39 / 762.96.45
                            www.conapdis.gob.ve  /  fiscalizacion@conapdis.gob.ve  /  @conapdis
                            
                        </p>
                    </v-row>
               
                </div>
            </section>
        </vue-html2pdf>
    </div>
 </template>
 <script>
 import VueHtml2pdf from 'vue-html2pdf'

  
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
             customer : ''
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
  /*        async getNotificationById(id){
             const res = await notasModule.getNotaById(id);console.log(res,id)
             const customer = await invoiceModule.getCustomersById(this.getCustomerId)
             this.customer  = customer.nameLegal
             this.desserts = res
         }, */
         formatofecha(fecha) {
             var date = new Date(fecha);
             let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
             return  formatted_date;
         }
     },
     mounted(){
         this.nota_entrega_id = this.$route.params.id
         this.notification = 'Notification ' + this.nota_entrega_id
        // this.getNotaById(this.nota_entrega_id)
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

 
  
 

