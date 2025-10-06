import storageData from "@/store/services/storageService";

// Exporta un generador para construir el menú con el estado actual de localStorage
export default function buildCertificateApprovedMenu() {
  const isPendingGlobal = !!storageData.get('_pending_registration');
  if (isPendingGlobal) {
    return [
      {
        _name: 'CSidebarNav',
        _children: [
          { _name: 'CSidebarNavItem', name: 'Dashboard', to: '/dashboard', icon: 'cilHome' },
          {
            _name: 'CSidebarNavDropdown',
            name: 'Centro de Pagos',
            route: '/base',
            icon: 'cibElasticStack',
            items: [
              { _name: 'CSidebarNavItem', name: 'Centro de Pagos', to: '/paymentcenter', icon: 'cibOctave' },
            ]
          },
        ]
      }
    ];
  }
  return [
    {
      _name: 'CSidebarNav',
      _children: [
        {
          _name: 'CSidebarNavItem',
          name: 'Dashboard',
          to: '/dashboard',
          icon: 'cilHome'
        },
        (() => {
          const isPending = !!storageData.get('_pending_registration');
          if (isPending) return null; // Ocultar todo el bloque Registro cuando está pendiente
          return {
            _name: 'CSidebarNavDropdown',
            name: 'Registro',
            route: '/base',
            icon: 'cibElasticStack',
            items: (() => {
              const items = [
                { _name: 'CSidebarNavItem', name: 'Empresa', to: '/bussines', icon: 'cibDraugiemLv' },
                { _name: 'CSidebarNavItem', name: 'PCD', to: '/vincular', icon: 'cilUserFollow' },
                { _name: 'CSidebarNavItem', name: 'Declaraciones', to: '/declaraciones', icon: 'cilFingerprint' },
                { _name: 'CSidebarNavItem', name: 'Ofertas Laborales', to: '/ofertaslaborales', icon: 'cibAnaconda' }
              ];
              // Validar acceso por localStorage de forma segura
              const bussines = storageData.get("_bussines") || {};
              const hospital_center = bussines && bussines.hospital_center === "Si";
              const maintenance_and_repair = bussines && bussines.maintenance_and_repair === "Si";
              const ortesis_protesis = bussines && bussines.ortesis_protesis === "Si";
              const ortesis_laboratories = bussines && bussines.ortesis_laboratories === "Si";
              const has_workers_interpretes = bussines && bussines.has_workers_interpretes === "Si";
              const is_educational_center = bussines && bussines.is_educational_center === "Si";
              if (hospital_center) {
                items.push({ _name: 'CSidebarNavItem', name: 'Centro Hospitalario', to: '/hospitalcenter', icon: 'cibAnaconda' });
              }
              if (maintenance_and_repair) {
                items.push({ _name: 'CSidebarNavItem', name: 'Mantenimiento y Reparación', to: '/mantenimientoandreparacion', icon: 'cibAnaconda' });
              }
              if (ortesis_protesis) {
                items.push({ _name: 'CSidebarNavItem', name: 'Ortesis y Prótesis', to: '/ortesisprotesis', icon: 'cibAnaconda' });
              }
              if (ortesis_laboratories) {
                items.push({ _name: 'CSidebarNavItem', name: 'Laboratorios de Órtesis', to: '/ortesislaboratories', icon: 'cibAnaconda' });
              }
              if (has_workers_interpretes) {
                items.push({ _name: 'CSidebarNavItem', name: 'Interpretes', to: '/interpretes', icon: 'cibAnaconda' });
              }
              if (is_educational_center) {
                items.push({ _name: 'CSidebarNavItem', name: 'Estudiantes PCD', to: '/educationalcenter', icon: 'cibAnaconda' });
              }
              return items;
            })()
          };
        })(),
        (() => {
          const isPending = !!storageData.get('_pending_registration');
          if (isPending) return null;
          return {
            _name: 'CSidebarNavDropdown',
            name: 'Fiscalización',
            route: '/base',
            icon: 'cibElasticStack',
            items: [
              { _name: 'CSidebarNavItem', name: 'Carga de Documentos', to: '/requeriments', icon: 'cilCloudUpload' },
              { _name: 'CSidebarNavItem', name: 'Solicitudes de Inspección', to: '/solicitudinspeccion', icon: 'cibOpenstreetmap' },
              { _name: 'CSidebarNavItem', name: 'Guia de Inspección', to: '/guiainspeccion', icon: 'cibReadTheDocs' },
              { _name: 'CSidebarNavItem', name: 'Boleta de Ordenamiento', to: '/boletaordenamiento', icon: 'cibBuffer' },
              { _name: 'CSidebarNavItem', name: 'Acta de Cumplimiento', to: '/actacumplimiento', icon: 'cibLibreoffice' },
              { _name: 'CSidebarNavItem', name: 'Certificados ABI', to: '/certificadoabi', icon: 'cibLibreoffice' },
              { _name: 'CSidebarNavItem', name: 'Boletas Sancionatorias', to: '/sanctioning_tickets', icon: 'cibLibreoffice' },
            ]
          };
        })(),
        (() => {
          const isPending = !!storageData.get('_pending_registration');
          if (isPending) return null;
          return {
            _name: 'CSidebarNavDropdown',
            name: 'Gestión',
            route: '/base',
            icon: 'cibElasticStack',
            items: [
              { _name: 'CSidebarNavItem', name: 'Solicitudes de Formación', to: '/solicitudformacion', icon: 'cibOctave' },
              /* ... más items si aplican ... */
            ]
          };
        })(),
        {
          _name: 'CSidebarNavDropdown',
          name: 'Centro de Pagos',
          route: '/base',
          icon: 'cibElasticStack',
          items: [
            { _name: 'CSidebarNavItem', name: 'Centro de Pagos', to: '/paymentcenter', icon: 'cibOctave' },
          ]
        },
      ]
    }
  ];
}



