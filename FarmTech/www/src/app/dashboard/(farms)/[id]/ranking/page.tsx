'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../../components/ui/table";
import { Card } from "../../../../../components/ui/card";

type Culture = {
  id: number;
  agricultureid: number;
  qtd: number;
};

type Agriculture = {
  tipo: number;
  nome: string;
  valor_unid: number;
};

type Product = {
  id: number;
  nome: string;
  preco: number;
};

type Need = {
  productId: number;
  qtd: number;
};

export default function FarmCultureTable({ params }: { params: { id: number } }) {
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [agricultures, setAgricultures] = useState<Agriculture[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [needs, setNeeds] = useState<Record<number, Need[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/signIn';
          return;
        }

        const [culturesRes, agriculturesRes, productsRes] = await Promise.all([
          fetch(`http://localhost:3000/cultures/farms/${params.id}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch('http://localhost:3000/agricultures', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('http://localhost:3000/products', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (!culturesRes.ok || !agriculturesRes.ok || !productsRes.ok) {
          throw new Error('Falha ao buscar dados');
        }

        const [culturesData, agriculturesData, productsData] = await Promise.all([
          culturesRes.json(),
          agriculturesRes.json(),
          productsRes.json()
        ]);

        setCultures(culturesData);
        setAgricultures(agriculturesData);
        setProducts(productsData);

        const needsData: Record<number, Need[]> = {};
        for (const culture of culturesData) {
          const response = await fetch(`http://localhost:3000/agricultures/${culture.agricultureid}/needs`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          needsData[culture.agricultureid] = response.ok ? await response.json() : [];
        }
        setNeeds(needsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const calculateTotalCost = (agriculture?: Agriculture, cultureQtd?: number, needsList: Need[] = []): number => {
    let totalCost = (agriculture?.valor_unid || 0) * (cultureQtd || 0);
    needsList.forEach(need => {
      const product = products.find(p => p.id === need.productId);
      if (product) {
        totalCost += (product.preco * need.qtd * (cultureQtd || 0));
      }
    });
    return totalCost;
  };

  if (isLoading) return <div className="p-4 text-lg text-center text-zinc-500">Carregando dados...</div>;
  if (error) return <div className="p-4 text-lg text-center text-orange-500">Erro: {error}</div>;

  return (
    <Card className="w-full p-4 shadow-xl rounded-lg bg-white">
      <Table className="min-w-full table-auto bg-white">
        <TableHeader>
          <TableRow className="bg-orange-500">
            <TableHead className="px-4 py-2 text-sm font-medium text-white">Tipo de Cultura</TableHead>
            <TableHead className="px-4 py-2 text-sm font-medium text-white">ID da Cultura</TableHead>
            <TableHead className="px-4 py-2 text-sm font-medium text-white">Produtos</TableHead>
            <TableHead className="px-4 py-2 text-sm font-medium text-white">Preço P/Unidade (Agriculture)</TableHead>
            <TableHead className="px-4 py-2 text-sm font-medium text-white">Preço P/Unidade (Produtos)</TableHead>
            <TableHead className="px-4 py-2 text-sm font-medium text-white">Quantidade</TableHead>
            <TableHead className="px-4 py-2 text-sm font-medium text-white">Quantidade de Produtos</TableHead>
            <TableHead className="px-4 py-2 text-sm font-medium text-white">Gasto Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cultures.map((culture, index) => {
            const agriculture = agricultures.find(a => a.tipo === culture.agricultureid);
            const needsList = needs[culture.agricultureid] || [];
            const totalCost = calculateTotalCost(agriculture, culture.qtd, needsList);
            const productsDetails = needsList
              .map(need => {
                const product = products.find(p => p.id === need.productId);
                return product ? `${product.nome} (R$ ${product.preco.toFixed(2)})` : "N/A";
              })
              .join(', ');

            return (
              <TableRow key={culture.id} className={index % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}>
                <TableCell className="px-4 py-2 text-sm text-black">{agriculture?.nome || 'N/A'}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-black">{culture.id}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-black">{productsDetails || 'N/A'}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-black">R$ {agriculture?.valor_unid?.toFixed(2) || 'N/A'}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-black">
                  {needsList.map(need => {
                    const product = products.find(p => p.id === need.productId);
                    return product ? `R$ ${product.preco.toFixed(2)}` : "N/A";
                  }).join(', ')}
                </TableCell>
                <TableCell className="px-4 py-2 text-sm text-black">{culture.qtd}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-black">{needsList.map(need => (need.qtd * culture.qtd)).join(', ')}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-black">R$ {totalCost.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
