import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import { useUser } from "../authentication/useUser";

function AddCabin() {
  const { isDemoVisitor } = useUser();
  if (isDemoVisitor) return null;
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button
//         onClick={() => setIsOpenModal((show) => !show)}
//       >
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm
//             onCloseModal={() => setIsOpenModal(false)}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
