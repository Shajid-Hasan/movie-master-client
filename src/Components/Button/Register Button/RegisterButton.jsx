import React from 'react';
import styled from 'styled-components';

const RegisterButton = () => {
  return (
    <StyledWrapper>
      <button className="ui-btn">
        <span className='text-2xl mr-3'>
          Register
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .ui-btn {
    --btn-default-bg: rgb(41, 41, 41);
    --btn-padding: 15px 20px;
    --btn-hover-bg: rgb(51, 51, 51);
    --btn-transition: .3s;
    --btn-letter-spacing: .1rem;
    --btn-animation-duration: 1.2s;
    --btn-shadow-color: rgba(0, 0, 0, 0.137);
    --btn-shadow: 0 2px 10px 0 var(--btn-shadow-color);
    --hover-btn-color: #B22222; /* 🔥 Blood Red */
    --default-btn-color: #fff;
    --font-size: 16px;
    --font-weight: 600;
    --font-family: Menlo,Roboto Mono,monospace;
  }

  .ui-btn {
    box-sizing: border-box;
    padding: var(--btn-padding);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--default-btn-color);
    font: var(--font-weight) var(--font-size) var(--font-family);
    background: var(--btn-default-bg);
    border: none;
    cursor: pointer;
    transition: var(--btn-transition);
    overflow: hidden;
    box-shadow: var(--btn-shadow);
  }

  .ui-btn span {
    letter-spacing: var(--btn-letter-spacing);
    transition: var(--btn-transition);
    box-sizing: border-box;
    position: relative;
    background: inherit;
  }

  .ui-btn span::before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    background: inherit;
  }

  .ui-btn:hover, .ui-btn:focus {
    background: var(--btn-hover-bg);
  }

  .ui-btn:hover span, .ui-btn:focus span {
    color: var(--hover-btn-color); /* 🔥 Text changes to blood red */
  }

  .ui-btn:hover span::before, .ui-btn:focus span::before {
    animation: chitchat linear both var(--btn-animation-duration);
  }

  @keyframes chitchat {
    0% { content: "#"; }
    5% { content: "."; }
    10% { content: "^{"; }
    15% { content: "-!"; }
    20% { content: "#$_"; }
    25% { content: "№:0"; }
    30% { content: "#{+."; }
    35% { content: "@}-?"; }
    40% { content: "?{4@%"; }
    45% { content: "=.,^!"; }
    50% { content: "?2@%"; }
    55% { content: "\;1}]"; }
    60% { content: "?{%:%"; right: 0; }
    65% { content: "|{f[4"; right: 0; }
    70% { content: "{4%0%"; right: 0; }
    75% { content: "'1_0<"; right: 0; }
    80% { content: "{0%"; right: 0; }
    85% { content: "]>'"; right: 0; }
    90% { content: "4"; right: 0; }
    95% { content: "2"; right: 0; }
    100% { content: ""; right: 0; }
  }

  /* RESPONSIVE STYLES */
  @media (max-width: 1024px) { /* Tablet */
    .ui-btn {
      padding: 12px 16px;
    }
    .ui-btn span {
      font-size: 1.5rem; /* slightly smaller on tablet */
    }
  }

  @media (max-width: 768px) { /* Large Mobile */
    .ui-btn {
      padding: 10px 14px;
    }
    .ui-btn span {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 480px) { /* Small Mobile */
    .ui-btn {
      padding: 8px 12px;
    }
    .ui-btn span {
      font-size: 1.1rem;
    }
  }
`;

export default RegisterButton;
