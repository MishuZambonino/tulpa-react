import { fireStore as db } from "../config";
db.settings({ timestampsInSnapshots: true });
const UsersRef = db.collection("user");
export const addUser = (params) => {
  return UsersRef.add(UsersRef.add(params));
};
