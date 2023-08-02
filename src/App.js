import './App.css';
import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import FaceRecognition from './components/face-recognition/FaceRecognition';
import Rank from './components/rank/Rank';
import ParticlesBg from 'particles-bg'
import { useState } from 'react';
import SignIn from './components/sign-in/SignIn';
import Register from './components/register/Register';

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = process.env.CLARIFAI_KEY;
  // Specify the correct user_id/app_id pairings
  const USER_ID = "yerda";
  const APP_ID = "ai-recognition";
  // Change these to whatever model and image URL you want to use
  // const MODEL_ID = "face-detection";
  const IMAGE_URL = imageUrl;

  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
}



function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignIn] = useState(false);
  const [celebrity, setCelebrity] = useState('');
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    })
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
      
    }
  };

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);

    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(input))
      .then(response => response.json())
      .then( response => {
        if (response) {
          fetch('https://sharptechbackend.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          }).then(res => res.json())
          .then(count => {
            setUser({
              ...user,
              entries: count
            })
          }).catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch(error => console.log(error));

    fetch("https://api.clarifai.com/v2/models/celebrity-face-recognition/outputs", returnClarifaiRequestOptions(input))
    .then(response => response.json())
    .then(data=> data.outputs[0].data.concepts[0].name + ', ' + data.outputs[0].data.concepts[0].value.toPrecision(2)*100 + '% - probability')
    .then(name => setCelebrity(name))
    .catch(error => console.log(error));
  }

  const onRouteChange = (route) => {
    if(route === 'signout') {
      setIsSignIn(false);
      setImageUrl('');
      setCelebrity('');
    } else if(route === 'home') {
      setIsSignIn(true);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
      {route === 'home' 
        ? <div>
            <ParticlesBg color="#ffffff" num={40} type="cobweb" bg={true}/>
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
            <FaceRecognition celebrity={celebrity} box={box} imageUrl={imageUrl}/>
          </div>
        : (route === 'signin'
            ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange}/>
            : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
          )
      }
    </div>
  );
}

export default App;
