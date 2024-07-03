import React, { useEffect, useRef, useState } from 'react';
import LeftSlifBar from '../../Componets/LeftSlidBar/LeftSlifBar'
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './VideoCall.css'
import { faVideo, faPhone, faMicrophone, faStop, faDesktop } from '@fortawesome/free-solid-svg-icons'; 

const socket = io('http://localhost:4000');

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isWithinCallTime, setIsWithinCallTime] = useState(true);
  const [callActive, setCallActive] = useState(false);

  useEffect(() => {
    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('ice-candidate', handleIceCandidate);
    return () => {
      socket.off('offer', handleOffer);
      socket.off('answer', handleAnswer);
      socket.off('ice-candidate', handleIceCandidate);
    };
  }, [peerConnection]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    localVideoRef.current.srcObject = stream;

    const pc = new RTCPeerConnection();
    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    pc.ontrack = event => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('ice-candidate', { candidate: event.candidate });
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('offer', { offer });

    setPeerConnection(pc);
    setCallActive(true);
  };

  const stopCall = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
      setCallActive(false);
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    remoteVideoRef.current.srcObject = null;
    localVideoRef.current.srcObject = null;
  };

  const handleOffer = async ({ offer }) => {
    const pc = new RTCPeerConnection();
    setPeerConnection(pc);

    pc.ontrack = event => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('ice-candidate', { candidate: event.candidate });
      }
    };

    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    setLocalStream(stream);
    localVideoRef.current.srcObject = stream;

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit('answer', { answer });

    setCallActive(true);
  };

  const handleAnswer = async ({ answer }) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleIceCandidate = async ({ candidate }) => {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const shareScreen = async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    screenStream.getTracks().forEach(track => peerConnection.addTrack(track, screenStream));
  };

  const startRecording = () => {
    if (localStream) {
      const recorder = new MediaRecorder(localStream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recording.webm';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
      };

      recorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };
  return (
    <>
    <div className="conatienr_home_page">
      <LeftSlifBar/>
      <div className="conatienr_home_page_2">
      <div className="video-call-container">
      <h1>Video Call</h1>
      <div className="video-container">
        <video className='video_ref' ref={localVideoRef} autoPlay muted />
        <video className='video_ref' ref={remoteVideoRef} autoPlay />
      </div>
      <div className="controls">
        {callActive ? (
          <div className="control-button stop-icon" onClick={stopCall} disabled={!isWithinCallTime}>
            <FontAwesomeIcon icon={faStop} className="control-icon" title="Stop Call" />
          </div>
        ) : (
          <div className="control-button start-icon" onClick={startCall} disabled={!isWithinCallTime}>
            <FontAwesomeIcon icon={faVideo} className="control-icon" title="Start Call" />
          </div>
        )}
        <div className="control-button screen-share-icon" onClick={shareScreen} disabled={!isWithinCallTime || !callActive}>
          <FontAwesomeIcon icon={faDesktop} className="control-icon" title="Share Screen"/>
        </div>
        <div className="control-button record-icon" onClick={recording ? stopRecording : startRecording} disabled={!isWithinCallTime || !callActive}>
          <FontAwesomeIcon icon={recording ? faStop : faMicrophone} className="control-icon" title={recording ? 'Stop Recording' : 'Start Recording'}  />
        </div>
      </div>
    </div>
      </div>
    </div>
    </>
  )
}

export default VideoCall
