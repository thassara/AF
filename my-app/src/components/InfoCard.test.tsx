// src/components/InfoCard.test.tsx
import { render, screen } from '@testing-library/react';
import { InfoCard } from './InfoCard';
import { Globe } from 'lucide-react';

test('renders InfoCard with title and value', () => {
  render(<InfoCard title="Region" value="Asia" icon={<Globe />} gradient="bg-blue-200" />);
  expect(screen.getByText('Region')).toBeInTheDocument();
  expect(screen.getByText('Asia')).toBeInTheDocument();
});
