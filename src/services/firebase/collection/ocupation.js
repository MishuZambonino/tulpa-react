import { fireStore as db } from "../config";
db.settings({ timestampsInSnapshots: true });
const OcupationRef = db.collection("ocupation");
export const addOcupation = (params) => {
  return OcupationRef.add(OcupationRef.add(params));
};
export const getAllOcupations = () => {
  return OcupationRef.get();
};
