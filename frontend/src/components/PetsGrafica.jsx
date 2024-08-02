import { BarChart, Title } from "@tremor/react";

const PetsGrafica = ({ data }) => {
  // Agrupar los perros por raza
  const perrosPorRaza = data.reduce((acc, perro) => {
    const raza = perro.race_name || 'Sin raza';
    if (!acc[raza]) {
      acc[raza] = 0;
    }
    acc[raza]++;
    return acc;
  }, {});

  // Formatear los datos para el gráfico de barras
  const chartData = Object.entries(perrosPorRaza).map(([raza, cantidad]) => ({
    raza,
    'Cantidad de perros': cantidad,
  }));

  // Calcular el valor máximo para escalar las barras
  const maxValue = Math.max(...chartData.map(item => item['Cantidad de perros']));

  const barChartProps = {
    data: chartData,
    index: 'raza',
    categories: ['Cantidad de perros'],
    colors: ['blue'],
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
      <Title className="text-3xl font-semibold">Perros por raza</Title>
      <BarChart {...barChartProps} />
    </div>
  );
};

export default PetsGrafica;