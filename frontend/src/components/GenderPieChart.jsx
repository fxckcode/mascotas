import { DonutChart, Title } from "@tremor/react";

const GenderPieChart = ({ data }) => {
  // Agrupar los perros por género
  const generoDePerros = data.reduce((acc, perro) => {
    const genero = perro.gender || 'Sin género';
    if (!acc[genero]) {
      acc[genero] = 0;
    }
    acc[genero]++;
    return acc;
  }, {});

  // Formatear los datos para el gráfico de torta
  const chartData = Object.entries(generoDePerros).map(([genero, cantidad]) => ({
    name: genero,
    value: cantidad,
  }));

  const pieChartProps = {
    data: chartData,
    categoryPercentage: 'Porcentaje',
    valueFormatter: (number) => `${number}`,
    colors: ['blue', 'red'],
    marginTop: 'mt-6',
    animation: true,
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-semibold text-black">Mascotas por género</h2>
      <DonutChart {...pieChartProps} />
    </div>
  );
};

export default GenderPieChart;