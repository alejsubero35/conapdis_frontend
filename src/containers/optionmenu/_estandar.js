/* export default [
  {
    _name: 'CSidebarNav',
    _children: [

      {
        _name: 'CSidebarNavDropdown',
        name: 'Home',
        route: '/base',
        icon: 'cil-Grid',
        items: [
          {
            name: 'Dashboard',
            to: '/dashboard'
          }
        ]
      },

      {
        _name: 'CSidebarNavDropdown',
        name: 'Usuarios',
        route: '/base',
        icon: 'cil-user',
        items: [
          {
            name: 'Crear Usuario',
            to: '/users'
          }

        ],
        
      },

      {
        _name: 'CSidebarNavDropdown',
        name: 'Ventas',
        route: '/facturas',
        icon: 'cil-dollar',
        items: [
          {
            name: 'Crear Factura',
            to: '/facturas'
          }

        ],
        
      },

      {
        _name: 'CSidebarNavDropdown',
        name: 'Planes',
        route: '/planes',
        icon: 'cil-notes',
        items: [
          {
            name: 'Seriales',
            to: '/planes'
          }

        ],
        
      },

      {
        _name: 'CSidebarNavDropdown',
        name: 'Información del Cliente',
        route: '/planes',
        icon: 'cil-people',
        items: [
          {
            name: 'Registrar',
            to: '/informacioncliente'
          }

        ],
        
      }
    ]
  }
] */

export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-Grid'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Asignación de Planes',
        to: '/planes',
        icon: 'cil-notes'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Casos',
        to: '/casos',
        icon: 'cib-stackOverflow'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Notas de Entrega',
        to: '/notasentrega',
        icon: 'cil-file'
      },
    ]
  }
]



