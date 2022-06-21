import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

const SharedLayout = () => {
  return (
    <Wrapper>
      <nav>
        <Link to='all-issues'>all issues</Link>
        <Link to='add-issue'>add issue</Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;

export default SharedLayout;
