
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
/*        {
          _name: 'CSidebarNavItem',
          name: 'Notificaciones',
          to: '/notification',
          icon: 'cilLan'
        }, */
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
      ]
    }
  ]
  
  
  
  