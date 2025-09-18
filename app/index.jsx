import { useEffect } from "react";
import { useRouter } from "expo-router";
import { auth } from "../config/firebase";


export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/tasks");
      } else {
        router.replace("/login");
      }
    });
    return unsubscribe;
  }, []);

  return null;
}
