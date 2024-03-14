import { FC, useEffect, useRef } from "react";
interface Props {
  openModal: boolean;
  children: React.ReactNode;
  closeModal:React.Dispatch<React.SetStateAction<boolean>>
}
export const ModalDialog: FC<Props> = ({openModal, children, closeModal}) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal && ref.current) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [ openModal ]);

  return (
    <dialog
      className="dialog"
      ref={ref}
      onCancel={() =>closeModal}
    >
      {children}
      <button className="currency-button" onClick={() =>closeModal(false)}>
        Close
      </button>
    </dialog>
  );
}