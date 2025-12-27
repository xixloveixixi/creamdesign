import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [title, setTitle] = useState('Hello World');
  // 发送axios请求
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        console.log(response.data);
        setTitle(response.data.title);
      })
      .catch(error => {
        console.error('Error fetching title:', error);
      });
  }, []);
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

export default App;
