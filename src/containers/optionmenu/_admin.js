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
        _name: 'CSidebarNavItem',
        name: 'Empresa',
        to: '/bussines',
        icon: 'cibDraugiemLv'
      },
     {
        _name: 'CSidebarNavItem',
        name: 'Centro de Notificaciones',
        to: '#',
        icon: 'cilLan'
      },
     {
        _name: 'CSidebarNavItem',
        name: 'Solicitudes de Inspección',
        to: '#',
        icon: 'cibOpenstreetmap'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Carga de Documentos',
        to: '#',
        icon: 'cilCloudUpload'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Certificados ABI',
        to: '#',
        icon: 'cibLibreoffice'
      },
    ]
  }
]



