'use client';

import { useEffect, useState } from 'react';

const RankingDisplay = () => {
  const [cultures, setCultures] = useState([]);
  const [agricultures, setAgricultures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/signIn';
          return;
        }

        // Buscar fazendas
        const farmsResponse = await fetch('http://localhost:3000/farms/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!farmsResponse.ok) {
          throw new Error('Failed to fetch farms');
        }

        const farms = await farmsResponse.json();

        // Buscar culturas de cada fazenda
        const culturesPromises = farms.map(farm =>
          fetch(`http://localhost:3000/cultures/farms/${farm.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then(res => res.json())
        );

        const allCulturesArrays = await Promise.all(culturesPromises);
        const allCultures = allCulturesArrays.flat();

        // Buscar todas as agriculturas
        const agriculturesResponse = await fetch('http://localhost:3000/agricultures', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!agriculturesResponse.ok) {
          throw new Error('Failed to fetch agricultures');
        }

        const agriculturesData = await agriculturesResponse.json();

        setCultures(allCultures);
        setAgricultures(agriculturesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função de processamento do ranking
  const processRankingData = (data, isAnimal, agricultures) => {
    return data
      .map(culture => {
        const agriculture = agricultures.find(ag => ag.tipo === culture.agricultureid);
        if (agriculture) {
          console.log(
            `ID: ${culture.agricultureid}, Nome: ${agriculture.nome}, ColhxAnim: ${agriculture.colhxanim}`
          );
          return {
            id: culture.id, 
            name: agriculture.nome,
            value: culture.qtd,
            colhxanim: agriculture.colhxanim
          };
        } else {
          console.log(`Agriculture não encontrada para agricultureId: ${culture.agricultureid}`);
        }
        return null;
      })
      .filter(item => item && item.colhxanim === isAnimal) // Filtrar pelo tipo correto
      .sort((a, b) => b.value - a.value) // Ordenar pelo valor
      .slice(0, 4); // Pegar top 4
  };

  if (isLoading) return <div className="text-center text-xl">Carregando...</div>;
  if (error) return <div className="text-center text-red-600">Erro: {error}</div>;

  const topCrops = processRankingData(cultures, false, agricultures);
  const topAnimals = processRankingData(cultures, true, agricultures);

  const getMaxValue = data => (data.length > 0 ? Math.max(...data.map(item => item.value)) : 0);

  const RankingItem = ({ rank, id, name, value, maxValue }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-gray-700">{rank}</span>
          <span className="text-lg font-medium">{name} <span className="text-gray-500 text-sm">(ID: {id})</span></span>
        </div>
        <span className="text-lg font-semibold text-gray-800">{value}</span>
      </div>
      <div className="bg-gray-300 h-2 rounded-full">
        <div
          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(value / maxValue) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="flex items-center w-full h-full justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-md">
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md mb-4"
        >
          Voltar
        </button>
        <h1 className="text-4xl font-bold text-center mb-8 ">Tabela de Ranking Agro</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Principais Colheitas</h2>
            {topCrops.map((crop, index) => (
              <RankingItem
                key={index}
                rank={index + 1}
                id={`${crop.id}`}
                name={`${crop.name}`}
                value={crop.value}
                maxValue={getMaxValue(topCrops)}
              />
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Principais Animais</h2>
            {topAnimals.map((animal, index) => (
              <RankingItem
                key={index}
                rank={index + 1}
                id={`${animal.id}`}
                name={`${animal.name}`}
                value={animal.value}
                maxValue={getMaxValue(topAnimals)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default RankingDisplay;
