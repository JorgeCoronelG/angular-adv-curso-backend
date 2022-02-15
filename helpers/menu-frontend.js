const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          subMenu: [
            { title: 'Inicio', url: '/' },
            { title: 'Progress Bar', url: 'progress' },
            { title: 'Gráficas', url: 'grafica1' },
            { title: 'Promesas', url: 'promesas' },
            { title: 'RxJs', url: 'rxjs' }
          ]
        },
        {
          title: 'Mantenimientos',
          icon: 'mdi mdi-folder-lock-open',
          subMenu: [
            // { title: 'Usuarios', url: 'usuarios' },
            { title: 'Hospitales', url: 'hospitales' },
            { title: 'Médicos', url: 'medicos' }
          ]
        }
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].subMenu.unshift({ title: 'Usuarios', url: 'usuarios' });
    }

    return menu;
};

module.exports = {
  getMenuFrontEnd
};