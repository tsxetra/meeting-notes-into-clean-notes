import React from 'react';
import { Button } from './Button';

interface NotesInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCondense: () => void;
  isLoading: boolean;
}

const QuillIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
    </svg>
);


export const NotesInput: React.FC<NotesInputProps> = ({ value, onChange, onCondense, isLoading }) => {
  return (
    <div className="bg-paper/50 p-6 rounded-sm border border-charcoal/10 shadow-sm h-full flex flex-col">
      <h2 className="text-2xl font-serif text-charcoal mb-4">Raw Notes</h2>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Paste your meeting notes, brainstorming scribbles, or any unstructured text here...&#10;&#10;e.g.&#10;- John to research Q3 budget variance&#10;- Marketing campaign ideas: discussed social media push. Sarah to draft proposal.&#10;- Consensus on moving to bi-weekly sprints."
        className="flex-grow w-full p-4 bg-paper border border-charcoal/15 rounded-sm focus:ring-2 focus:ring-burgundy/50 focus:border-burgundy/50 focus:outline-none transition-shadow duration-200 text-ink resize-none min-h-[300px] lg:min-h-[400px] font-sans"
        disabled={isLoading}
      />
      <div className="mt-6">
        <Button onClick={onCondense} disabled={isLoading || !value} className="w-full">
          <QuillIcon className="w-5 h-5 mr-2"/>
          {isLoading ? 'Transcribing...' : 'Transcribe & Summarize'}
        </Button>
      </div>
    </div>
  );
};