import { AppContainer, GlobalStyles } from './AppStyle'
import { Recording } from './page/Rec'

function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Recording />
      </AppContainer>
    </>
  )
}

export default App
