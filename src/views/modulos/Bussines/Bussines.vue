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
                <v-row>
                  <v-container class="mt-5">
                    <v-layout
                      v-for="(doc, index) in documents"
                      :key="index"
                      row
                      wrap
                    >
                      <v-row>
                        <input type="hidden" v-model="doc.id" />
                        <input type="hidden" v-model="doc.bussines_id" />
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :disabled="(disabled = true)"
                            label="Nombre Documento"
                            placeholder="Nombre Documento"
                            outlined
                            dense
                            :rules="rules"
                            v-model="doc.title"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-file-input
                            :rules="doc.is_required == 1 ? rules : Notrules"
                            :disabled="
                              doc.approved == 1 ? disabledFile : !disabledFile
                            "
                            accept=".pdf,.jpg,.png,.jpeg"
                            outlined
                            dense
                            :label="
                              doc.approved == 1
                                ? 'Documento Adjuntado en Revisión'
                                : placeholder
                            "
                            @change="updateDocument(doc)"
                            v-model="doc.name"
                          >
                          </v-file-input>
                          <span
                            class="d-flex justify-end"
                            style="margin-top: -25px; color: #4b4b4b"
                            >{{ validation }} |
                            {{
                              doc.max_size.substring(0, doc.max_size.length - 6)
                            }}
                            MB</span
                          >
                        </v-col>
                      </v-row>
                    </v-layout>
                  </v-container>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </tab-content>
        <!-- <tab-content title="ACCESIBILIDAD EN EL ENTORNO FISICO" icon="mdi mdi-stairs-up" :before-change="beforeTabSwitchFive">
					<v-form class="formCliente" ref="validateStepFormFive"  lazy-validation >	
						<v-row>
							<v-col style="margin-top: -4%;"  cols="12" sm="12" md="12">
								<v-row>    
									<v-col cols="12" sm="6" md="6">
										<v-switch
										v-model="bussinesform.rampas"
										:label="'Rampas: ' + rampasShow"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="rampas"
										@change="setItem('rampas')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.accesibilidad"
										:label="'Accesibilidad: ' + accesibilidadShow"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="accesibilidad"
										@change="setItem('accesibilidad')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.acceso_directo"
										:label="`Acceso Directo: ${acceso_directoShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="acceso_directo"
										@change="setItem('acceso_directo')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.transporte_publico"
										:label="`Transporte Público: ${transporte_publicoShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="transporte_publico"
										@change="setItem('transporte_publico')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.transporte_empresa"
										:label="`Transporte Empresa: ${transporte_empresaShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="transporte_empresa"
										@change="setItem('transporte_empresa')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.viabilidad"
										:label="`Viabilidad: ${viabilidadShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="viabilidad"
										@change="setItem('viabilidad')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.banos_acondicionados"
										:label="`Baños acondicionados para discapacidad motora: ${banos_acondicionadosShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="banos_acondicionados"
										@change="setItem('banos_acondicionados')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.escaleras"
										:label="`Escaleras: ${escalerasShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="escaleras"
										@change="setItem('escaleras')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.pasamanos"
										:label="`Pasamanos: ${pasamanosShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="pasamanos"
										@change="setItem('pasamanos')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
									</v-col>
									<v-col cols="12" sm="6" md="6">
										<v-switch
										v-model="bussinesform.pasillos"
										:label="`Pasillos: ${pasillosShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="pasillos"
										@change="setItem('pasillos')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.ascensores"
										:label="`Ascensores: ${ascensoresShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="ascensores"
										@change="setItem('ascensores')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.puertas_adaptadas"
										:label="`Puertas Adaptadas: ${puertas_adaptadasShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="puertas_adaptadas"
										@change="setItem('puertas_adaptadas')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.buena_iluminacion"
										:label="`Buena Iluminación: ${buena_iluminacionShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="buena_iluminacion"
										@change="setItem('buena_iluminacion')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.senalizaciones_luminosas"
										:label="`Señalizaciones Luminosas: ${senalizaciones_luminosasShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="senalizaciones_luminosas"
										@change="setItem('senalizaciones_luminosas')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.puestos_de_estacionamiento"
										:label="`Puestos de Estacionamientos: ${puestos_de_estacionamientoShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="puestos_de_estacionamiento"
										@change="setItem('puestos_de_estacionamiento')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.senalizacion"
										:label="`Señalización: ${senalizacionShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="senalizacion"
										@change="setItem('senalizacion')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
										<v-switch
										v-model="bussinesform.herramientas_tecnologicas"
										:label="`Herramienta Tecnológica: ${herramientas_tecnologicasShow}`"
										color="success"
										hide-details
										class="pl-3 pr-3"
										:value="herramientas_tecnologicas"
										@change="setItem('herramientas_tecnologicas')"
										:readonly="(validateInput == 1) ? readonly = true : readonly = false"
										></v-switch>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-form>	
				</tab-content> -->
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
                <v-switch
                  v-model="bussinesform.hospital_center"
                  :label="
                    '¿Es usted un Centro Hospitalario?  ' + hospital_centerShow
                  "
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  :value="hospital_center"
                  @change="setItem('hospital_center')"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-switch>
                <span
                  ><strong
                    ><h5>Herramientas y dispositivos Técnicos.</h5></strong
                  ></span
                >
                <v-switch
                  v-model="bussinesform.human_help"
                  :label="'¿Entrega Ayudas Humanas?   ' + human_helpShow"
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  :value="human_help"
                  @change="setItem('human_help')"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
                ></v-switch>
                <span
                  ><strong
                    ><h5>
                      Talleres de reparación de herramientas y Dispositivos
                      Técnicos.
                    </h5></strong
                  ></span
                >
                <v-switch
                  v-model="bussinesform.maintenance_and_repair"
                  :label="
                    '¿Se dedica al mantenimiento y reparación de Ayudas Humanas?)    ' +
                    maintenance_and_repairShow
                  "
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  :value="maintenance_and_repair"
                  @change="setItem('maintenance_and_repair')"
                  :readonly="
                    validateInput == 1 ? (readonly = true) : (readonly = false)
                  "
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
                    '¿Laboratorios de órtesis y prótesis?  ' +
                    ortesis_protesisShow
                  "
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  :value="ortesis_protesis"
                  @change="setItem('ortesis_protesis')"
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
                    '¿Posee usted trabajadores Interpretes, Facilitadores y/o Ambas?  ' +
                    has_workers_interpretesShow
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
                    '¿Tiene certificado de intérprete/facilitador? Nota:este campo depende de la respuesta anterior  ' +
                    have_certificateShow
                  "
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  :value="have_certificate"
                  @change="setItem('have_certificate')"
                ></v-switch>
                <!--<v-text-field
								label="N° Certificado"
								placeholder="N° Certificado"
								dense
								:rules="emailRules"
								type="email"
								v-model="bussinesform.email_rl"
								:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							
								<v-text-field
								label="Email"
								placeholder="Email"
								dense
								:rules="emailRules"
								type="email"
								v-model="bussinesform.email_rl"
								:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field> -->
                <span
                  ><strong><h5>Educación discapacidad.</h5></strong></span
                >
                <v-switch
                  v-model="bussinesform.is_educational_center"
                  :label="
                    '¿Es usted un Centro Educativo?   ' +
                    is_educational_centerShow
                  "
                  color="success"
                  hide-details
                  class="pl-3 pr-3 mb-5"
                  :value="is_educational_center"
                  @change="setItem('is_educational_center')"
                ></v-switch>
                <span
                  ><strong><h5>Vivienda Discapacidad.</h5></strong></span
                >
                <v-switch
                  v-model="bussinesform.has_delivered_homes"
                  :label="
                    '¿Usted ha entregado viviendas a personas con discapacidad?  ' +
                    has_delivered_homesShow
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
    hospital_center: 0,
    human_help: 0,
    maintenance_and_repair: 0,
    ortesis_protesis: 0,
    has_workers_interpretes: 0,
    have_certificate: 0,
    is_educational_center: 0,
    has_delivered_homes: 0,
    username: "",
    documents: [],
  };
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
  maintenance_and_repair: boolean = false;
  human_help: boolean = false;
  hospital_center: boolean = false;
  hospital_centerShow = "No";
  human_helpShow = "No";
  maintenance_and_repairShow = "No";
  ortesis_protesisShow = "No";
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

  show: Boolean = false;
  bussines_id = "";
  documentsForm = {};
  documents = [];

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
    const documents: any = await documentModule.getDocumentsAll();
    this.documents = documents.data.data;
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
  async updateDocument(doc) {
    let index = this.documents.findIndex(({ id }) => id == doc.id);
    const _this = this;
    var event = event || window.event;

    if (event.target.files != undefined) {
      if (event.target.files.length > 0) {
        if (
          event.target.files[0].type === "image/png" ||
          event.target.files[0].type === "image/jpg" ||
          event.target.files[0].type === "image/jpeg" ||
          event.target.files[0].type === "application/pdf"
        ) {
          if (event.target.files[0].size < this.documents[index].max_size) {
            if (
              event.target.files[0] != undefined &&
              event.target.files.length == 1
            ) {
              let base64 = await this.getBase64(event.target.files[0], doc);
            }
          } else {
            this.dialogOpen = true;
            this.dataModalAlert = "El Documento excede el tamaño permitido";
            this.backClear(doc);
          }
        } else {
          this.dialogOpen = true;
          this.dataModalAlert = "Extensión NO permitida";
          this.backClear(doc);
          return false;
        }
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
    }, 1500);
  }
  /* FIN METODOS */
  async getRifType(event) {
    if (this.bussinesform.rif != undefined) {
      console.log(1);
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
      console.log(2);
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
    console.log(this.arrayPosition);
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
    this.bussinesform.accesibilidad = data.accesibilidad == "No" ? false : true;
    this.accesibilidadShow = data.accesibilidad == "No" ? "No" : "Si";
    this.bussinesform.ascensores = data.ascensores == "No" ? false : true;
    this.ascensoresShow = data.ascensores == "No" ? "No" : "Si";
    this.bussinesform.rampas = data.rampas == "No" ? false : true;
    this.rampasShow = data.rampas == "No" ? "No" : "Si";
    this.bussinesform.acceso_directo =
      data.acceso_directo == "No" ? false : true;
    this.acceso_directoShow = data.acceso_directo == "No" ? "No" : "Si";
    this.bussinesform.transporte_publico =
      data.transporte_publico == "No" ? false : true;
    this.transporte_publicoShow = data.transporte_publico == "No" ? "No" : "Si";
    this.bussinesform.transporte_empresa =
      data.transporte_empresa == "No" ? false : true;
    this.transporte_empresaShow = data.transporte_empresa == "No" ? "No" : "Si";
    this.bussinesform.viabilidad = data.viabilidad == "No" ? false : true;
    this.viabilidadShow = data.viabilidad == "No" ? "No" : "Si";
    this.bussinesform.banos_acondicionados =
      data.banos_acondicionados == "No" ? false : true;
    this.banos_acondicionadosShow =
      data.banos_acondicionados == "No" ? "No" : "Si";
    this.bussinesform.escaleras = data.escaleras == "No" ? false : true;
    this.escalerasShow = data.escaleras == "No" ? "No" : "Si";
    this.bussinesform.pasamanos = data.pasamanos == "No" ? false : true;
    this.pasamanosShow = data.pasamanos == "No" ? "No" : "Si";
    this.bussinesform.pasillos = data.pasillos == "No" ? false : true;
    this.pasillosShow = data.pasillos == "No" ? "No" : "Si";
    this.bussinesform.puertas_adaptadas =
      data.puertas_adaptadas == "No" ? false : true;
    this.puertas_adaptadasShow = data.puertas_adaptadas == "No" ? "No" : "Si";
    this.bussinesform.buena_iluminacion =
      data.buena_iluminacion == "No" ? false : true;
    this.buena_iluminacionShow = data.buena_iluminacion == "No" ? "No" : "Si";
    this.bussinesform.senalizaciones_luminosas =
      data.senalizaciones_luminosas == "No" ? false : true;
    this.senalizaciones_luminosasShow =
      data.senalizaciones_luminosas == "No" ? "No" : "Si";
    this.bussinesform.puestos_de_estacionamiento =
      data.puestos_de_estacionamiento == "No" ? false : true;
    this.puestos_de_estacionamientoShow =
      data.puestos_de_estacionamiento == "No" ? "No" : "Si";
    this.bussinesform.senalizacion = data.senalizacion == "No" ? false : true;
    this.senalizacionShow = data.senalizacion == "No" ? "No" : "Si";
    this.bussinesform.herramientas_tecnologicas =
      data.herramientas_tecnologicas == "No" ? false : true;
    this.herramientas_tecnologicasShow =
      data.herramientas_tecnologicas == "No" ? "No" : "Si";
  }

  async serverAll() {
    await this.getStates();
    await this.getEconomicSector();
    await this.getEconomicActivies();
    await this.getTypeCompany();
    await this.getTyperif();
    await this.getTypeDocument();
    await this.getPositionAll();
    await this.getDocuments();
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
  display: none;
}
</style>
