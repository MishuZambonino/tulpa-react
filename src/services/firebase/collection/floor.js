import { fireStore as db } from "../config";
db.settings({ timestampsInSnapshots: true });
const FloorRef = db.collection("floor");
export const addFloor = (params, id) => {
  return FloorRef.doc(id).set(params);
};
export const getAllFloors = () => {
  return FloorRef.get();
};
export const listenFloors = (callbackFunction) => {
  return FloorRef.onSnapshot(callbackFunction);
};
