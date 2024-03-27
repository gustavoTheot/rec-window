import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ContainerPrinciapl = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  margin-top: 2rem;
  margin-bottom: 2rem;

  img {
    transition: transform 0.5s ease-in;
    &:hover {
      transform: rotate(360deg);
    }
  }
`

export const Main = styled.main`
  width: 45rem;
  height: 37rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  display: flex;
  justify-content: center;
  align-items: center;
`
export const Aside = styled.aside`
  width: 23rem;

  height: 37rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

export const ContainerVideo = styled.div`
  width: 40rem;
  height: 32rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

export const VideoView = styled.div`
  video {
    width: 100%;
    height: 27rem;
    border-radius: 8px;
  }
`

export const Informations = styled.div`
  height: 27rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: #656565;

  svg {
    color: #6e8097;
  }
`
export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;

    svg {
      color: #66798f;
    }

    transition: 0.1s ease-in;

    &:hover {
      transform: scale(1.2);

      svg {
        color: #a3b7cc;
      }
    }
  }
`
export const PlayList = styled.div`
  padding: 2rem;
  ul {
    margin-top: 1rem;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      list-style: none;

      video {
        width: 7rem;
        height: 4rem;
        border-radius: 8px;
      }

      a {
        display: flex;
        align-items: center;
        gap: 1rem;
        text-decoration: none;
        color: black;
      }

      &:hover {
        border-radius: 8px;
        background-color: #f2faff;
      }
    }
  }
`
export const Status = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const InformList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  margin-top: 3.2rem;
`
export const Footer = styled.footer`
  width: 100%;

  display: flex;
  justify-content: center;

  position: fixed;
  bottom: 0;
  margin-bottom: 2rem;

  span {
    color: #a3b7cc;
  }
`
