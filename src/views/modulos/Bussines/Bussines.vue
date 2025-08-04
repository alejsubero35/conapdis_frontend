<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <div class="formCliente">
      <TitleSection :sectiontitle="sectiontitle" />
      <form-wizard
        class="test"
        :start-index="tabIndex"
        :title="title"
        :subtitle="subtitle"
        @on-loading="setLoading"
        @on-validate="handleValidation"
        @on-complete="onComplete"
        color="#3f51b5"
        shape="tab"
        :finish-button-text="btnText"
        back-button-text="Atrás"
        next-button-text="Siguiente"
      >
        <tab-content
          title="INFORMACIÓN BÁSICA"
          icon="mdi mdi-cube-send"
          :before-change="beforeTabSwitch"
        >
          <v-form class="formCliente" ref="validateStepForm" lazy-validation>
            <input type="hidden" v-model="bussinesform.id" value:any="0" />
            <input
              type="hidden"
              v-model="bussinesform.country_id"
              value:any="237"
            />
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  :items="arrayTyperif"
                  item-text="nombre"
                  item-value="id"
                  label="Tipo de Rif"
                  placeholder="Tipo de Rif"
                  v-model="bussinesform.type_rif"
                  dense
                  :rules="rules"
                  required
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                  @change="getRifType($event)"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Rif"
                  placeholder="#-########-#"
                  dense
                  :rules="rules"
                  v-model="bussinesform.rif"
                  v-mask="'N-########-#'"
                  @keyup="validateRif(bussinesform.rif)"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
                <span
                  v-show="validateRifDB"
                  style="margin-top: -19px; color: red"
                  >El Rif Existe</span
                >
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Razón social"
                  placeholder="Razón social"
                  dense
                  :rules="rules"
                  v-model="bussinesform.company_name"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h5
                  style="
                    font-size: 14px;
                    color: rgb(255, 64, 129);
                    font-weight: bold;
                  "
                >
                  Registro Mercantil / Gaceta Oficial
                </h5>
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-show="showoficial" cols="12" sm="6" md="3">
                <v-text-field
                  label="Tomo"
                  placeholder="Tomo"
                  dense
                  v-model="bussinesform.tomo"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col v-show="showoficial" cols="12" sm="6" md="3">
                <v-text-field
                  label="Folio"
                  placeholder="Folio"
                  dense
                  v-model="bussinesform.folio"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col v-show="showogaceta" cols="12" sm="6" md="6">
                <v-text-field
                  label="Gaceta Oficial"
                  placeholder="Gaceta Oficial"
                  dense
                  v-model="bussinesform.official_gazette"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Número"
                  placeholder="Número"
                  dense
                  v-model="bussinesform.number"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Año"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="menu2 = false"
                    @change="updateFecha()"
                    :disabled="
                      validateInput == 1
                        ? (disabled = true)
                        : (disabled = false)
                    "
                    locale="es"
                    no-title
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="3" v-show="showente">
                <v-text-field
                  label="Ente de Adscripción:"
                  placeholder="Ente de Adscripción:"
                  dense
                  v-model="bussinesform.attached_body"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Página Web"
                  placeholder="Página Web"
                  dense
                  v-model="bussinesform.web"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  :items="arrayEconomicSector"
                  item-text="name"
                  item-value="id"
                  label="Sector Económico"
                  placeholder="Sector Económico"
                  v-model="bussinesform.economic_sectors_id"
                  dense
                  :rules="rules"
                  required
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-select>
              </v-col>

              <!-- <v-col cols="12" sm="6" md="3">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-select
                        :items="arrayEconomicSector"
                        item-text="name"
                        item-value="id"
                        label="Sector Económico"
                        placeholder="Sector Económico"
                        v-model="bussinesform.economic_sectors_id"
                        v-bind="attrs"
                        v-on="on"
                        dense
                        :rules="rules"
                        required
                      ></v-select>
                    </template>
                    <span>Tooltip</span>
                  </v-tooltip>
                </v-col> -->

              <v-col cols="12" sm="6" md="3">
                <v-select
                  :items="arrayTypeCompany"
                  item-text="name"
                  item-value="id"
                  label="Tipo de Empresa"
                  placeholder="Tipo de Empresa"
                  v-model="bussinesform.company_types_id"
                  dense
                  :rules="rules"
                  required
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Número Patronal  IVSS"
                  placeholder="Número Patronal  IVSS"
                  dense
                  v-model="bussinesform.employer_number_ivss"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-textarea
                  label="Objeto de la Empresa"
                  placeholder="Objeto de la Empresa"
                  dense
                  :rules="rules"
                  v-model="bussinesform.comercial_designation"
                  rows="1"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-select
                  :items="arrayEconomicActivies"
                  item-text="nombre"
                  item-value="id"
                  label="Actividad Económica"
                  placeholder="Actividad Económica"
                  v-model="bussinesform.economic_activity_id"
                  dense
                  :rules="rules"
                  required
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </tab-content>
        <tab-content
          title="RESPOSANBLE DEL REGISTRO"
          icon="mdi mdi-account"
          :before-change="beforeTabSwitchTwo"
        >
          <v-form class="formCliente" ref="validateStepFormTwo" lazy-validation>
            <input type="hidden" v-model="bussinesform.id" value:any="0" />
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Nombre"
                  placeholder="Nombres Responsable de la Aplicación"
                  dense
                  :rules="rules"
                  v-model="bussinesform.first_name"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Apellido"
                  placeholder="Apellidos Responsable de la Aplicación"
                  dense
                  :rules="rules"
                  v-model="bussinesform.last_name"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Email"
                  placeholder="Email"
                  type="email"
                  dense
                  v-model="bussinesform.email_r"
                  @blur="validatEmail()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Username"
                  placeholder="username"
                  dense
                  v-model="bussinesform.username"
                  readonly
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="6">
                <v-text-field   
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"   
                :type="show ? 'text' : 'password'"  
                label="Password" 
                placeholder="Password"  
                dense 
                :rules="rules" 
                v-model="bussinesform.password"  @click:append="show = !show">
                 </v-text-field>
               </v-col> -->
            </v-row>
          </v-form>
        </tab-content>
        <tab-content
          title="DIRECCIÓN Y TELÉFONOS"
          icon="mdi mdi-cellphone-marker"
          :before-change="beforeTabSwitchThree"
        >
          <v-form
            class="formCliente"
            ref="validateStepFormThree"
            lazy-validation
          >
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="arrayStates"
                  item-text="name"
                  item-value="id"
                  label="Estado"
                  placeholder="Estado"
                  v-model="bussinesform.state_id"
                  dense
                  :rules="rules"
                  required
                  @change="getMunicipalityByState($event)"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="arrayMunicipality"
                  item-text="name"
                  item-value="id"
                  label="Municipio"
                  placeholder="Municipio"
                  v-model="bussinesform.municipality_id"
                  dense
                  :rules="rules"
                  required
                  @change="getParishesByMunicipality($event)"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="arrayParishes"
                  item-text="name"
                  item-value="id"
                  label="Parroquia"
                  placeholder="Parroquia"
                  v-model="bussinesform.parishe_id"
                  dense
                  :rules="rules"
                  required
                  @change="getSectoresByParishes($event)"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="arraySectores"
                  item-text="name"
                  item-value="id"
                  label="Sector"
                  placeholder="Sector"
                  v-model="bussinesform.sector_id"
                  dense
                  :rules="rules"
                  required
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Teléfono"
                  placeholder="####-#######'"
                  dense
                  :rules="rules"
                  v-model="bussinesform.phone"
                  v-mask="'####-#######'"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Teléfono 2"
                  placeholder="####-#######'"
                  dense
                  v-model="bussinesform.telefono2"
                  v-mask="'####-#######'"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Teléfono 3"
                  placeholder="####-#######'"
                  dense
                  v-model="bussinesform.telefono3"
                  v-mask="'####-#######'"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <v-textarea
                  label="Dirección"
                  placeholder="Dirección"
                  dense
                  :rules="rules"
                  v-model="bussinesform.location"
                  rows="1"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </tab-content>
        <tab-content
          title="REPRESENTANTE LEGAL"
          icon="mdi mdi-account-box-outline"
          :before-change="beforeTabSwitchFour"
        >
          <v-form
            class="formCliente"
            ref="validateStepFormFour"
            lazy-validation
          >
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  :items="arrayTypeDocument"
                  item-text="nombre"
                  item-value="id"
                  label="Tipo Documento"
                  placeholder="Tipo Documento"
                  v-model="bussinesform.type_identity_card"
                  dense
                  :rules="rules"
                  required
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Cédula / Pasaporte"
                  placeholder="###########"
                  dense
                  :rules="rules"
                  v-model="bussinesform.identity_card_rl"
                  v-mask="'###########'"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Nombres"
                  placeholder="nombres"
                  dense
                  :rules="rules"
                  v-model="bussinesform.first_name_rl"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Apellidos"
                  placeholder="Apellidos"
                  dense
                  :rules="rules"
                  v-model="bussinesform.last_name_rl"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Teléfono"
                  placeholder="####-#######'"
                  dense
                  :rules="rules"
                  v-model="bussinesform.telefono1_representante_legal"
                  v-mask="'####-#######'"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Teléfono 2"
                  placeholder="####-#######'"
                  dense
                  v-model="bussinesform.telefono2_representante_legal"
                  v-mask="'####-#######'"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Teléfono 3"
                  placeholder="####-#######'"
                  dense
                  v-model="bussinesform.telefono3_representante_legal"
                  v-mask="'####-#######'"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Email"
                  placeholder="Email"
                  dense
                  :rules="emailRules"
                  type="email"
                  v-model="bussinesform.email_rl"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="arrayPosition"
                  item-text="name"
                  item-value="id"
                  label="Cargo"
                  placeholder="Cargo"
                  v-model="bussinesform.cargo_representante_legal"
                  dense
                  :rules="rules"
                  required
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </tab-content>
        <tab-content
          title="DOCUMENTOS REQUERIDOS"
          icon="mdi mdi-stairs-up"
          :before-change="beforeTabSwitchFive"
        >
          <v-form
            class="formCliente"
            ref="validateStepFormFive"
            lazy-validation
          >
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <!-- Tabla de documentos cargados -->
                <v-card class="mb-5" outlined v-if="existStorage">
                  <v-card-title class="headline">Documentos Cargados</v-card-title>
                  <v-data-table
                    :headers="[
                      { text: 'Nombre', value: 'title' },
                      { text: 'Fecha de carga', value: 'registration_date' },
                      { text: 'Documento', value: 'file_url', sortable: false }
                    ]"
                    :items="documentsload"
                    class="elevation-1"
                    :loading="overlay"
                    loading-text="Cargando documentos..."
                    dense
                  >
                    <template v-slot:item.file_url="{ item }">
                      <v-btn v-if="item.file_url" :href="item.file_url" target="_blank" icon color="primary">
                        <v-icon>mdi-file-eye</v-icon>
                      </v-btn>
                      <span v-else class="grey--text">No disponible</span>
                    </template>
                  </v-data-table>
                </v-card>
                <!-- Inputs para cargar documentos requeridos -->
                <v-card outlined>
                  <v-card-title class="subtitle-1">Subir Documentos Requeridos</v-card-title>
                  <v-row>
                    <v-col v-for="(doc, idx) in documents" :key="doc.id" cols="12" sm="6" md="4">
                      <v-file-input
                        v-if="!doc.url"
                        v-model="documentsloadTemp[idx]"
                        :label="'Subir ' + doc.title + ' ' + validation"
                        accept=".pdf,.jpg,.jpeg,.png"
                        :rules="documentsload.length > 0 ? [] : [(v) => !!v || 'Campo requerido']"
                        @change="(e) => updateDocument(doc, e,idx)"
                        outlined
                        dense
                        show-size
                        :disabled="overlay"
                      ></v-file-input>
                      <v-chip v-else color="success" small>Ya cargado</v-chip>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </tab-content>
        <tab-content
          title="OTROS"
          icon="mdi mdi-all-inclusive"
          :before-change="beforeTabSwitchSix"
        >
          <v-form class="formCliente" ref="validateStepFormsix" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <span
                  ><strong
                    ><h5>
                      Nacimientos de niñas y niños con discapacidad.
                    </h5></strong
                  ></span
                >
                <v-switch v-model="bussinesform.hospital_center"
                  :label="'¿Es usted un Centro Hospitalario?  '"
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  @change="setItem('hospital_center')"
                ></v-switch>
                <span
                  ><strong
                    ><h5>
                      Talleres de reparación de herramientas y Dispositivos
                      Técnicos.
                    </h5></strong
                  ></span
                >
                <v-switch v-model="bussinesform.maintenance_and_repair"
                  :label="'¿Se dedica al mantenimiento y reparación de dispositivos Técnicos?'"
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  @change="setItem('maintenance_and_repair')"
                
                ></v-switch>
                <span
                  ><strong
                    ><h5>
                      Fabricantes, distribuidores y proveedores de órtesis y
                      prótesis o productos similares.
                    </h5></strong
                  ></span
                >
                <v-switch
                  v-model="bussinesform.ortesis_protesis"
                  :label="
                    '¿Es Fabricante de órtesis y prótesis?  '
                  "
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  :value="ortesis_protesis"
                  @change="setItem('ortesis_protesis')"
                ></v-switch>
                <v-switch
                  v-model="bussinesform.ortesis_laboratories"
                  :label="
                    '¿Laboratorios de órtesis?  '
                  "
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  :value="ortesis_laboratories"
                  @change="setItem('ortesis_laboratories')"
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <span
                  ><strong
                    ><h5>
                      Usuarias y usuarios e intérpretes de la Lengua de Señas
                      Venezolana.
                    </h5></strong
                  ></span
                >
                <v-switch
                  v-model="bussinesform.has_workers_interpretes"
                  :label="
                    '¿Posee usted trabajadores Interpretes, Facilitadores y/o Ambas?  '
                  "
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  :value="has_workers_interpretes"
                  @change="setItem('has_workers_interpretes')"
                ></v-switch>
                <v-switch
                  v-show="hidecertificate"
                  v-model="bussinesform.have_certificate"
                  :label="
                    '¿Tiene certificado de intérprete/facilitador? Nota:este campo depende de la respuesta anterior  '
                  "
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  :value="have_certificate"
                  @change="setItem('have_certificate')"
                ></v-switch>

                <!-- <span
                  ><strong><h5>Educación discapacidad.</h5></strong></span
                >
                <v-switch
                  v-model="bussinesform.is_educational_center"
                  :label="
                    '¿Es usted un Centro Educativo?   '
                  "
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  :value="is_educational_center"
                  @change="setItem('is_educational_center')"
                ></v-switch> -->
                <span
                  ><strong><h5>Vivienda Discapacidad.</h5></strong></span
                >
                <v-switch
                  v-model="bussinesform.has_delivered_homes"
                  :label="
                    '¿Usted ha entregado viviendas a personas con discapacidad?  '
                  "
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  :value="has_delivered_homes"
                  @change="setItem('has_delivered_homes')"
                ></v-switch>
                <!-- <v-textarea
                  label="Observaciones"
                  dense
                  v-model="bussinesform.observations"
                  rows="2"
                ></v-textarea> -->
              </v-col>
            </v-row>
          </v-form>
        </tab-content>
      </form-wizard>
    </div>
    <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color" />
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          Empresa Registrada con Éxito
        </v-card-title>

        <v-card-text>
          Será redirigido al Login, su Credencial fue enviada al Correo
          suministrado.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text @click="goHome()"> Aceptar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogOpen" max-width="350">
      <v-card>
        <v-card-title class="text-h5"> Notificación </v-card-title>
        <v-card-text>
          {{ dataModalAlert }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogOpen = false">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import bussinesModule from "@/store/modules/bussinesModule";
import sessionModule from "@/store/modules/sessionModule";
import { ValidationObserver } from "vee-validate";
import storageData from "@/store/services/storageService";
import documentModule from "@/store/modules/documentRequiredModule";

@Component({
  components: {},
})
export default class Bussines extends Vue {
  [x: string]: unknown;
  zonas?: any = [];
  tipoclientes?: any = [];
  vendedor?: any = [];
  segmentos?: any = [];
  condicionespago?: any = [];
  overlay = false;
  title: string = "";
  subtitle: string = "";
  validateStepForm: any = { inactivo: "1" };
  bussinesform: any = {
    code: 0,
    message: "",
    country_id: 237,
    username: "",
    documents: [],
  };
  documentsloadTemp: any = [];
  hidecertificate = false; // esta variable oculta un campo mientras la condicion sea no.
  loadingWizard = false;
  typerif = [
    { value: "1", text: "Personal" },
    { value: "2", text: "Jurídico" },
    { value: "3", text: "Gobierno" },
    { value: "4", text: "Consejo Comunal" },
  ];

  inactivo = [
    { value: "0", text: "Inactivo" },
    { value: "1", text: "Activo" },
  ];
  agente_retencion = "";
  snackbar = false;
  textmsj = "";
  color = "";
  timeout = 2000;
  sectiontitle = "Registrar Datos de Empresa";
  dialog = false;
  tabIndex = 0;
  has_delivered_homes: boolean = false;
  is_educational_center: boolean = false;
  have_certificate: boolean = false;
  has_workers_interpretes: boolean = false;
  ortesis_protesis: boolean = false;
  ortesis_laboratories: boolean = false;
  maintenance_and_repair: boolean = false;
  human_help: boolean = false;
  hospital_center: boolean = false;
  hospital_centerShow = "No";
  human_helpShow = "No";
  maintenance_and_repairShow = "No";
  ortesis_protesisShow = "No";
  ortesis_laboratoriesShow = "No";
  has_workers_interpretesShow = "No";
  have_certificateShow = "No";
  is_educational_centerShow = "No";
  has_delivered_homesShow = "No";
  arrayStates = [];
  arrayMunicipality = [];
  arrayParishes = [];
  arraySectores = [];
  arrayEconomicSector = [];
  arrayEconomicActivies = [];
  arrayTypeCompany = [];
  arrayTyperif = [];
  arrayTypeDocument = [];
  arrayUserType = [];
  arrayPosition = [];
  is_sucursal = false;
  sucursal = false;
  tipodocumentos = [
    { value: "cedula", text: "Cédula" },
    { value: "pasaporte", text: "Pasaporte" },
  ];
  tipoidentity = [
    { value: "v", text: "Venezolano" },
    { value: "e", text: "Extrajero" },
  ];
  numero_sucursal = "";
  nombre_sucursal = "";
  showSucursal = false;
  date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);
  menu2: boolean = false;
  validateRifDB = false;
  max25chars = (v) => v.length <= 25 || "Input too long!";
  btnText = "Guardar";
  validateInput = 0;
  dialogOpen = false;
  validatetyperif = "";
  titlemodalalert = "";
  showente = false;
  showoficial = true;
  showogaceta = false;

  /* DOCUMENTOS REQUERIDOS */
  validation = "(Solo png,jpg,jpeg,pdf)";
  existStorage = (storageData.get('_bussines')) ? true : false;
  show: Boolean = false;
  bussines_id = "";
  documentsForm = {};
  documents = [];
  documentsload = [];

  visiblecustomers = false;
  imageUrl: any = "";
  imageName: any = "";
  fileUpload = "";
  disabled = true;
  disabledFile = true;
  disabledBtn = false;
  placeholder = "Cargar Documento";
  dataModalAlert = "";
  tempDoc = {};
  arrayExtension = ["pdf", "jpg", "png", "jpeg", "PNG"];
  dateP = new Date().toISOString().substr(0, 10);
  max = new Date(Date.now() - 315569260000).toISOString().substr(0, 10);
  arrayDates = [];
  todayDate = this.getTodayDate();

  getTodayDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  disablePastDates(val) {
    return val >= new Date().toISOString().substr(0, 10);
  }
  /* FIN DATA  */
  $refs!: {
    validateStepForm: InstanceType<typeof ValidationObserver>;
    validateStepFormTwo: InstanceType<typeof ValidationObserver>;
    validateStepFormThree: InstanceType<typeof ValidationObserver>;
    validateStepFormFour: InstanceType<typeof ValidationObserver>;
    validateStepFormFive: InstanceType<typeof ValidationObserver>;
    validateStepFormsix: InstanceType<typeof ValidationObserver>;
  };
  get getBussines() {
    return bussinesModule.getBussines;
  }
  get FormRequest(): any {
    return this.bussinesform;
  }
  get FormRequestDocuments(): any {
    return this.documents;
  }
  get activo() {
    return (this.validateStepForm.inactivo = "1");
  }
  setLoading(value) {
    this.loadingWizard = value;
  }
  handleValidation(isValid, tabIndex) {}
  async updateFecha() {
    this.bussinesform.registration_date = this.date;
  }
  /* METODOS DOCUMENTS */
  async getDocuments() {
    this.overlay = true;
    const dataDocuments: any = await documentModule.getDocumentsAll(storageData.get("_bussines").id);
 
    const loaddocuments: any = await documentModule.getDocumentsByBussines(
     storageData.get("_bussines").id
    );
    this.documentsload = loaddocuments.data.documents;
    this.documentsload = this.documentsload.filter(
      (doc: any) => doc.visibility_in === 1
    );

    this.documents = dataDocuments.data.documents;
  
    this.documents = this.documents.filter(
      (doc: any) => doc.visibility_in === 1
    );
    this.validateBtn();
    this.overlay = false;
  }
 
  async getDocumentsAll() {
    this.overlay = true;
    const dataDocuments: any = await documentModule.getAllDocuments();

    this.documents = dataDocuments.data.data;
    this.documents = this.documents.filter(
      (doc: any) => doc.visibility_in === 1
    );
    this.validateBtn();
    this.overlay = false;
  }
  async validateBtn() {
    const events = [];
    for (var i = 0; i < this.FormRequestDocuments.length; i++) {
      if (this.FormRequestDocuments[i].url == "") {
        events.push(this.FormRequestDocuments[i]);
      }
    }
    if (events.length > 0) {
      this.disabledBtn = false;
    } else {
      this.disabledBtn = true;
    }
  }
  async updateDocument(doc, fileEvent,i) {
    let index = this.documents.findIndex(({ id }) => id == doc.id);
    const files = fileEvent && fileEvent.target ? fileEvent.target.files : fileEvent;
           this.documents[index].bussines_id = (storageData.get("_bussines"))
        ? storageData.get("_bussines").id
        : '';
       
        this.documents[index].registration_date = this.todayDate;
    if (files) {
      const file = files;
      const allowedExtensions = ["pdf", "jpg", "jpeg", "png"];
      const allowedMimeTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png"
      ];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      // Validar extensión y tipo MIME
      if (!allowedExtensions.includes(fileExtension) || !allowedMimeTypes.includes(file.type)) {
        this.dialogOpen = true;
        this.dataModalAlert = "Extensión o tipo de archivo NO permitido. Solo se permiten: pdf, jpg, jpeg, png";
        this.documentsloadTemp[i] = null;
        this.backClear(doc);
        return false;
      }

      if (file.size < this.documents[index].max_size) {
        let base64 = await this.getBase64(file, doc);
      } else {
        this.dialogOpen = true;
        this.dataModalAlert = "El Documento excede el tamaño permitido";
        this.backClear(doc);
      }
    }
  }
  async updateFechadocuments(id_) {
    let index = this.documents.findIndex(({ id }) => id == id_);
    this.documents[index].registration_date = this.date;
    if (storageData.get("_bussines")) {
      this.documents[index].bussines_id = storageData.get("_bussines")
        ? storageData.get("_bussines").id
        : this.getBussines.id;
    } else {
      await sessionModule.redirectLogin();
    }
  }

  async getImgBase(imgbase64, doc, fileName) {
    let index = this.documents.findIndex(({ id }) => id == doc.id);
    this.documents[index].file = imgbase64;
    this.documents[index].name = fileName;
  }
  getBase64(file, doc) {
    const _this = this;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      _this.getImgBase(reader.result, doc, file);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    return true;
  }
  backClear(doc) {
    setTimeout(() => {
      doc.name = null;
      doc.file = null;
      // Si el input depende de doc.name, esto lo limpia
      this.$forceUpdate();
    }, 150);
  }
  /* FIN METODOS */
  async getRifType(event) {
    if (this.bussinesform.rif != undefined) {
      this.bussinesform.rif = "";
      switch (event) {
        case 4:
          this.validatetyperif = "V";
          this.showente = false;
          this.showoficial = true;
          this.showogaceta = false;
          break;
        case 5:
          this.validatetyperif = "J";
          this.showente = true;
          this.showoficial = true;
          this.showogaceta = false;
          break;
        case 6:
          this.validatetyperif = "G";
          this.showente = true;
          this.showoficial = false;
          this.showogaceta = true;
          break;
        case 7:
          this.validatetyperif = "J";
          this.showente = true;
          this.showoficial = true;
          this.showogaceta = false;
      }
    } else {
      switch (event) {
        case 4:
          this.validatetyperif = "V";
          this.showente = false;
          this.showoficial = true;
          this.showogaceta = false;
          break;
        case 5:
          this.validatetyperif = "J";
          this.showente = true;
          this.showoficial = true;
          this.showogaceta = false;
          break;
        case 6:
          this.validatetyperif = "G";
          this.showente = true;
          this.showoficial = false;
          this.showogaceta = true;
          break;
        case 7:
          this.validatetyperif = "J";
          this.showente = true;
          this.showoficial = true;
          this.showogaceta = false;
      }
    }
  }
  async validateRif(value) {
    if (value.length == 12) {
      this.validateKeyInit(value);
      const data: any = await bussinesModule.existRif(value);
      if (data.data.length > 0) {
        this.validateRifDB = true;
        this.bussinesform.rif = "";
      } else {
        this.validateRifDB = false;
      }
    }
  }
  async validateKeyInit(value) {
    let val = value.charAt(0);

    if (val != this.validatetyperif) {
      this.dialogOpen = true;
      this.titlemodalalert =
        "Debe ingresar la letra que coincida con la opción seleccionada en el Tipo de Rif, debe ser en mayúscula";
      this.bussinesform.rif = "";
    }
  }
  beforeTabSwitch() {
    const valid: any = this.$refs.validateStepForm.validate();
    this.bussinesform.username = this.bussinesform.rif.replaceAll("-", "");

    Math.ceil(this.bussinesform.tomo);
    Math.ceil(this.bussinesform.folio);
    Math.ceil(this.bussinesform.number);

    if (valid) {
      return true;
    } else {
      return false;
    }
  }
  beforeTabSwitchTwo() {
    const valid: any = this.$refs.validateStepFormTwo.validate();
    if (valid) {
      return true;
    } else {
      return false;
    }
  }
  beforeTabSwitchThree() {
    const valid: any = this.$refs.validateStepFormThree.validate();
    if (valid) {
      return true;
    } else {
      return false;
    }
  }
  beforeTabSwitchFour() {
    const valid: any = this.$refs.validateStepFormFour.validate();
    if (valid) {
      return true;
    } else {
      return false;
    }
  }
  beforeTabSwitchFive() {
    const valid: any = this.$refs.validateStepFormFive.validate();
    if (valid) {
      return true;
    } else {
      return false;
    }
  }
  beforeTabSwitchSix() {
    const valid: any = this.$refs.validateStepFormsix.validate();
    if (valid) {
      return true;
    } else {
      return false;
    }
  }

  async validatEmail() {
    if (this.bussinesform.email_r != undefined) {
      const validate: any = await bussinesModule.validateEmailRL(
        this.bussinesform.email_r
      );
      if (validate.data.length > 0) {
        this.dialogOpen = true;
        this.bussinesform.email_r = "";
        this.titlemodalalert = "Este Correo ya existe";
      } else {
      }
    }
  }
  async onComplete() {
    await this.addDocuemnts();
    if (this.FormRequest.id > 0) {
      this.updateBussines();
    } else {
      await this.saveBussines();
    }
  }
  async addDocuemnts() {
    delete this.FormRequestDocuments.name;
    const events = [];
    for (var i = 0; i < this.FormRequestDocuments.length; i++) {
      if (this.FormRequestDocuments[i].url == "") {
        events.push(this.FormRequestDocuments[i]);
      }
    }
    this.bussinesform.documents = events;

    /*         if(events.length > 0){
            if (valid) {
                this.saveDocuments(events)
            }
        } */
  }
  async saveBussines() {
    console.log(this.FormRequest);
    this.updateSwitch();
    this.overlay = true;
    const data = await bussinesModule.save(this.FormRequest);

    if (data.code == 201) {
      this.textmsj = "Empresa Creada con Éxito.";
      this.color = "success";
      this.snackbar = true;
      this.back();
      await sessionModule.updateStatusBussines("registered");
      this.overlay = false;
      this.dialog = true;
    } else {
      this.textmsj = "Error al Registrar los datos de la Empresa.";
      this.color = "error";
      this.snackbar = true;
      this.backError();
      this.overlay = false;
    }
  }
  async updateBussines() {
    this.overlay = true;
    const data = await bussinesModule.update(this.FormRequest);

    if (data.code == 201) {
      this.textmsj = "Empresa Actualizada con Éxito.";
      this.color = "success";
      this.snackbar = true;
      this.back();
      this.overlay = false;
    } else {
      this.textmsj = "Error al Actualizar los datos de la Empresa.";
      this.color = "error";
      this.snackbar = true;
      this.backError();
      this.overlay = false;
    }
    //this.reset();
  }
  async setItem(event) {
    switch (event) {
      case "hospital_center":
        if (this.bussinesform.hospital_center) this.hospital_centerShow = "Si";
        else this.hospital_centerShow = "No";
        break;
      case "human_help":
        if (this.bussinesform.human_help) this.human_helpShow = "Si";
        else this.human_helpShow = "No";
        break;
      case "maintenance_and_repair":
        if (this.bussinesform.maintenance_and_repair)
          this.maintenance_and_repairShow = "Si";
        else this.maintenance_and_repairShow = "No";
        break;
      case "ortesis_protesis":
        if (this.bussinesform.ortesis_protesis)
          this.ortesis_protesisShow = "Si";
        else this.ortesis_protesisShow = "No";
        break;
      case "ortesis_laboratories":
        if (this.bussinesform.ortesis_laboratories)
          this.ortesis_laboratoriesShow = "Si";
        else this.ortesis_laboratoriesShow = "No";
        break;
      case "has_workers_interpretes":
        if (this.bussinesform.has_workers_interpretes) {
          this.has_workers_interpretesShow = "Si";
          this.hidecertificate = true;
        } else {
          this.has_workers_interpretesShow = "No";
          this.hidecertificate = false;
        }
        break;
      case "have_certificate":
        if (this.bussinesform.have_certificate)
          this.have_certificateShow = "Si";
        else this.have_certificateShow = "No";
        break;
      case "is_educational_center":
        if (this.bussinesform.is_educational_center)
          this.is_educational_centerShow = "Si";
        else this.is_educational_centerShow = "No";
        break;
      case "has_delivered_homes":
        if (this.bussinesform.has_delivered_homes)
          this.has_delivered_homesShow = "Si";
        else this.has_delivered_homesShow = "No";
        break;
    }
  }
  async updateSwitch() {
    if (this.bussinesform.hospital_center)
      this.bussinesform.hospital_center = "Si";
    else this.bussinesform.hospital_center = "No";

    if (this.bussinesform.human_help) this.bussinesform.human_help = "Si";
    else this.bussinesform.human_help = "No";

    if (this.bussinesform.maintenance_and_repair)
      this.bussinesform.maintenance_and_repair = "Si";
    else this.bussinesform.maintenance_and_repair = "No";

    if (this.bussinesform.ortesis_protesis)
      this.bussinesform.ortesis_protesis = "Si";
    else this.bussinesform.ortesis_protesis = "No";

    if (this.bussinesform.has_workers_interpretes)
      this.bussinesform.has_workers_interpretes = "Si";
    else this.bussinesform.has_workers_interpretes = "No";

    if (this.bussinesform.have_certificate)
      this.bussinesform.have_certificate = "Si";
    else this.bussinesform.have_certificate = "No";

    if (this.bussinesform.is_educational_center)
      this.bussinesform.is_educational_center = "Si";
    else this.bussinesform.is_educational_center = "No";

    if (this.bussinesform.has_delivered_homes)
      this.bussinesform.has_delivered_homes = "Si";
    else this.bussinesform.has_delivered_homes = "No";
  }

  async goDocuments() {
    this.$router.push({ name: "requeriments" });
  }
  async goHome() {
    this.dialog = false;
    this.$router.push({ name: "Dashboard" });
  }
  async getStates() {
    const states: any = await bussinesModule.getStatesAll();
    this.arrayStates = states.data.data;
  }
  /* async getUserType(){
    const typeuser : any = await bussinesModule.getUserTypeAll()
    this.arrayUserType = typeuser.data.data
    this.initData()
  } */
  async getEconomicSector() {
    const economicsector: any = await bussinesModule.getEconomicSectorAll();
    this.arrayEconomicSector = economicsector.data.data;
  }
  async getEconomicActivies() {
    const economicactivies: any = await bussinesModule.getEconomicActiviesAll();
    this.ordenarArray(economicactivies.data);
  }
  async getTypeCompany() {
    const typecompany: any = await bussinesModule.getTypeCompanyAll();
    this.arrayTypeCompany = typecompany.data.data;
  }
  async getTyperif() {
    const typerif: any = await bussinesModule.getTyperifAll();
    this.arrayTyperif = typerif.data;
  }
  async getTypeDocument() {
    const typeDocument: any = await bussinesModule.getTypeDocumentAll();
    this.arrayTypeDocument = typeDocument.data;
  }
  async getMunicipalityByState(event) {
    const municipality: any = await bussinesModule.getMunicipality(event);
    this.arrayMunicipality = municipality.data.data;
  }
  async getParishesByMunicipality(event) {
    const parishes: any = await bussinesModule.getParishes(event);
    this.arrayParishes = parishes.data.data;
    this.overlay = false;
  }
  async getSectoresByParishes(event) {
    const sectors: any = await bussinesModule.getSectores(event);
    this.arraySectores = sectors.data;
  }
  async ordenarArray(array) {
    const newArray = array.sort((a, b) => a.nombre.localeCompare(b.nombre));
    this.arrayEconomicActivies = newArray;
  }
  async getPositionAll() {
    const position: any = await bussinesModule.getPositionAll();
    this.arrayPosition = position.data;
    //this.ordenarArray2(position.data.data)
  }
  async ordenarArray2(array) {
    const newArray = array.sort((a, b) => a.name.localeCompare(b.name));
    this.arrayPosition = newArray;
  }
  reset() {
    this.$refs.validateStepForm.reset();
  }
  back() {
    setTimeout(() => {
      this.tabIndex = 0;
      this.snackbar = false;
    }, 2000);
  }
  backError() {
    setTimeout(() => {
      this.snackbar = false;
    }, 3500);
  }

  data() {
    return {
      show: false,
      rules: [(v: any) => !!v || "Campo requerido"],
      emailRules: [
        (v) => !!v || "E-mail is requerido",
        (v) => /.+@.+/.test(v) || "El email debe ser válido",
      ],
      numberRule: [
        (v) => !!v || "campo requerido",
        (v) => v > 0 || "El valor debe ser mayor a cero",
        (v) => v <= 100 || "El valor debe ser menor a 100",
      ],
      rulesNum: [
        (v: any) => !!v || "Campo requerido",
        (v) => v >= 0 || "No Acepta numeros negativos",
      ],
    };
  }
  initData() {
    this.bussinesform = {
      type_rif: "6",
      rif: "G-14610701-2",
      company_name: "prueba",
      tomo: 10,
      folio: 20,
      number: 30,
      duration: 10,
      attached_body: "adscrito a algo",
      web: "www.prueba.com",
      email: "prueba@gmail.com",
      economic_sectors_id: "3",
      company_types_id: "3",
      employer_number_ivss: 100,
      economic_activity_id: "3",
      user_type_id: "1",
      comercial_designation: "decripcion prueba",
      first_name: "Eulemis",
      last_name: "Hernández",
      email_r: "eulemisalfredo@gmail.com",
      phone: "04120169750",
      location: "yare",
      type_identity_card: "1",
      identity_card_rl: "16092842",
      first_name_rl: "alejandro",
      last_name_rl: "subero",
      email_rl: "juan@gmail.com",
      observations: "observacion de prueba",
      password: "12345678",
      state_id: "1",
    };
  }
  async updataSwitchBussines(data) {

    // Campos del tab "OTROS"
    this.bussinesform.hospital_center = data.hospital_center == "No" ? false : true;
    this.hospital_centerShow = data.hospital_center == "No" ? "No" : "Si";
    this.bussinesform.human_help = data.human_help == "No" ? false : true;
    this.human_helpShow = data.human_help == "No" ? "No" : "Si";
    this.bussinesform.maintenance_and_repair = data.maintenance_and_repair == "No" ? false : true;
    this.maintenance_and_repairShow = data.maintenance_and_repair == "No" ? "No" : "Si";
    this.bussinesform.ortesis_protesis = data.ortesis_protesis == "No" ? false : true;
    this.ortesis_protesisShow = data.ortesis_protesis == "No" ? "No" : "Si";
    this.bussinesform.ortesis_laboratories = data.ortesis_laboratories == "No" ? false : true;
    // No hay show para ortesis_laboratories, se puede agregar si lo necesitas
    this.ortesis_laboratoriesShow = data.ortesis_laboratories == "No" ? "No" : "Si";
    this.bussinesform.has_workers_interpretes = data.has_workers_interpretes == "No" ? false : true;
    this.has_workers_interpretesShow = data.has_workers_interpretes == "No" ? "No" : "Si";
    this.bussinesform.have_certificate = data.have_certificate == "No" ? false : true;
    this.have_certificateShow = data.have_certificate == "No" ? "No" : "Si";
    this.bussinesform.is_educational_center = data.is_educational_center == "No" ? false : true;
    this.is_educational_centerShow = data.is_educational_center == "No" ? "No" : "Si";
    this.bussinesform.has_delivered_homes = data.has_delivered_homes == "No" ? false : true;
    this.has_delivered_homesShow = data.has_delivered_homes == "No" ? "No" : "Si";
   
  }

  async serverAll() {
    if (storageData.get("_bussines")) {
      await this.getDocuments();
    } 
    await this.getDocumentsAll();
    await this.getStates();
    await this.getEconomicSector();
    await this.getEconomicActivies();
    await this.getTypeCompany();
    await this.getTyperif();
    await this.getTypeDocument();
    await this.getPositionAll();
 
    //await this.initData();
  }

  mounted() {
    this.serverAll();
    if (storageData.get("_bussines") !== null) {
      this.overlay = true;
      this.sectiontitle = "Actualizar Datos de Empresa";
      this.bussinesform = storageData.get("_bussines");
      this.updataSwitchBussines(storageData.get("_bussines"));
      this.getMunicipalityByState(this.bussinesform.state_id);
      this.getParishesByMunicipality(this.bussinesform.municipality_id);
      this.btnText = "Actualizar";
      this.validateInput = 1;
    }
  }
}
</script>
<style lang="scss" scoped>
.formCliente {
  background: white;
  padding: 2%;
  //border-radius: 8px;
  //border: 1px solid;
}
.vue-form-wizard {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.vue-form-wizard .wizard-header {

// Modern UI styles for v-card-title
.v-card-title {
  background: linear-gradient(90deg, #3f51b5 0%, #2196f3 100%);
  color: #fff !important;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.12);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
  display: none;
}
</style>
