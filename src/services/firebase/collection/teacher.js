import { fireStore as db } from "../config";
db.settings({ timestampsInSnapshots: true });
const TeacherRef = db.collection("teacher");
export const addTeacher = (params, id) => {
  return TeacherRef.doc(id).set(params);
};
export const getAllTeachers = () => {
  return TeacherRef.get();
};
export const listenTeachers = (callbackFunction) => {
  return TeacherRef.onSnapshot(callbackFunction);
};
