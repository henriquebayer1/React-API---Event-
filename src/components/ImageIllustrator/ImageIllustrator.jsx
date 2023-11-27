import React from 'react';
import './ImageIllustrator.css'
import tipoEventoImage from '../../assets/images/tipo-evento.svg'
import eventoImage from '../../assets/images/evento.svg'
import defaultImage from '../../assets/images/default-image.jpeg'

const ImageIllustrator = ({alteText, imageName, addClass}) => {


     let imageResource;

    switch (imageName) {
        case 'tipo-evento':
            imageResource = tipoEventoImage
            break;
        case 'evento':
            imageResource = eventoImage
            break;
    
        default:
            imageResource = defaultImage
            break;
    }



    return (
        <figure className='illustrator-box'>

            <img src={imageResource} 
            alt={alteText}
            className={`illustrator-box__image ${addClass}`} 
            />

        </figure>
    );
};

export default ImageIllustrator;