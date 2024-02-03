import React from 'react'
import { Socket,io } from 'socket.io-client'
export const socket = io("http://localhost:5000", {
  forceNew: true,
  autoConnect: true,
});
const App = () => {
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('event', 'message');
    })
  },[])
  return (
    <div>
      <h2>Hello</h2>
    </div>
  )
}

export default App
