import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Issue from './Issue';
import styled from 'styled-components';

const IssuesContainer = () => {
  const { getIssues, issues, isLoading, page, totalIssues } = useAppContext();
  useEffect(() => {
    getIssues();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  if (issues.length === 0) {
    return (
      <Wrapper>
        <h2>No issues to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalIssues} issue{issues.length > 1 && 's'} found
      </h5>
      <div className='issues'>
        {issues.map((issue) => {
          return <Issue key={issue._id} {...issue} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default IssuesContainer;