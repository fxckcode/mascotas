import { BarChart } from "@tremor/react";

const PetsStatusGraficas = ({ data }) => {
  // Agrupar los perros por estado de adopción
  const estadoDeAdopcion = data.reduce((acc, perro) => {
    const estado = perro.state || 'Sin estado';
    if (!acc[estado]) {
      acc[estado] = 0;
    }
    acc[estado]++;
    return acc;
  }, {});

  // Formatear los datos para el gráfico de barras
  const chartData = Object.entries(estadoDeAdopcion).map(([estado, cantidad]) => ({
    estado,
    'Cantidad de mascotas': cantidad,
  }));

  // Calcular el valor máximo para escalar las barras
  const maxValue = Math.max(...chartData.map(item => item['Cantidad de mascotas']));

  const barChartProps = {
    data: chartData,
    index: 'estado',
    categories: ['Cantidad de mascotas'],
    colors: ['green'],
    yAxisWidth: 40,
    valueFormatter: (number) => `${number}`,
    marginTop: 'mt-6',
    barWidth: 30,
    barSpacing: 4,
    animation: true,
    enableGridX: false,
    enableGridY: false,
    maxValue: maxValue === 1 ? 2 : maxValue * 1.2,
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-semibold text-black">Mascotas por estado</h2>
      <BarChart {...barChartProps} />
    </div>
  );
};

export default PetsStatusGraficas;