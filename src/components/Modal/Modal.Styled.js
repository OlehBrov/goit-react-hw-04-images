import styled from 'styled-components';

// export const modalStyled = styled.div`

// `;

export const ModalWindow = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(18, 17, 17, 0.3);
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
  top: 0vh;
  left: 0vw;
  /* bottom: 0;
  right: 0; */
  margin: 0 auto;
  z-index: 999;
  /* opacity: 0; */
  pointer-events: none;
  transition: all 0.3s;
  & > div {
    position: relative;
    display: flex;
    /* transform: translate(50%, 50%); */
    max-width: calc(100vw - 48px);
    max-height: calc(100vh - 24px);
    background-color: beige;
    border: 1px solid black;
  }
`;
