import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActionCenterPage } from './pages/ActionCenterPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ActionCenterPage />
    </QueryClientProvider>
  );
};

export default App;
