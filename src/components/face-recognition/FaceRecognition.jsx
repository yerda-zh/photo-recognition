import './faceRecognition.scss';
import { DotWave } from '@uiball/loaders';

const FaceRecognition = ({box, imageUrl, celebrity, fetching, calculated}) => {
  return (
    <div className='FaceRecognitionDiv'>
      <div className="FaceRecognitionContainer">
        <p>{fetching ? <DotWave size={45} speed={1} color="white" /> : celebrity}</p>
        <div className="FaceDiv">
          <img
            id="inputimage"
            alt="celebrity"
            src={imageUrl}
          />
          {calculated && <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>}
        </div>
      </div>
    </div>
      
  );
}

export default FaceRecognition