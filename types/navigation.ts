// Rutas de navegación entre pantallas de la app
export type RootStackParamList = {
  Inicio: undefined;
  Login: undefined;
  Dashboard: undefined;
  DrawerDashboard :undefined;
  RegistrarPedido: undefined;
  Clientes: undefined;
  Perfil: undefined;
  Ventas: undefined;
  Reportes:undefined;
  Pedidos:undefined;


  EstadoPedidos: { screen?: "PorHacer" | "Realizados" | "PorEntregar" | "Entregados" };
  PorHacer: undefined;
  Realizados: undefined;
  PorEntregar: undefined;
  Entregados: undefined;


};
