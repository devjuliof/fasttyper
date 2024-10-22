'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const ResultComponent = () => {
  const searchParams = useSearchParams();
  const wpm = searchParams.get('wpm');
  const duration = searchParams.get('duration');

  return (
    <div>
      <h1>Resultados</h1>
      <p>Palavras por minuto: {wpm}</p>
      <p>Duração: {duration} segundos</p>
    </div>
  );
};

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResultComponent />
    </Suspense>
  );
}
