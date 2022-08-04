import { useAppContext } from '../context/appContext';
import StatItem from './StatItem';
import { FaSpinner, FaCog, FaBug } from 'react-icons/fa';
import styled from 'styled-components';

const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: 'pending issues',
      count: stats.pending || 0,
      icon: <FaSpinner />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'In Process',
      count: stats.processing || 0,
      icon: <FaCog />,
      color: '#16b369',
      bcg: '#e0e8f9',
    },
    {
      title: 'Issues Declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;

export default StatsContainer;
