import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, doc, getDoc} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyAIzxtK5umZtDRADhsGVz-E9yBa8r8mkkA",
  authDomain: "vanlife-29d04.firebaseapp.com",
  projectId: "vanlife-29d04",
  storageBucket: "vanlife-29d04.appspot.com",
  messagingSenderId: "826927685209",
  appId: "1:826927685209:web:e446f3c2e99e3c3da79b48"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vanCollectionRef = collection(db, "vans")

export async function getVans(id){
    const querySnapshot = await getDocs(vanCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(), 
        id: doc.id
    }) )

    return dataArr
}

export async function getVan(id){
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}


export async function getHostVans(id){
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if(!res.ok) {
        const errorObject = {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
        
        throw errorObject
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

