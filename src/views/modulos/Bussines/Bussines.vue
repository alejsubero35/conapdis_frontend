<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <div class="formCliente">
      <TitleSection :sectiontitle="sectiontitle" />
      <form-wizard
        ref="wizard"
        class="test"
        :key="wizardKey"
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
              <v-col v-if="bussinesform.type_rif != 6" cols="12" sm="6" md="3">
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
              <v-col v-if="bussinesform.type_rif != 6" cols="12" sm="6" md="3">
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
              <v-col v-if="bussinesform.type_rif == 6" cols="12" sm="6" md="6">
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
                  label="Email"
                  placeholder="Email"
                  type="email"
                  dense
                  :rules="rules"
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
                      { text: 'Status', value: 'status', sortable: false },
                      // Columna oculta para reemplazo/recarga del documento
                      { text: '', value: 'replace_input', sortable: false },
                      { text: 'Acciones', value: 'actions', sortable: false }
                    ]"
                    :items="documentsload"
                    class="elevation-1"
                    :loading="overlay"
                    loading-text="Cargando documentos..."
                    dense
                  >
                    <template v-slot:item.status="{ item }">
                      <v-chip :color="item.status == 'approved' ? 'green' : (item.status == 'rejected' ? 'red' : 'warning')" small dark>
                        {{ item.status ? item.status : 'pending' }}
                      </v-chip>
                    </template>
                    

                    <template v-slot:item.actions="{ item }">
                      <div class="d-flex align-center">
                        <!-- If replacement mode is enabled for this item, only show the upload action -->
                        <v-tooltip v-if="replaceEnabled[item.id]" top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon color="primary" @click="triggerReplaceInput(item.id)" title="Subir documento reemplazo">
                              <v-icon>mdi-upload</v-icon>
                            </v-btn>
                          </template>
                          <span>Subir reemplazo</span>
                        </v-tooltip>

                        <!-- When not in replacement mode follow status rules -->
                        <template v-else>
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <!-- Show view button when there is a valid external URL or a base64 data URL stored in item.file
                                   Only show when not saving and when file exists OR when status is approved (approved must be view-only)
                              -->
                              <v-btn
                                v-bind="attrs"
                                v-on="on"
                                icon
                                color="primary"
                                v-if=" (item.status === 'approved') || (item.status === 'pending') "
                                :href="item.file_url"
                                target="_blank"
                                rel="noopener"
                              >
                                <v-icon>mdi-file-eye</v-icon>
                              </v-btn>
                            </template>
                            <span v-if="item.file_url && isValidUrl(item.file_url)">Ver documento</span>
                            <span v-else-if="item.file">Ver documento (preview)</span>
                            <span v-else>Documento no disponible</span>
                          </v-tooltip>

                          <!-- If document DOES NOT exist and status is pending, show upload button to trigger hidden file input -->
                          <v-tooltip v-if="item.status === 'pending'" top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn v-bind="attrs" v-on="on" icon color="primary" v-if="!item.file_url && !item.file" @click="triggerReplaceInput(item.id)" title="Subir documento">
                                <v-icon>mdi-upload</v-icon>
                              </v-btn>
                            </template>
                            <span>Subir documento</span>
                          </v-tooltip>

                          <!-- Delete: only when status is pending and there is a file to delete -->
                          <v-tooltip v-if="item.status === 'pending' && (item.file_url || item.file)" top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn v-bind="attrs" v-on="on" icon color="red" @click="confirmDeleteDocument(item)">
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </template>
                            <span>Eliminar documento</span>
                          </v-tooltip>
                        </template>
                      </div>
                    </template>

                    <!-- Slot para columna oculta de reemplazo -->
                    <template v-slot:item.replace_input="{ item, index }">
                      <div class="replace-cell">
                        <!-- input file oculto; será habilitado y disparado cuando se elimine el documento -->
                        <input
                          :ref="'replaceInput-' + item.id"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          style="display: none"
                          @change="(e) => uploadSingleDocument(item, e, index)"
                        />

                        <!-- Botón para abrir el diálogo de archivo; solo visible cuando está habilitado -->
                        <v-btn
                          v-if="replaceEnabled[item.id]"
                          icon
                          small
                          color="primary"
                          @click="triggerReplaceInput(item.id)"
                          title="Subir documento reemplazo"
                        >
                          <v-icon>mdi-upload</v-icon>
                        </v-btn>
                      </div>
                    </template>
                  </v-data-table>
                </v-card>
                <!-- Inputs para cargar documentos requeridos -->
                <v-card v-else outlined>
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
                  @change="setItem('has_workers_interpretes')"
                ></v-switch>
                <v-switch
                  v-show="hidecertificate"
                  v-model="bussinesform.have_certificate"
                  :label="
                    '¿Posee Certificado de pertenecer a la Red Nacional de Interpretes?  '
                  "
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  @change="setItem('have_certificate')"
                ></v-switch>
                
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
          {{ titlemodalalert }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogOpen = false">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog de confirmación de eliminación de documento -->
    <v-dialog v-model="confirmDeleteDialog" max-width="450">
      <v-card>
        <v-card-title class="text-h5">Confirmar eliminación</v-card-title>
        <v-card-text>
          ¿Está seguro que desea eliminar el documento <strong>{{ documentToDelete ? documentToDelete.title : '' }}</strong> ? Esta acción no se puede deshacer.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelDelete">Cancelar</v-btn>
          <v-btn color="red" text @click="confirmDelete">Eliminar</v-btn>
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
  // Re-render key to force wizard to honor start-index when changed
  wizardKey: number = 0;
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
  // Dialog específico para confirmar eliminación de documento
  confirmDeleteDialog = false;
  documentToDelete: any = null;
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
  replaceEnabled: any = {};
  savingDocuments: any = {};

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

    // Inicializar replaceEnabled para cada documento (deshabilitado por defecto)
    this.replaceEnabled = {};
    this.documentsload.forEach((d: any) => {
      this.$set(this.replaceEnabled, d.id, false);
      // initialize saving flag
      this.$set(this.savingDocuments, d.id, false);
    });

    this.documents = dataDocuments.data.documents;
  
    this.documents = this.documents.filter(
      (doc: any) => doc.visibility_in === 1
    );
    this.validateBtn();
    this.overlay = false;
  }

  // Confirm before delete: checks status and asks user
  confirmDeleteDocument(item) {
    // Normalize status: if missing, treat as 'pendiente'
    const status = item && item.status ? String(item.status).toLowerCase() : 'pendiente';

    // Only allow deletion when status is 'pendiente'
    if (status !== 'pending') {
      this.dialogOpen = true;
      this.titlemodalalert = 'No puede eliminar un documento que no esté en estado pendiente.';
      return;
    }

    // Abrir dialog de confirmación (Vuetify)
    this.documentToDelete = item;
    this.confirmDeleteDialog = true;
  }

  cancelDelete() {
    this.confirmDeleteDialog = false;
    this.documentToDelete = null;
  }

  confirmDelete() {
    if (this.documentToDelete) {
      this.deleteDocument(this.documentToDelete);
    }
    this.confirmDeleteDialog = false;
    this.documentToDelete = null;
  }

  async deleteDocument(item) {console.log("eliminar",item);
    try {
      this.overlay = true;
      // If the documentModule exposes a delete endpoint, call it. We'll attempt to call
      // an endpoint named `deleteDocument` or fallback to HTTP delete via the module.
      // Try calling documentModule.deleteDocument if exists
      if (documentModule && (documentModule as any).deleteDocument) {
        await (documentModule as any).deleteDocument(item.document_bussine_id);
      } else if ((documentModule as any).httpDelete) {
        await (documentModule as any).httpDelete(item.id);
      } else {
        // No API helper available: optimistic local removal only
        console.warn('No delete action found on documentModule, removing locally only.');
      }

      // Enabling replacement input for this document so user can upload new file
      this.$set(this.replaceEnabled, item.id, true);

      // Also clear any local file / url so the view button disappears immediately
      const idxLoad = this.documentsload.findIndex((d: any) => d.id == item.id);
      if (idxLoad !== -1) {
        this.$set(this.documentsload[idxLoad], 'file', null);
        this.$set(this.documentsload[idxLoad], 'file_url', null);
        this.$set(this.documentsload[idxLoad], 'name', null);
        // ensure v-data-table detects change
        this.$set(this.documentsload, idxLoad, Object.assign({}, this.documentsload[idxLoad]));
      }
      // ensure saving flag cleared
      this.$set(this.savingDocuments, item.id, false);

      this.textmsj = 'Documento eliminado. Ahora puede subir un reemplazo.';
      this.color = 'success';
      this.snackbar = true;
    } catch (err) {
      console.error(err);
      this.textmsj = 'Error al eliminar el documento.';
      this.color = 'error';
      this.snackbar = true;
    } finally {
      this.overlay = false;
    }
  }

  triggerReplaceInput(id) {
    const refName = 'replaceInput-' + id;
    const input: any = this.$refs[refName];
    if (input && input.length && input[0]) {
      input[0].click();
    } else if (input && input.click) {
      // single ref
      input.click();
    }
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
  
  // Upload a single file immediately when selected from the hidden input
  async uploadSingleDocument(doc, fileEvent, i) {
    console.log("subir",doc);
    console.log(this.documents)
    let index = -1;
    try {
      this.overlay = true;
      index = this.documents.findIndex(({ id }) => id == doc.id);

      // If not found, try to use the provided slot index as a hint (only if it maps into documents)
      if (index === -1 && typeof i === 'number' && i >= 0 && i < this.documents.length) {
        index = i;
      }

      // Additional fallbacks: try to match by document_bussine_id (from server), or string compare
      if (index === -1) {
        if (doc && doc.document_bussine_id) {
          index = this.documents.findIndex(d => d.document_bussine_id == doc.document_bussine_id);
        }
      }

      if (index === -1) {
        // fallback: try to find by doc.id again more defensively (string compare)
        index = this.documents.findIndex(d => String(d.id) === String(doc.id));
      }

      // As a last effort, if i is a valid index in documents, use it
      if (index === -1 && typeof i === 'number' && i >= 0 && i < this.documents.length) {
        index = i;
      }

      if (index === -1) {
        this.overlay = false;
        console.warn('uploadSingleDocument: could not determine document index for', doc);
        this.textmsj = 'Error interno: índice de documento no encontrado.';
        this.color = 'error';
        this.snackbar = true;
        return false;
      }
      const files = fileEvent && fileEvent.target ? fileEvent.target.files : fileEvent;

      // Ensure bussines id is set
      this.documents[index].bussines_id = storageData.get("_bussines")
        ? storageData.get("_bussines").id
        : '';
      this.documents[index].registration_date = this.todayDate;

      if (!files || files.length === 0) {
        this.overlay = false;
        return;
      }

      const file = files[0];
      const allowedExtensions = ["pdf", "jpg", "jpeg", "png"];
      const allowedMimeTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png"
      ];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension) || !allowedMimeTypes.includes(file.type)) {
        this.dialogOpen = true;
        this.dataModalAlert = "Extensión o tipo de archivo NO permitido. Solo se permiten: pdf, jpg, jpeg, png";
        this.overlay = false;
        return false;
      }

      if (file.size >= this.documents[index].max_size) {
        this.dialogOpen = true;
        this.dataModalAlert = "El Documento excede el tamaño permitido";
        this.overlay = false;
        return false;
      }

      // Convert to base64 and attach to the documents list
      const base64 = await this.getBase64(file, doc);
      // ensure the documents source has the file
      if (index !== -1 && this.documents[index]) {
        this.$set(this.documents[index], 'file', base64);
        this.$set(this.documents[index], 'name', file.name);
      }
      // ensure the loaded table item also has the file
      const idxLoad = this.documentsload.findIndex(({ id }) => id == doc.id);
      if (idxLoad !== -1) {
        this.$set(this.documentsload[idxLoad], 'file', base64);
        this.$set(this.documentsload[idxLoad], 'name', file.name);
        // replace the object so v-data-table detects change
        this.$set(this.documentsload, idxLoad, Object.assign({}, this.documentsload[idxLoad]));
      }

      // Build payload for saving single document (API expects array of documents in saveDocuments)
      const payload = [ this.documents[index] ];

      // mark as saving to prevent showing view button until backend returns file_url
      this.$set(this.savingDocuments, this.documents[index].id, true);
      const response = await documentModule.saveDocuments(payload as any);
      if (response && (response.status == 200 || response.status == 201)) {
        this.textmsj = "Documento cargado con éxito.";
        this.color = "success";
        this.snackbar = true;

        // If server returns created documents in response.data, try to update local state immediately
        try {
          const returned = response.data && response.data.data ? response.data.data : null;
          if (returned && Array.isArray(returned) && returned.length > 0) {
            // The API returns an array of created DocumentBussine objects
            const created = returned[0];
            const documentBussineId = created.id || created.document_bussine_id || null;
            const fileUrl = created.file ? created.file : (created.file_url ? created.file_url : null);

            // update documentsload entry by matching document_requirement id or document id
            const matchIndex = this.documentsload.findIndex((d: any) => d.id == (created.document_requirement_id || created.id || doc.id));
            if (matchIndex !== -1) {
              if (fileUrl) this.$set(this.documentsload[matchIndex], 'file_url', fileUrl);
              if (documentBussineId) this.$set(this.documentsload[matchIndex], 'document_bussine_id', documentBussineId);
              this.$set(this.replaceEnabled, this.documentsload[matchIndex].id, false);
              this.$set(this.savingDocuments, this.documentsload[matchIndex].id, false);
              // force update
              this.$set(this.documentsload, matchIndex, Object.assign({}, this.documentsload[matchIndex]));
            }
          } else {
            // fallback: refresh list
            await this.getDocuments();
          }
        } catch (e) {
          // if anything fails, refresh the documents
          await this.getDocuments();
        }
      } else {
        this.textmsj = "Error al subir el documento.";
        this.color = "error";
        this.snackbar = true;
      }
    } catch (err) {
      console.error(err);
      this.textmsj = "Error al procesar el archivo.";
      this.color = "error";
      this.snackbar = true;
    } finally {
      this.overlay = false;
      try {
        const docId = doc && doc.id ? doc.id : (index !== -1 && this.documents[index] ? this.documents[index].id : null);
        if (docId) this.$set(this.savingDocuments, docId, false);
      } catch (e) {
        console.warn('Could not unset savingDocuments flag', e);
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
    // Update both documents (source) and documentsload (table) if the item exists in either
    const idxDocs = this.documents.findIndex(({ id }) => id == doc.id);
    if (idxDocs !== -1) {
      this.documents[idxDocs].file = imgbase64;
      this.documents[idxDocs].name = fileName && fileName.name ? fileName.name : fileName;
    }

    const idxLoad = this.documentsload.findIndex(({ id }) => id == doc.id);
    if (idxLoad !== -1) {
      this.documentsload[idxLoad].file = imgbase64;
      this.documentsload[idxLoad].name = fileName && fileName.name ? fileName.name : fileName;
      // force update so v-data-table picks up the change
      this.$set(this.documentsload, idxLoad, Object.assign({}, this.documentsload[idxLoad]));
    }
  }
  getBase64(file, doc) {
    const _this = this;
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          try {
            _this.getImgBase(reader.result, doc, file);
            resolve(reader.result);
          } catch (e) {
            reject(e);
          }
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
          reject(error);
        };
      } catch (err) {
        reject(err);
      }
    });
  }
  // Validates that a string is a well-formed http(s) URL
  public isValidUrl = (url: any): boolean => {
    if (!url || typeof url !== 'string') return false;
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };
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
    this.bussinesform.username = this.bussinesform.rif
      ? String(this.bussinesform.rif).split("-").join("")
      : "";

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
        this.titlemodalalert = "Este Correo ya existe en el Sistema.";
      } else {
      }
    }
  }
  async onComplete() {
    if (this.overlay) {
      return; // prevent re-entrance on multiple clicks
    }
    this.overlay = true; // block UI immediately while preparing documents
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
    this.overlay = true;
    // No mutar el formulario vinculado a los switches; serializar a 'Si'/'No' para enviar
    const payload = this.serializeSwitches(this.FormRequest);
    const data = await bussinesModule.save(payload);

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
    // No mutar el formulario vinculado a los switches; serializar a 'Si'/'No' para enviar
    const payload = this.serializeSwitches(this.FormRequest);
    const data = await bussinesModule.update(payload);

    if (data.code == 201) {
      this.textmsj = "Empresa Actualizada con Éxito.";
      this.color = "success";
      this.snackbar = true;
      this.back();
      this.overlay = false;
      // Reset wizard to first tab
      this.tabIndex = 0;
      this.wizardKey = this.wizardKey + 1; // force re-render to apply start-index
      this.$nextTick(() => {
        try {
          const wiz: any = (this.$refs as any).wizard;
          if (wiz) {
            if (typeof wiz.reset === 'function') {
              wiz.reset();
            } else if ('activeTabIndex' in wiz) {
              wiz.activeTabIndex = 0;
            }
          }
        } catch (e) {
          // noop: fallback is key-based re-render
        }
      });
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
  serializeSwitches(form) {
    // Construye un payload sin mutar los v-model booleanos
    const payload = { ...form };
    const toSiNo = (v) => (v === true ? 'Si' : 'No');
    payload.hospital_center = toSiNo(!!form.hospital_center);
    payload.human_help = toSiNo(!!form.human_help);
    payload.maintenance_and_repair = toSiNo(!!form.maintenance_and_repair);
    payload.ortesis_protesis = toSiNo(!!form.ortesis_protesis);
    payload.ortesis_laboratories = toSiNo(!!form.ortesis_laboratories);
    payload.has_workers_interpretes = toSiNo(!!form.has_workers_interpretes);
    payload.have_certificate = toSiNo(!!form.have_certificate);
    payload.is_educational_center = toSiNo(!!form.is_educational_center);
    payload.has_delivered_homes = toSiNo(!!form.has_delivered_homes);
    return payload;
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
      // expose arrayTyperif to the template type system
      arrayTyperif: [] as any[],
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
    // Normalizar a booleano; default a false cuando no viene definido
    const toBool = (val) => {
      if (typeof val === 'boolean') return val;
      if (val === null || val === undefined) return false;
      const s = String(val).trim().toLowerCase();
      if (s === 'si' || s === 'sí' || s === '1' || s === 'true') return true;
      if (s === 'no' || s === '0' || s === 'false') return false;
      return false;
    };

    // Campos del tab "OTROS"
    this.bussinesform.hospital_center = toBool(data.hospital_center);
    this.hospital_centerShow = this.bussinesform.hospital_center ? 'Si' : 'No';

    this.bussinesform.human_help = toBool(data.human_help);
    this.human_helpShow = this.bussinesform.human_help ? 'Si' : 'No';

    this.bussinesform.maintenance_and_repair = toBool(data.maintenance_and_repair);
    this.maintenance_and_repairShow = this.bussinesform.maintenance_and_repair ? 'Si' : 'No';

    this.bussinesform.ortesis_protesis = toBool(data.ortesis_protesis);
    this.ortesis_protesisShow = this.bussinesform.ortesis_protesis ? 'Si' : 'No';

    this.bussinesform.ortesis_laboratories = toBool(data.ortesis_laboratories);
    this.ortesis_laboratoriesShow = this.bussinesform.ortesis_laboratories ? 'Si' : 'No';

    this.bussinesform.has_workers_interpretes = toBool(data.has_workers_interpretes);
    this.has_workers_interpretesShow = this.bussinesform.has_workers_interpretes ? 'Si' : 'No';
    this.hidecertificate = this.bussinesform.has_workers_interpretes;

    this.bussinesform.have_certificate = toBool(data.have_certificate);
    this.have_certificateShow = this.bussinesform.have_certificate ? 'Si' : 'No';

    this.bussinesform.is_educational_center = toBool(data.is_educational_center);
    this.is_educational_centerShow = this.bussinesform.is_educational_center ? 'Si' : 'No';

    this.bussinesform.has_delivered_homes = toBool(data.has_delivered_homes);
    this.has_delivered_homesShow = this.bussinesform.has_delivered_homes ? 'Si' : 'No';
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
    console.log(this.tabIndex)
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
}

.vue-form-wizard {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.vue-form-wizard .wizard-header {
  display: none;
}

/* Modern UI styles for v-card-title */
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
</style>
