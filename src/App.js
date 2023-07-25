import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import FaceRecognition from './components/face-recognition/FaceRecognition';
import Rank from './components/rank/Rank';
import ParticlesBg from 'particles-bg'
import { useState } from 'react';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '15d8ffc4b270474ca47a2f82397c046f'
});

function App() {
  const [input, setInput] = useState('');

  const onInputChange = (event) => {
    console.log(event.target.value);
  }

  const onButtonSubmit = () => {
    console.log('click');
    app.models.predict("15d8ffc4b270474ca47a2f82397c046f", "https://www.freecodecamp.org/news/content/images/2022/02/arrows-2889040_1920.jpg").then(
      function(response) {
        console.log(response);
      },
      function(err) {

      }
    );
  }

  return (
    <div className="App">
      <ParticlesBg color="#FFFFFF" num={80} type="cobweb" bg={true} />
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
      <FaceRecognition/>
    </div>
  );
}

export default App;
