import { fireStore as db } from "../config";
db.settings({ timestampsInSnapshots: true });
const UniversityRef = db.collection("university");
export const addUniversity = (params, id) => {
  return UniversityRef.doc(id).set(params);
};
export const getAllUniversities = () => {
  return UniversityRef.get();
};
export const listenUniversities = (callbackFunction) => {
  return UniversityRef.onSnapshot(callbackFunction);
};
