import { FaTimes, FaPen, FaRegCircle } from 'react-icons/fa';
import { memo } from 'react';

function Icons({ name }) {
   if (name == "Circle")
      return <FaRegCircle size={30} />
   else if (name == "cross") {
      return <FaTimes size={30} />

   }
   else {
      return <FaPen size={[30]} />
   }
}


export default memo(Icons);