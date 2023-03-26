import styled from 'styled-components';
import { ProgressBar } from 'react-loader-spinner'

export const PendingView = () => {
  return (
    <>
      <Spinner>
        <ProgressBar
          height="200"
          width="200"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      </Spinner>
    </>
  );
};

const Spinner = styled.div`

`;
