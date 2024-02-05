import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type Props = {
  open: boolean;
};
function BoxInformation({ open }: Props) {
  const [show, setShow] = useState(open);
  const handleClose = () => setShow(false);
  useEffect(() => {
    setShow(open);
  }, [open]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header  >
          <Modal.Title >مرحبا بك في مجتمعنا</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-end text-break">
          يسعدنا إضافة اسم عمل جديد في موقعنا <br /> من فضلك لا تقلق لأن اسمك لا يزال
          غير مرئي في محرك البحث حتى يقبل المسؤول اسم عملك ويضيفه إلى القائمة
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="warning"   onClick={handleClose}>
          انتقل إلى الملف الشخصي
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BoxInformation;
