import { fireStore as db } from "../config";
db.settings({ timestampsInSnapshots: true });
const CountryRef = db.collection("country");
export const addCountry = (params, id) => {
  return CountryRef.doc(id).set(params);
};
export const getAllCountries = () => {
  return CountryRef.get();
};
export const listenCountries = (callbackFunction) => {
  return CountryRef.onSnapshot(callbackFunction);
};
