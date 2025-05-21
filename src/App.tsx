import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import DownloaderCard from './components/DownloaderCard';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <DownloaderCard />
      </Layout>
    </ThemeProvider>
  );
}

export default App;