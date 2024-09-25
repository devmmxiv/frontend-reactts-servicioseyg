import React, { useEffect, useRef, useState } from 'react'

const Modaltest = ({isVisible,toggleModal}) => {
   // const [isVisible, setIsVisible] = useState(false);
    const closeModal = () => {
    //  setIsVisible(false);
    };
    
    /*const toggleModal = () => {
      setIsVisible(!isVisible);
    };*/
    const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
     // setIsVisible(false);
     toggleModal()
    }
  };
  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <>
  <div
    className="modal-backdrop"
    style={{ display: isVisible ? 'inline-block' : 'none' }}
    ref={modalRef}
    aria-modal="true"
    aria-hidden={!isVisible}
  >
    <div className="modal-content" role="dialog" aria-labelledby="modalTitle">
      <h2 id="modalTitle">Modal Title</h2>
      {/* Modal Body Here */}
    </div>
  </div>
    </>
  )
}

export default Modaltest
