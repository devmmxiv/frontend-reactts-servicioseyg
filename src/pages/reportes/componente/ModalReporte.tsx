import React from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
interface props {
    show: boolean
    url:string,
    titulo:string,
    idModal:string
}
const ModalReporte = ({ show ,url,titulo,idModal}: props) => {
      const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div >

            <div className="modal fade" id={idModal} data-bs-keyboard="true" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{titulo}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {show && 
                            (
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">

                                    <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />;
                                </Worker>
                            )}
                        </div>
                        <div className="modal-footer">
                                <button type="button"  className="btn btn-secondary" 
                                data-bs-dismiss="modal" 
                             >Cerrar</button>
                       
                            </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ModalReporte
