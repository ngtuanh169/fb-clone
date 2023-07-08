function Modal({ children, closeModal, bgModal = true }) {
    return (
        <>
            <div
                className={`fixed flex top-0 left-0 w-screen h-screen ${
                    bgModal ? "bg-bgModal" : ""
                } z-[99]`}
                onClick={(e) => {
                    closeModal();
                }}
            >
                {children}
            </div>
        </>
    );
}

export default Modal;
