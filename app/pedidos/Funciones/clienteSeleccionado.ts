
export const ordenarClientesPorSeleccion = (
    clientes: any[],
    clienteSeleccionado: any | null
  ): any[] => {
    if (!clienteSeleccionado) return clientes;
  
    
    const clienteEncontrado = clientes.find(
      (c) => c.id === clienteSeleccionado.id
    );
  
    
    if (clienteEncontrado) {
      const otrosClientes = clientes.filter((c) => c.id !== clienteSeleccionado.id);
      return [clienteEncontrado, ...otrosClientes];
    }
  
    return clientes;
  };
  