import { AuthErrorCodes } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../services/firebase";
import { generateData } from "./utils";

export async function getTasks(uid: string | undefined) {
  if (!uid) {
    throw new Error(AuthErrorCodes.USER_DELETED);
  }
  const querySnapshot = await getDocs(
    collection(firestore, `users/${uid}/tasks`)
  );
  const data: any[] = [];
  for (const doc of querySnapshot.docs) {
    data.push({ id: doc.id, ...doc.data() });
  }
  const tasks = generateData(data);
  return tasks;
}
