import React from 'react'


const App = () => {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const getMockMessage = async () => {
      const response = await fetch('/check')
      const responseJson = await response.json()
      setMsg(responseJson.message);
    }

    getMockMessage()
  }, [])

  return (
    <div styles={{ backgroudStyle: '#553423', height: '50px' }}>
        This is header
    </div>
  );
}

export default App;
