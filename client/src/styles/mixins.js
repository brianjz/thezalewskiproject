import { css } from 'styled-components';

const button = css`
  color: var(--green);
  background-color: transparent;
  border: 1px solid var(--green);
  border-radius: var(--border-radius);
  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  padding: 1.25rem 1.75rem;

  &:hover,
  &:focus,
  &:active {
    background-color: var(--green-tint);
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    &:hover,
    &:active,
    &:focus {
      color: var(--blue);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: var(--transition);
    color: var(--dark-blue);
    &:hover,
    &:focus,
    &:active {
      color: var(--white);
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--white) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 2px;
      position: relative;
      bottom: 0.05em;
      background-color: var(--white);
      transition: var(--transition);
      opacity: 0.9;
    }
  `,

  alertBox: css`
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    padding: 1rem;
    position: relative;

    &.info {
      background-color: var(--lower-blue);
      color: white;
    }
    &.primary {
      background-color: var(--primary);
      color: white;
    }
  `,

  mainButtons: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 1fr;
    grid-gap: 1.5rem;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(30vw, 1fr));
    }

    .button {
      @media (max-width: 2768px) {
        display: flex;
      }
      a {
          display: block;
          background-color: var(--secondary);
          padding: 20px;
          border-radius: var(--border-radius-button);
          border: 1px solid black;
          text-decoration: none;
          color: white;
          text-align: center;
          width: 100%;

          box-shadow: 0px 2px 10px var(--navy-shadow);
          transition: var(--transition);

        &:hover,
        &:focus {
          box-shadow: 0px 8px 10px var(--navy-shadow);
        }
      }
    }
  `,

  button,
  smallButton: css`
    color: var(--green);
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: var(--green-tint);
      outline: none;
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: var(--green);
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 1.25rem 1.75rem;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: var(--green-tint);
      outline: none;
    }
    &:after {
      display: none !important;
    }
  `,

  alwaysBoxShadow: css`
    box-shadow: 0px 2px 10px var(--navy-shadow);
    transition: var(--transition);

  &:hover,
  &:focus {
    box-shadow: 0px 8px 10px var(--navy-shadow);
  }
  `,

  boxShadow: css`
    box-shadow: 0 var(--navy-shadow);
    transition: var(--transition);

    &:hover,
    &:focus {
      box-shadow: 0px 8px 10px var(--navy-shadow);
    }
  `,

  boxGlow: css`
    box-shadow: 0 10px 20px -15px var(--white-glow);
    transition: var(--transition);

    &:hover,
    &:focus {
      box-shadow: 0 20px 20px -15px var(--white-glow);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
