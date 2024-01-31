import {
  Download,
  DownloadSimple,
  FloppyDisk,
  Pause,
  Play,
  VideoCameraSlash,
} from 'phosphor-react'
import { useEffect, useState } from 'react'
import {
  Container,
  Header,
  Inform,
  ListZero,
  Main,
  PlayList,
  Status,
  VideoView,
} from './style'

export function Recording() {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>()
  const [mediaList, setMediaList] = useState<string[]>([])
  const [recCount, setRecCount] = useState(0)

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.addEventListener('dataavailable', (e) => {
        const uri = URL.createObjectURL(e.data)
        setVideoUrl(uri)
      })

      mediaRecorder.addEventListener('stop', () => {
        setMediaRecorder(null)
        setIsRecording(false)
        setRecCount((pre) => pre + 1)
      })
    }
  }, [mediaRecorder, isRecording])

  async function rec() {
    if (!isRecording && navigator.mediaDevices) {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })

      const mediaRecorder = new MediaRecorder(stream)
      setMediaRecorder(mediaRecorder)

      mediaRecorder.start()
      setIsRecording(true)
    }
  }

  async function stop() {
    if (isRecording) {
      mediaRecorder?.stop()
    }
  }

  function addToList() {
    if (videoUrl && recCount <= 5) {
      setMediaList([...mediaList, videoUrl])
      setVideoUrl(null)
    }

    if (recCount >= 5) {
      alert('Não é possível salvar mais de 5 gravações')
    }
  }

  return (
    <Container>
      <Header>
        {isRecording === false ? (
          <>
            <button onClick={rec} title="Gravar tela">
              <Play
                size={24}
                color="#ecf0f1"
                alt="botão vermelho de play para poder gravar a tela"
              />
            </button>
          </>
        ) : (
          <button onClick={stop} title="Para gravação">
            <Pause
              size={24}
              color="#ecf0f1"
              alt="botão para poder para a gravação"
            />
          </button>
        )}

        {recCount > 0 && (
          <button onClick={addToList} title="Salvar gravação">
            <FloppyDisk
              size={24}
              color="#ecf0f1"
              alt="botão para poder salvar a gravação"
            />
          </button>
        )}
      </Header>

      <Main>
        {videoUrl && (
          <VideoView>
            <video src={videoUrl} controls width={'400px'}></video>
            <a
              href={videoUrl}
              download={'video.mp4'}
              title="Downlaod sem salvar"
            >
              <DownloadSimple
                size={32}
                color="#ecf0f1"
                alt="Botão para fazer downlaod antes de precisar adicionar a gravação na lista"
              />
            </a>
          </VideoView>
        )}

        {recCount > 0 ? (
          <PlayList>
            <Status>
              <span>List</span>

              <span>{recCount} de 5</span>
            </Status>

            <ul>
              {mediaList.map((item, index) => (
                <li key={index}>
                  <video src={item} controls></video>
                  <a
                    href={item}
                    download={`video_${index + 1}.mp4`}
                    title="Download vídeo"
                  >
                    <Download
                      size={24}
                      color="#ecf0f1"
                      alt="Botão para fazer o download do vídeo da gravação desejado, na lista de gravações"
                    />{' '}
                    Vídeo {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </PlayList>
        ) : (
          <ListZero>
            <Inform>
              <span>Sua lista de gração está vazia</span>
              <p>Grave um vídeo e adicione a lista.</p>
            </Inform>

            <VideoCameraSlash
              size={32}
              color="#424949"
              alt="Imagem que notifica que não possui nenhum vídeo na lista de gravações"
            />
          </ListZero>
        )}
      </Main>
    </Container>
  )
}
