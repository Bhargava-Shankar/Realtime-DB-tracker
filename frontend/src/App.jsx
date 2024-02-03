import React, { useEffect,useState } from 'react'
import { Socket,io } from 'socket.io-client'
export const socket = io("http://localhost:3000", {
  forceNew: true,
  autoConnect: true,
});
const App = () => {

  const [list, setList] = useState([]);

  const listenToSocket = () => {
    socket.on('connect', () => {
      //receiving data only while if there any change in DB
      //IMPORTANT: CALLBACK FROM OF SET STATE
      socket.on('msg', (data) => {

        console.log(data.fullDocument);
        console.log(list);
        // console.log([...list, data.fullDocument]);
        console.log("CHANGE IN DATABASE");
        // const obj = JSON.parse(data);
        setList((list) => [...list, data.fullDocument]);
        // console.log([...list, obj.fullDocument]);
      })
    })
  }

  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:5000/get-all", {
        method: "GET",
        headers: {
          accept: "application/json"
        }
      }).then((res) => res.json()).then((data) => {
        console.log("INSIDE FETCH");
        setList((list) => {
          return [...data];
        });
      });
    }
    fetchData();
    listenToSocket();
    // socket.on('connect', () => {
    //   //receiving data only while if there any change in DB
    //   const data = socket.on('msg', (data) => {
    //     const obj = JSON.parse(data);
    //     // setList([...list, obj.fullDocument]);
    //     console.log([...list,obj.fullDocument]);
    //   })
    // })
  },[])
  return (
    <div>
      <h2>Hello</h2>
      <ul>
        {
          list.map((value) => {
            return (
              <li key = {value._id}>{ JSON.stringify(value) }</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App
