import './faceRecognition.scss';

const FaceRecognition = ({box, imageUrl, celebrity}) => {
  return (
    <div className='FaceRecognitionDiv'>
      <div className="FaceRecognitionContainer">
        <p>{celebrity}</p>
        <div className="FaceDiv">
          <img
            id="inputimage"
            alt=""
            src={imageUrl}
          />
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          >
          </div>
        </div>
      </div>
    </div>
      
  );
}

export default FaceRecognition