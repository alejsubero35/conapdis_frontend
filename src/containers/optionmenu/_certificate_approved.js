
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
        items: [
          {
            _name: 'CSidebarNavItem',
            name: 'Empresa',
            to: '/bussines',
            icon: 'cibDraugiemLv'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Vincular-Desvincular (PDC)',
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
        ]
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



