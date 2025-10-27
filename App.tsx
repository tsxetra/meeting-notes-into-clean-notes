import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { NotesInput } from './components/NotesInput';
import { SummaryOutput } from './components/SummaryOutput';
import { condenseMeetingNotes } from './services/geminiService';
import type { CondensedNotes } from './types';

function App() {
  const [notes, setNotes] = useState<string>('');
  const [result, setResult] = useState<CondensedNotes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCondense = useCallback(async () => {
    if (!notes.trim()) {
      setError('Please provide your notes before summarizing.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const condensedResult = await condenseMeetingNotes(notes);
      setResult(condensedResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to summarize notes. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [notes]);

  return (
    <div className="min-h-screen bg-parchment text-charcoal font-sans">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <NotesInput
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onCondense={handleCondense}
            isLoading={isLoading}
          />
          <SummaryOutput
            result={result}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <footer className="text-center py-6 text-charcoal/50 text-sm">
        <p>Crafted with intelligence.</p>
      </footer>
    </div>
  );
}

export default App;