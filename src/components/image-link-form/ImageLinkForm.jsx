import './imageLinkForm.scss';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div className='LinkFormContainer'>

        <p>
            {'SharpTech will detect celebrity faces in your pictures. Give it a try!'}
        </p>

        <div className='InputContainer'>
          <input type='text' placeholder='Enter the image link' onChange={onInputChange}/>
          <button onClick={onButtonSubmit}>Detect</button>
        </div>

    </div>
  )
}

export default ImageLinkForm