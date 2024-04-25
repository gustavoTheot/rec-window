import { useEffect, useRef, useState } from 'react'
import {
  Aside,
  Buttons,
  Container,
  ContainerPrinciapl,
  ContainerVideo,
  Footer,
  Header,
  InformList,
  Informations,
  Main,
  PlayList,
  Status,
  VideoView,
} from './style'

import iconObs from '../../assets/obs.svg'
import {
  Broom,
  DownloadSimple,
  FloppyDisk,
  Pause,
  Play,
  VideoCameraSlash,
} from '@phosphor-icons/react'

export function Recording() {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [realTimeStream, setRealTimeStream] = useState<MediaStream | null>(null)
  const realTimeVideoRef = useRef<HTMLVideoElement>(null)

  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [mediaList, setMediaList] = useState<string[]>([])

  useEffect(() => {
    if (mediaRecorder && realTimeVideoRef.current) {
      realTime()
    }
  }, [mediaRecorder, isRecording])

  async function rec() {
    if (!isRecording && navigator.mediaDevices) {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: 1920,
          height: 1080,
          frameRate: 30,
        },
        audio: true,
      })
      const options = { mimeType: 'video/webm' }

      const media = new MediaRecorder(stream, options)
      media.addEventListener('dataavailable', handleDataAvaliable)
      media.addEventListener('stop', handleMediaRecorderStop)
      media.start()

      setMediaRecorder(media)
      setIsRecording(true)
      setVideoUrl('')
    }
  }

  function handleDataAvaliable(e) {
    const uri = URL.createObjectURL(e.data)
    setVideoUrl(uri)
  }

  function handleMediaRecorderStop() {
    setIsRecording(false)
  }

  function stopRealTimeStream() {
    if (realTimeStream) {
      realTimeStream.getTracks().forEach((track) => {
        track.stop()
      })
      setRealTimeStream(null)
    }
  }

  function stopMediaRecord() {
    if (mediaRecorder) {
      mediaRecorder.stop()
      setMediaRecorder(null)
    }
  }

  function realTime() {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((mediaStream) => {
        if (realTimeVideoRef.current) {
          realTimeVideoRef.current.srcObject = mediaStream
          setRealTimeStream(mediaStream)

          mediaRecorder?.start()
        }
      })
  }

  async function stop() {
    if (isRecording) {
      stopMediaRecord()
      stopRealTimeStream()
    }
  }

  function addToList() {
    if (mediaList.length <= 5 && videoUrl !== null) {
      setMediaList([...mediaList, videoUrl])
      setVideoUrl(null)
    } else {
      alert('Não é possível salvar mais de 5 gravações')
    }
  }

  return (
    <Container>
      <Header>
        <img src={iconObs} alt="Icone OBS Studio" />
        <h3>OBS Web Studio</h3>
      </Header>

      <ContainerPrinciapl>
        <Main>
          <ContainerVideo>
            {isRecording && (
              <VideoView>
                <video ref={realTimeVideoRef} autoPlay muted></video>
              </VideoView>
            )}

            {videoUrl && (
              <VideoView>
                <video src={videoUrl} controls></video>
              </VideoView>
            )}

            {videoUrl === null && isRecording === false && (
              <Informations>
                <VideoCameraSlash
                  size={32}
                  color="#424949"
                  alt="Imagem que notifica que não possui nenhum vídeo na lista de gravações"
                />
                <div>
                  <span>De o play e começe gravar sua tela</span>
                </div>
              </Informations>
            )}

            <Buttons>
              {isRecording === false ? (
                <>
                  <button onClick={rec} title="Gravar tela">
                    <Play
                      size={24}
                      alt="botão vermelho de play para poder gravar a tela"
                    />
                  </button>
                </>
              ) : (
                <button onClick={stop} title="Para gravação">
                  <Pause size={24} alt="botão para poder para a gravação" />
                </button>
              )}

              {videoUrl !== null ? (
                <button onClick={addToList} title="Salvar gravação">
                  <FloppyDisk
                    size={24}
                    alt="botão para poder salvar a gravação"
                  />
                </button>
              ) : (
                ''
              )}
            </Buttons>
          </ContainerVideo>
        </Main>

        <Aside>
          {mediaList.length !== 0 ? (
            <PlayList>
              <Status>
                <span>Lista</span>

                <span>{mediaList.length} de 5</span>
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
                      Vídeo {index + 1}
                      <DownloadSimple
                        size={24}
                        alt="Botão para fazer o download do vídeo da gravação desejado, na lista de gravações"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </PlayList>
          ) : (
            <InformList>
              <Informations>
                <Broom
                  size={32}
                  color="#424949"
                  alt="Imagem que notifica que não possui nenhum vídeo na lista de gravações"
                />

                <div>
                  <span>Atualmente a lista está vazia</span>
                </div>
              </Informations>
            </InformList>
          )}
        </Aside>
      </ContainerPrinciapl>

      <Footer>
        <span>
          Author: Gustavo Theotonio do canal{' '}
          <a href="https://www.youtube.com/channel/UCcmc0yfcJR8LqYI-G2Ibg3w">
            {' '}
            Gustavo Theot
          </a>
        </span>
      </Footer>
    </Container>
  )
}
