import storageData from "@/store/services/storageService";
export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cilHome'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Registro',
        route: '/base',
        icon: 'cibElasticStack',
        items: (() => {
          const items = [
            {
              _name: 'CSidebarNavItem',
              name: 'Empresa',
              to: '/bussines',
              icon: 'cibDraugiemLv'
            },
            {
              _name: 'CSidebarNavItem',
              name: 'PCD',
              to: '/vincular',
              icon: 'cilUserFollow'
            },
            {
              _name: 'CSidebarNavItem',
              name: 'Declaraciones',
              to: '/declaraciones',
              icon: 'cilFingerprint'
            },
            {
              _name: 'CSidebarNavItem',
              name: 'Ofertas Laborales',
              to: '/ofertaslaborales',
              icon: 'cibAnaconda'
            }
          ];
          // Validar acceso por localStorage
          const hospital_center = storageData.get("_bussines").hospital_center === "1";
          const human_help = storageData.get("_bussines").human_help === "1";
          const maintenance_and_repair = storageData.get("_bussines").maintenance_and_repair === "1";
          const ortesis_protesis = storageData.get("_bussines").ortesis_protesis === "1";
          const has_workers_interpretes = storageData.get("_bussines").has_workers_interpretes === "1";
          const have_certificate = storageData.get("_bussines").have_certificate === "1";
          const is_educational_center = storageData.get("_bussines").is_educational_center === "1";
          const has_delivered_homes = storageData.get("_bussines").has_delivered_homes === "1";
          if (hospital_center) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Centro Hospitalario',
              to: '/hospitalcenter',
              icon: 'cibAnaconda'
            });
          }
          if (human_help) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Ayuda Humanitaria',
              to: '/humanhelp',
              icon: 'cibAnaconda'
            });
          }
          if (maintenance_and_repair) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Mantenimiento y Reparación',
              to: '/mantenimientoandreparacion',
              icon: 'cibAnaconda'
            });
          }
          if (ortesis_protesis) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Ortesis y Prótesis',
              to: '/ortesisprotesis',
              icon: 'cibAnaconda'
            });
          }
          if (has_workers_interpretes) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Interpretes',
              to: '/interpretes',
              icon: 'cibAnaconda'
            });
          }
          if (have_certificate) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Certificados',
              to: '/certificados',
              icon: 'cibAnaconda'
            });
          }
          if (is_educational_center) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Estudiantes PCD',
              to: '/educationalcenter',
              icon: 'cibAnaconda'
            });
          }
          if (has_delivered_homes) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Hogares Entregados',
              to: '/deliveredhomes',
              icon: 'cibAnaconda'
            });
          }
          return items;
        })()
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Fiscalización',
        route: '/base',
        icon: 'cibElasticStack',
        items: [

          {
            _name: 'CSidebarNavItem',
            name: 'Carga de Documentos',
            to: '/requeriments',
            icon: 'cilCloudUpload'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Solicitudes de Inspección',
            to: '/solicitudinspeccion',
            icon: 'cibOpenstreetmap'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Guia de Inspección',
            to: '/guiainspeccion',
            icon: 'cibReadTheDocs'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Boleta de Ordenamiento',
            to: '/boletaordenamiento',
            icon: 'cibBuffer'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Acta de Cumplimiento',
            to: '/actacumplimiento',
            icon: 'cibLibreoffice'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Certificados ABI',
            to: '/certificadoabi',
            icon: 'cibLibreoffice'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Boletas Sancionatorias',
            to: '/sanctioning_tickets',
            icon: 'cibLibreoffice'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Gestión',
        route: '/base',
        icon: 'cibElasticStack',
        items: [
          {
            _name: 'CSidebarNavItem',
            name: 'Solicitudes de Formación',
            to: '/solicitudformacion',
            icon: 'cibOctave'
          },
          /* {
            _name: 'CSidebarNavItem',
            name: 'Evaluación de Formación',
            to: '/trainingevaluation',
            icon: 'cibOpenstreetmap'
          }, */
          {
            _name: 'CSidebarNavItem',
            name: 'Citas',
            to: '/citas',
            icon: 'cibMyspace'
          },
        ]
      },
    ]
  }
]



