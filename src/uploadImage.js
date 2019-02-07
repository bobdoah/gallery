import { firebaseApp } from "./firebase";
const uuidv4 = require("uuid/v4");

export default function(user, image) {
  const storage = firebaseApp.storage();
  var ext = image.fileName.split(".").pop();
  const ref = storage.ref(uuidv4() + "." + ext);
  var metadata = {
    contentType: image.contentType,
    customMetadata: {
      user: user.displayName,
      uid: user.uid
    }
  };
  return ref.put(image.file, metadata);
}
