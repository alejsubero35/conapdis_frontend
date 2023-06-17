<template>
    <div>
	    <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
   
            <div class="formCliente">
   		<TitleSection :sectiontitle="sectiontitle"/>
            <form-wizard  
            class="test " 
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
                <tab-content title="INFORMACIÓN BÁSICA"  icon="mdi mdi-cube-send" :before-change="beforeTabSwitch">
                    <v-form class="formCliente" ref="validateStepForm"  lazy-validation >	
						<input type="hidden" v-model="bussinesform.id" value:any="0" >
						<input type="hidden" v-model="bussinesform.country_id" value:any="237" >
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
								:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
								<span v-show="validateRifDB" style="margin-top:-19px;color:red">El Rif Existe</span>
							</v-col>
							<v-col cols="12" sm="6" md="6">
								<v-text-field
									label="Razón social"
									placeholder="Razón social"
									dense
									:rules="rules"
									v-model="bussinesform.company_name"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col  cols="12" sm="12" md="12">
								<h5 style="font-size: 14px; color: rgb(255,64,129); font-weight:bold">Registro Mercantil</h5>
								<v-divider></v-divider>
							</v-col>
						</v-row>
						<v-row>	
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Tomo"
									placeholder="Tomo"
									dense
									v-model="bussinesform.tomo"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Folio"
									placeholder="Folio"
									dense
									v-model="bussinesform.folio"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Número"
									placeholder="Número"									
									dense									
									v-model="bussinesform.number"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:disabled="(validateInput == 1) ? disabled = true : disabled = false"
									locale="es"
									no-title
									></v-date-picker>
								</v-menu>
							</v-col>
				
						</v-row>
						<v-row>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Organismo Inscrito a:"
									placeholder="Organismo Inscrito a:"
									dense
									v-model="bussinesform.attached_body"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Página Web"
									placeholder="Página Web"

									dense
									v-model="bussinesform.web"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-select>
							</v-col>
							
						</v-row>
                	</v-form>
				</tab-content>
				<tab-content title="RESPOSANBLE DE LA APLICACIÓN"  icon="mdi mdi-account" :before-change="beforeTabSwitchTwo">
                    <v-form class="formCliente" ref="validateStepFormTwo"  lazy-validation >	
						<input type="hidden" v-model="bussinesform.id" value:any="0" >
						<v-row>
							<v-col cols="12" sm="6" md="6">
								<v-text-field
									label="Nombre"
									placeholder="Nombres Responsable de la Aplicación"
									dense
									:rules="rules"
									v-model="bussinesform.first_name"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="6">
								<v-text-field
									label="Apellido"
									placeholder="Apellidos Responsable de la Aplicación"
									dense
									:rules="rules"
									v-model="bussinesform.last_name"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="6">
								<v-text-field
								label="Email"
								placeholder="Email"
								type="email"
								dense
								v-model="bussinesform.email_r"
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
                <tab-content title="DIRECCIÓN Y TELÉFONOS"  icon="mdi mdi-cellphone-marker"  :before-change="beforeTabSwitchThree">
                    <v-form class="formCliente" ref="validateStepFormThree"  lazy-validation >	
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-text-field
									label="Teléfono 2"
									placeholder="####-#######'"
									dense
									v-model="bussinesform.telefono2"
									v-mask="'####-#######'"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-text-field
									label="Teléfono 3"
									placeholder="####-#######'"
									dense
									v-model="bussinesform.telefono3"
									v-mask="'####-#######'"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-textarea>
							</v-col>
						</v-row>
                    </v-form>
				</tab-content>
				<tab-content title="REPRESENTANTE LEGAL" icon="mdi mdi-account-box-outline" :before-change="beforeTabSwitchFour">
					<v-form class="formCliente" ref="validateStepFormFour"  lazy-validation >	
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Nombres"
									placeholder="nombres"
									dense
									:rules="rules"
									v-model="bussinesform.first_name_rl"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Apellidos"
									placeholder="Apellidos"
									dense
									:rules="rules"
									v-model="bussinesform.last_name_rl"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Teléfono 2"
									placeholder="####-#######'"
									dense
									v-model="bussinesform.telefono2_representante_legal"
									v-mask="'####-#######'"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Teléfono 3"
									placeholder="####-#######'"
									dense
									v-model="bussinesform.telefono3_representante_legal"
									v-mask="'####-#######'"
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
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
								:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								@blur="validatEmail()"
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
									:readonly="(validateInput == 1) ? readonly = true : readonly = false"
								></v-select>
							</v-col>
						</v-row>
					</v-form>	
				</tab-content>
				<tab-content title="ACCESIBILIDAD EN EL ENTORNO FISICO" icon="mdi mdi-stairs-up" :before-change="beforeTabSwitchFive">
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
				</tab-content>
				<tab-content title="OTROS" icon="mdi mdi-all-inclusive" :before-change="beforeTabSwitchSix">
					<v-form class="formCliente" ref="validateStepFormsix"  lazy-validation >	
						<v-row>
							<v-col cols="12" sm="12" md="12">
								<v-textarea
									label="Observaciones"
									dense
									v-model="bussinesform.observations"
									rows="2"
								></v-textarea>
							</v-col>
						</v-row>
					</v-form>	
				</tab-content>
            </form-wizard> 
        </div>
    	<Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color"/>
		<v-dialog
		v-model="dialog" max-width="400">
		<v-card>
		  <v-card-title class="text-h5">
			Empresa Registrada con Éxito
		  </v-card-title>
  
		  <v-card-text>
			Será redirigido al Login, debe esperar que CONAPDIS active la empresa...
		  </v-card-text>
  
		  <v-card-actions>
			<v-spacer></v-spacer>
  
			<v-btn
			  color="primary"
			  text
			  @click="goHome()"
			>
			  Ok
			</v-btn>
		  </v-card-actions>
		</v-card>
	  </v-dialog>
	  <v-dialog v-model="dialogOpen" max-width="350">
        <v-card>
            <v-card-title class="text-h5">
                Notificación
            </v-card-title>
            <v-card-text>
                Este Correo ya existe 
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    text
                    @click="dialogOpen = false"
                >
                    Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import bussinesModule from '@/store/modules/bussinesModule';
import sessionModule from '@/store/modules/sessionModule';
import { ValidationObserver } from 'vee-validate'
import storageData from '@/store/services/storageService'


@Component({
  components: {

  }
})
export default class Bussines extends Vue {
[x: string]: unknown;
	zonas?: any = [];
	tipoclientes?: any = [];
	vendedor?: any = [];
	segmentos?: any = [];
	condicionespago?: any = [];
	overlay = false;
	title : string = '';
	subtitle : string = ''
	validateStepForm : any = {inactivo: '1'};
    bussinesform : any = { 
		code: 0, 
		message:'', 
		country_id : 237,
		rampas: 0,
		accesibilidad: 0,
		acceso_directo: 0,
		transporte_publico:0,
		transporte_empresa:0,
		viabilidad:0,
		banos_acondicionados:0,
		escaleras:0,
		pasamanos:0,
		pasillos:0,
		ascensores: 0,
		puertas_adaptadas:0,
		buena_iluminacion:0,
		senalizaciones_luminosas:0,
		puestos_de_estacionamiento:0,
		senalizacion:0,
		herramientas_tecnologicas:0,
		username:'',
	}
    loadingWizard = false
	typerif = [
		{value: '1', text: 'Personal'},
		{value: '2', text: 'Jurídico'},
		{value: '3', text: 'Gobierno'},
        {value: '4', text: 'Consejo Comunal'},	
    ];

	inactivo = [
        {value: '0', text: 'Inactivo'},
        {value: '1', text: 'Activo'}
    ];
    agente_retencion = ''
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    sectiontitle = 'Registrar Datos de Empresa'
    dialog = false
    tabIndex = 0
	herramientas_tecnologicas : boolean = false
	senalizacion : boolean = false
	puestos_de_estacionamiento : boolean = false
	senalizaciones_luminosas : boolean = false
	buena_iluminacion : boolean = false
	puertas_adaptadas : boolean = false
	ascensores : boolean = false
	pasillos : boolean = false
	pasamanos : boolean = false
	escaleras : boolean = false
	banos_acondicionados : boolean = false
	viabilidad : boolean = false
	transporte_empresa : boolean = false
	transporte_publico : boolean = false
	acceso_directo : boolean = false
	accesibilidad: boolean = false
	rampas : boolean = false
	rampasShow = 'No'
	accesibilidadShow = 'No'
	acceso_directoShow = 'No'
	transporte_publicoShow = 'No'
	transporte_empresaShow = 'No'
	viabilidadShow = 'No'
	banos_acondicionadosShow = 'No'
	escalerasShow = 'No'
	pasamanosShow = 'No'
	pasillosShow = 'No'
	ascensoresShow = 'No'
	puertas_adaptadasShow = 'No'
	senalizaciones_luminosasShow = 'No'
	buena_iluminacionShow  = 'No'
	puestos_de_estacionamientoShow = 'No'
	senalizacionShow = 'No'
	herramientas_tecnologicasShow = 'No'
	arrayStates = []
	arrayMunicipality = []
	arrayParishes = []
	arraySectores = []
	arrayEconomicSector = []
	arrayEconomicActivies = []
	arrayTypeCompany = []
	arrayTyperif = []
	arrayTypeDocument = []
	arrayUserType = []
	arrayPosition = []
	is_sucursal = false
	sucursal    = false
	tipodocumentos  = [
        {value: 'cedula', text: 'Cédula'},
        {value: 'pasaporte', text: 'Pasaporte'},
    ];
    tipoidentity  = [
        {value: 'v', text: 'Venezolano'},
        {value: 'e', text: 'Extrajero'},
    ];
	numero_sucursal = ''
	nombre_sucursal = ''
	showSucursal = false
	date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu2 : boolean = false
	validateRifDB = false
    max25chars = v => v.length <= 25 || 'Input too long!'
	btnText = 'Guardar'
	validateInput = 0
	dialogOpen = false
	$refs!: {
        validateStepForm: InstanceType<typeof ValidationObserver>;
        validateStepFormTwo: InstanceType<typeof ValidationObserver>;
		validateStepFormThree: InstanceType<typeof ValidationObserver>;
		validateStepFormFour: InstanceType<typeof ValidationObserver>;
		validateStepFormFive: InstanceType<typeof ValidationObserver>;
		validateStepFormsix: InstanceType<typeof ValidationObserver>;
			
	}
	get getBussines() {
        return bussinesModule.getBussines; 
    }
	get FormRequest(): any {
        return this.bussinesform;
    }

    get activo() {
        return this.validateStepForm.inactivo = '1'
    }
    setLoading(value) {
       this.loadingWizard = value
   }
    handleValidation(isValid, tabIndex){
        console.log('Tab: '+tabIndex+ ' valid: '+isValid)
    }
	async updateFecha(){
		this.bussinesform.registration_date = this.date
	}

	async validateRif(value){
		if(value.length == 12){
			const data : any = await bussinesModule.existRif(value)
			if(data.data.length > 0){
				this.validateRifDB = true
				this.bussinesform.rif = ''
			}else{
				this.validateRifDB = false
			}
		}
	}
    beforeTabSwitch(){
        const valid :any =  this.$refs.validateStepForm.validate();
			this.bussinesform.username =  this.bussinesform.rif.replaceAll('-',"")
			console.log(this.bussinesform.username)

			Math.ceil(this.bussinesform.tomo)
			Math.ceil(this.bussinesform.folio)
			Math.ceil(this.bussinesform.number)
			
        if (valid) {
           return true
        }else {
            return false
        }
    } 
    beforeTabSwitchTwo(){
        const valid :any =  this.$refs.validateStepFormTwo.validate();
        if (valid) {
           return true
        }else {
            return false
        }
    } 
	beforeTabSwitchThree(){
        const valid :any =  this.$refs.validateStepFormThree.validate();
        if (valid) {
           return true
        }else {
            return false
        }
    }
	beforeTabSwitchFour(){
        const valid :any =  this.$refs.validateStepFormFour.validate();
        if (valid) {
           return true
        }else {
            return false
        }
    }
	beforeTabSwitchFive(){
        const valid :any =  this.$refs.validateStepFormFive.validate();
        if (valid) {
           return true
        }else {
            return false
        }
    }
	beforeTabSwitchSix(){
        const valid :any =  this.$refs.validateStepFormsix.validate();
        if (valid) {
           return true
        }else {
            return false
        }
    }
	

	async validatEmail(){
		const validate : any = await bussinesModule.validateEmailRL(this.bussinesform.email_rl)
		console.log(validate.data.length)
		if (validate.data.length > 0) {
			this.dialogOpen = true
			this.bussinesform.email_rl = ''
		} else {

		}
	}
	onComplete() {console.log(this.FormRequest)
		if (this.FormRequest.id > 0) {
			this.updateBussines();
		} else {
			this.saveBussines();
		}	
    }
 	async saveBussines() { 
		this.updateSwitch()
		console.log(this.FormRequest)
 		this.overlay = true
    	const data = await bussinesModule.save(this.FormRequest)
		console.log(data)
		if(data.code == 201){
			this.textmsj = 'Empresa Creada con Éxito.'
			this.color = 'success'
			this.snackbar = true
			this.back();
			await sessionModule.updateStatusBussines('registered')
			this.overlay = false 
			this.dialog = true
		} else {
			this.textmsj = 'Error al Registrar los datos de la Empresa.'
			this.color = 'error'
			this.snackbar = true
			this.backError();
			this.overlay = false 
		}
    }; 
	async updateBussines(){
 		this.overlay = true
    	const data = await bussinesModule.update(this.FormRequest)
	
		if(data.code == 201){
			this.textmsj = 'Empresa Actualizada con Éxito.'
			this.color = 'success'
			this.snackbar = true
			this.back();
			this.overlay = false 
				
		} else {
			this.textmsj = 'Error al Actualizar los datos de la Empresa.'
			this.color = 'error'
			this.snackbar = true
			this.backError();
			this.overlay = false 
		}
		//this.reset();
       
	}
	async setItem(event){
		switch(event){
			case 'rampas':
				if(this.bussinesform.rampas) this.rampasShow = 'Si' 
				else this.rampasShow = 'No' 
			break;
			case 'accesibilidad':
				if(this.bussinesform.accesibilidad) this.accesibilidadShow = 'Si' 
				else this.accesibilidadShow = 'No' 
			break;
			case 'acceso_directo':
				if(this.bussinesform.acceso_directo) this.acceso_directoShow = 'Si' 
				else this.acceso_directoShow = 'No' 
			break;
			case 'transporte_publico':
				if(this.bussinesform.transporte_publico) this.transporte_publicoShow = 'Si' 
				else this.transporte_publicoShow = 'No' 
			break;
			case 'transporte_empresa':
				if(this.bussinesform.transporte_empresa) this.transporte_empresaShow = 'Si' 
				else this.transporte_empresaShow = 'No' 
			break;
			case 'viabilidad':
				if(this.bussinesform.viabilidad) this.viabilidadShow = 'Si' 
				else this.viabilidadShow = 'No' 
			break;
			case 'banos_acondicionados':
				if(this.bussinesform.banos_acondicionados) this.banos_acondicionadosShow = 'Si' 
				else this.banos_acondicionadosShow = 'No' 
			break;
			case 'escaleras':
				if(this.bussinesform.escaleras) this.escalerasShow = 'Si' 
				else this.escalerasShow = 'No' 
			break;
			case 'pasamanos':
				if(this.bussinesform.pasamanos) this.pasamanosShow = 'Si' 
				else this.pasamanosShow = 'No' 
			break;
			case 'pasillos':
				if(this.bussinesform.pasillos) this.pasillosShow = 'Si' 
				else this.pasillosShow = 'No' 
			break;
			case 'ascensores':
				if(this.bussinesform.ascensores) this.ascensoresShow = 'Si' 
				else this.ascensoresShow = 'No' 
			break;
			case 'puertas_adaptadas':
				if(this.bussinesform.puertas_adaptadas) this.puertas_adaptadasShow = 'Si' 
				else this.puertas_adaptadasShow = 'No' 
			break;
			case 'buena_iluminacion':
				if(this.bussinesform.buena_iluminacion) this.buena_iluminacionShow = 'Si' 
				else this.buena_iluminacionShow = 'No' 
			break;
			case 'senalizaciones_luminosas':
				if(this.bussinesform.senalizaciones_luminosas) this.senalizaciones_luminosasShow = 'Si' 
				else this.senalizaciones_luminosasShow = 'No' 
			break;
			case 'puestos_de_estacionamiento':
				if(this.bussinesform.puestos_de_estacionamiento) this.puestos_de_estacionamientoShow = 'Si' 
				else this.puestos_de_estacionamientoShow = 'No' 
			break;
			case 'senalizacion':
				if(this.bussinesform.senalizacion) this.senalizacionShow = 'Si' 
				else this.senalizacionShow = 'No' 
			break;
			case 'herramientas_tecnologicas':
				if(this.bussinesform.herramientas_tecnologicas) this.herramientas_tecnologicasShow = 'Si' 
				else this.herramientas_tecnologicasShow = 'No' 
			break;

		}
	}
	async updateSwitch(){

		if(this.bussinesform.rampas) this.bussinesform.rampas = 'Si' 
		else this.bussinesform.rampas = 'No' 

		if(this.bussinesform.accesibilidad) this.bussinesform.accesibilidad = 'Si' 
		else this.bussinesform.accesibilidad = 'No' 

		if(this.bussinesform.acceso_directo) this.bussinesform.acceso_directo = 'Si' 
		else this.bussinesform.acceso_directo = 'No' 

		if(this.bussinesform.transporte_publico) this.bussinesform.transporte_publico = 'Si' 
		else this.bussinesform.transporte_publico = 'No' 

		if(this.bussinesform.transporte_empresa) this.bussinesform.transporte_empresa = 'Si' 
		else this.bussinesform.transporte_empresa = 'No' 

		if(this.bussinesform.viabilidad) this.bussinesform.viabilidad = 'Si' 
		else this.bussinesform.viabilidad = 'No' 

		if(this.bussinesform.banos_acondicionados) this.bussinesform.banos_acondicionados = 'Si' 
		else this.bussinesform.banos_acondicionados = 'No' 

		if(this.bussinesform.escaleras) this.bussinesform.escaleras = 'Si' 
		else this.bussinesform.escaleras = 'No' 

		if(this.bussinesform.pasamanos) this.bussinesform.pasamanos = 'Si' 
		else this.bussinesform.pasamanos = 'No' 

		if(this.bussinesform.pasillos) this.bussinesform.pasillos = 'Si' 
		else this.bussinesform.pasillos = 'No' 

		if(this.bussinesform.ascensores) this.bussinesform.ascensores = 'Si' 
		else this.bussinesform.ascensores = 'No' 

		if(this.bussinesform.puertas_adaptadas) this.bussinesform.puertas_adaptadas = 'Si' 
		else this.bussinesform.puertas_adaptadas = 'No' 

		if(this.bussinesform.buena_iluminacion) this.bussinesform.buena_iluminacion = 'Si' 
		else this.bussinesform.buena_iluminacion = 'No' 

		if(this.bussinesform.senalizaciones_luminosas) this.bussinesform.senalizaciones_luminosas = 'Si' 
		else this.bussinesform.senalizaciones_luminosas = 'No' 

		if(this.bussinesform.puestos_de_estacionamiento) this.bussinesform.puestos_de_estacionamiento = 'Si' 
		else this.bussinesform.puestos_de_estacionamiento = 'No' 

		if(this.bussinesform.senalizacion) this.bussinesform.senalizacion = 'Si' 
		else this.bussinesform.senalizacion = 'No' 

		if(this.bussinesform.herramientas_tecnologicas) this.bussinesform.herramientas_tecnologicas = 'Si' 
		else this.bussinesform.herramientas_tecnologicas = 'No' 		
	}

	async goDocuments(){
		this.$router.push({ name: 'requeriments' });
	}
	async goHome(){
		this.dialog = false
		this.$router.push({ name: 'Dashboard' });
	}
	async getStates(){
		const states : any = await bussinesModule.getStatesAll()
		this.arrayStates = states.data.data
	}
	/* async getUserType(){
		const typeuser : any = await bussinesModule.getUserTypeAll()
		this.arrayUserType = typeuser.data.data
		this.initData()
	} */
	async getEconomicSector(){
		const economicsector : any = await bussinesModule.getEconomicSectorAll()
		this.arrayEconomicSector = economicsector.data.data
	}
	async getEconomicActivies(){
		const economicactivies : any = await bussinesModule.getEconomicActiviesAll()
		this.ordenarArray(economicactivies.data)
	}
	async getTypeCompany(){
		const typecompany : any = await bussinesModule.getTypeCompanyAll()
		this.arrayTypeCompany = typecompany.data.data
	}
	async getTyperif(){
		const typerif : any = await bussinesModule.getTyperifAll()
		this.arrayTyperif = typerif.data
	}
	async getTypeDocument(){
		const typeDocument : any = await bussinesModule.getTypeDocumentAll()
		this.arrayTypeDocument = typeDocument.data
	}
	async getMunicipalityByState(event){
		const municipality : any = await bussinesModule.getMunicipality(event)
		this.arrayMunicipality = municipality.data.data
	}
	async getParishesByMunicipality(event){
		const parishes : any = await bussinesModule.getParishes(event)
		this.arrayParishes = parishes.data.data
		this.overlay = false
	}
	async getSectoresByParishes(event){
		const sectors : any = await bussinesModule.getSectores(event)
		console.log(sectors)
		this.arraySectores = sectors.data
	}
	async ordenarArray(array){
        const newArray = array.sort((a,b) => a.nombre.localeCompare(b.nombre))
        this.arrayEconomicActivies = newArray
    }
	async getPositionAll(){
		const position : any = await sessionModule.getPositionAll()
		this.ordenarArray2(position.data.data)
	}
	async ordenarArray2(array){
        const newArray = array.sort((a,b) => a.name.localeCompare(b.name))
		this.arrayPosition = newArray
    }
	reset () {
        this.$refs.validateStepForm.reset()
    };
    back() {
        setTimeout(() => {
			this.tabIndex = 0
            this.snackbar = false
        },2000);
    }
	backError(){
		setTimeout(() => {
            this.snackbar = false
        },3500);
	}

	data(){
    return{
		show:false,
        rules: [
            (v:any) => !!v || 'Campo requerido'
        ],
		emailRules: [
			v => !!v || 'E-mail is requerido',
			v => /.+@.+/.test(v) || 'El email debe ser válido',
		], 
        numberRule: [
            v => !!v || 'campo requerido',
            v => v > 0  || 'El valor debe ser mayor a cero',
            v => v <= 100  || 'El valor debe ser menor a 100'
        ],
		rulesNum: [
			(v:any) => !!v || 'Campo requerido',
            v => v >= 0  || 'No Acepta numeros negativos',
        ],
            
        }
    };
	initData(){
		 this.bussinesform = {
			type_rif :'1',
			rif:'j-14610701-2',
			company_name:'prueba',
			tomo:10,
			folio:20,
			number:30,
			duration:10,
			attached_body:'adscrito a algo',
			web:'www.prueba.com',
			email:'prueba@gmail.com',
			economic_sectors_id:1,
			company_types_id:1,
			employer_number_ivss:100,
			economic_activity_id:1,
			user_type_id:1,
			comercial_designation:'decripcion prueba',
			first_name: 'Eulemis',
			last_name: 'Hernández',
			email_r:'eulemisalfredo@gmail.com',
			phone:'04120169750',
			location:'yare',
			type_identity_card:'cedula',
			identity_card_rl:'16092842',
			first_name_rl:'alejandro',
			last_name_rl:'subero',
			email_rl:'juan@gmail.com',
			observations:'observacion de prueba',
			password:'12345678'
		} 
	}
	async updataSwitchBussines(data){
		this.bussinesform.accesibilidad      			= (data.accesibilidad == 'No') ? false : true
		this.accesibilidadShow               			= (data.accesibilidad == 'No') ? 'No'  : 'Si'
		this.bussinesform.ascensores         			= (data.ascensores == 'No') ? false : true
		this.ascensoresShow                  			= (data.ascensores == 'No') ? 'No'  : 'Si'
		this.bussinesform.rampas   						= (data.rampas == 'No') ? false : true
		this.rampasShow       							= (data.rampas == 'No') ? 'No'  : 'Si'  
		this.bussinesform.acceso_directo   				= (data.acceso_directo == 'No') ? false : true
		this.acceso_directoShow       					= (data.acceso_directo == 'No') ? 'No'  : 'Si'  
		this.bussinesform.transporte_publico   			= (data.transporte_publico == 'No') ? false : true
		this.transporte_publicoShow       				= (data.transporte_publico == 'No') ? 'No'  : 'Si'  
		this.bussinesform.transporte_empresa   			= (data.transporte_empresa == 'No') ? false : true
		this.transporte_empresaShow       				= (data.transporte_empresa == 'No') ? 'No'  : 'Si'  
		this.bussinesform.viabilidad   					= (data.viabilidad == 'No') ? false : true
		this.viabilidadShow       						= (data.viabilidad == 'No') ? 'No'  : 'Si'  
		this.bussinesform.banos_acondicionados  		= (data.banos_acondicionados == 'No') ? false : true
		this.banos_acondicionadosShow       			= (data.banos_acondicionados == 'No') ? 'No'  : 'Si'  
		this.bussinesform.escaleras   					= (data.escaleras == 'No') ? false : true
		this.escalerasShow       						= (data.escaleras == 'No') ? 'No'  : 'Si'  
		this.bussinesform.pasamanos   					= (data.pasamanos == 'No') ? false : true
		this.pasamanosShow       						= (data.pasamanos == 'No') ? 'No'  : 'Si'  
		this.bussinesform.pasillos   					= (data.pasillos == 'No') ? false : true
		this.pasillosShow       						= (data.pasillos == 'No') ? 'No'  : 'Si'  
		this.bussinesform.puertas_adaptadas   			= (data.puertas_adaptadas == 'No') ? false : true
		this.puertas_adaptadasShow       				= (data.puertas_adaptadas == 'No') ? 'No'  : 'Si'  
		this.bussinesform.buena_iluminacion   			= (data.buena_iluminacion == 'No') ? false : true
		this.buena_iluminacionShow       				= (data.buena_iluminacion == 'No') ? 'No'  : 'Si'  
		this.bussinesform.senalizaciones_luminosas   	= (data.senalizaciones_luminosas == 'No') ? false : true
		this.senalizaciones_luminosasShow       		= (data.senalizaciones_luminosas == 'No') ? 'No'  : 'Si'  
		this.bussinesform.puestos_de_estacionamiento   	= (data.puestos_de_estacionamiento == 'No') ? false : true
		this.puestos_de_estacionamientoShow       		= (data.puestos_de_estacionamiento == 'No') ? 'No'  : 'Si'  
		this.bussinesform.senalizacion   				= (data.senalizacion == 'No') ? false : true
		this.senalizacionShow       					= (data.senalizacion == 'No') ? 'No'  : 'Si'  
		this.bussinesform.herramientas_tecnologicas   	= (data.herramientas_tecnologicas == 'No') ? false : true
		this.herramientas_tecnologicasShow       		= (data.herramientas_tecnologicas == 'No') ? 'No'  : 'Si'  
	}
	
    mounted(){
		this.getStates()
		this.getEconomicSector()
		this.getEconomicActivies()
		this.getTypeCompany()
		this.getTyperif()
		this.getTypeDocument()
		this.getPositionAll()
		//this.initData()
		//this.getUserType()
	console.log(storageData.get('_bussines'))
		if (storageData.get('_bussines') !== null) {
			this.overlay = true
			this. sectiontitle = 'Actualizar Datos de Empresa'
			this.bussinesform = storageData.get('_bussines')
			this.updataSwitchBussines(storageData.get('_bussines'))
			this.getMunicipalityByState(this.bussinesform.state_id)
			this.getParishesByMunicipality(this.bussinesform.municipality_id)
			this.btnText       = 'Actualizar'
			this.validateInput = 1
		}
    }
}
</script>
<style lang="scss" scoped>
    .formCliente{
        background: white;
        padding: 2%;
        //border-radius: 8px;
		//border: 1px solid;
    }
	.vue-form-wizard{
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
    .vue-form-wizard .wizard-header{
        display: none;
    }
</style>
