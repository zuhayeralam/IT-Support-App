import { Link } from 'react-router-dom';
import main from '../images/Landing image.svg';
import styled from 'styled-components';

import { Logo } from '../components';
function Landing() {
  return (
    <>
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1>
              IT
              <span> Support </span>
              app
            </h1>

            <p>
              IT issue/ticketing app. Add issues and update status. View
              statistics of issues.
            </p>

            <Link to='/register' className='btn btn-hero'>
              Login / Register
            </Link>
          </div>
          <img src={main} alt='It issues list' className='img main-img' />
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .container {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
