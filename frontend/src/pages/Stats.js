import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { StatsContainer, Loading } from '../components';

const Stats = () => {
  const { showStats, isLoading, monthlyIssues } = useAppContext();
  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {/* ChartsContainer goes here */}
    </>
  );
};

export default Stats;
