import { fireStore as db } from "../config";
db.settings({ timestampsInSnapshots: true });
const OcupationRef = db.collection("ocupation");
export const addOcupation = (params, id) => {
  return OcupationRef.doc(id).set(params);
};
export const getAllOcupations = () => {
  return OcupationRef.get();
};
export const listenOcupations = (callbackFunction) => {
  return OcupationRef.onSnapshot(callbackFunction);
};
