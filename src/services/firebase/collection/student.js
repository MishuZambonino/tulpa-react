import { fireStore as db } from "../config";
db.settings({ timestampsInSnapshots: true });
const StudentRef = db.collection("student");
export const addStudent = (params, id) => {
  return StudentRef.doc(id).set(params);
};
export const getAllStudents = () => {
  return StudentRef.get();
};
export const listenStudents = (callbackFunction) => {
  return StudentRef.onSnapshot(callbackFunction);
};
