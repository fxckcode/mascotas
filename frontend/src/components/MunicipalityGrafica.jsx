import { BarChart } from "@tremor/react";

const MascotasPorMunicipioGrafica = ({ data }) => {
  // Agrupar las mascotas por municipio
  const mascotasPorMunicipio = data.reduce((acc, mascota) => {
    const municipio = mascota.municipality || 'Sin municipio';
    if (!acc[municipio]) {
      acc[municipio] = 0;
    }
    acc[municipio]++;
    return acc;
  }, {});

  // Formatear los datos para el gráfico de barras
  const chartData = Object.entries(mascotasPorMunicipio).map(([municipio, cantidad]) => ({
    municipio,
    'Cantidad de mascotas': cantidad,
  }));

  // Calcular el valor máximo para escalar las barras
  const maxValue = Math.max(...chartData.map(item => item['Cantidad de mascotas']));

  const barChartProps = {
    data: chartData,
    index: 'municipio',
    categories: ['Cantidad de mascotas'],
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
      <h2 className="text-xl font-semibold text-black">Mascotas por municipio</h2>
      <BarChart {...barChartProps} />
    </div>
  );
};

export default MascotasPorMunicipioGrafica;