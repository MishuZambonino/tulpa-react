import { fireStore as db } from "../config";
db.settings({ timestampsInSnapshots: true });
const OcupationRef = db.collection("ocupation");
export const addOcupation = (params) => {
  return OcupationRef.add(OcupationRef.add(params));
};
