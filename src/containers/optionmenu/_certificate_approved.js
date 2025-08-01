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
          // Validar acceso por localStorage de forma segura
          const bussines = storageData.get("_bussines") || {};
          const hospital_center = bussines.hospital_center === "Si";
          const human_help = bussines.human_help === "Si";
          const maintenance_and_repair = bussines.maintenance_and_repair === "Si";
          const ortesis_protesis = bussines.ortesis_protesis === "Si";
          const ortesis_laboratories = bussines.ortesis_laboratories === "Si";
          const has_workers_interpretes = bussines.has_workers_interpretes === "Si";
          const have_certificate = bussines.have_certificate === "Si";
          const is_educational_center = bussines.is_educational_center === "Si";
          const has_delivered_homes = bussines.has_delivered_homes === "Si";
          if (hospital_center) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Centro Hospitalario',
              to: '/hospitalcenter',
              icon: 'cibAnaconda'
            });
          }
          /* if (human_help) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Ayuda Humanitaria',
              to: '/humanhelp',
              icon: 'cibAnaconda'
            });
          } */
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
          if (ortesis_laboratories) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Laboratorios de Órtesis',
              to: '/ortesislaboratories',
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
          /* if (have_certificate) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Certificados',
              to: '/certificados',
              icon: 'cibAnaconda'
            });
          } */
          if (is_educational_center) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Estudiantes PCD',
              to: '/educationalcenter',
              icon: 'cibAnaconda'
            });
          }
          /* if (has_delivered_homes) {
            items.push({
              _name: 'CSidebarNavItem',
              name: 'Hogares Entregados',
              to: '/deliveredhomes',
              icon: 'cibAnaconda'
            });
          } */
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
      {
        _name: 'CSidebarNavDropdown',
        name: 'Centro de Pagos',
        route: '/base',
        icon: 'cibElasticStack',
        items: [
          {
            _name: 'CSidebarNavItem',
            name: 'Centro de Pagos',
            to: '/paymentcenter',
            icon: 'cibOctave'
          },
        ]
      },
    ]
  }
]



