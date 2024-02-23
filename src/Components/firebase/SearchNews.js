import { initializeApp   } from "firebase/app";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import { FIREBASE_API_KEY } from "../../exports";

const firebaseApp = initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: "price-spotter-fd615.firebaseapp.com",
    projectId: "price-spotter-fd615",
    storageBucket: "price-spotter-fd615.appspot.com",
    messagingSenderId: "638666359454",
    appId: "1:638666359454:web:4d7fbf489b7d51c7e0718f"
});

export async function SearchGameNews(iduser){

    const db = getFirestore(firebaseApp);
    var collectionUser = 'gameNews'
    const userCollection = collection(db, collectionUser);

    const data = await getDocs(userCollection);
    var InfoUser = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    var i = 0
    while(i < data.docs.map((doc) => ({...doc.data(), id: doc.id})).length){
        if(iduser === data.docs.map((doc) => ({...doc.data(), id: doc.id}))[i].id){
        InfoUser = data.docs.map((doc) => ({...doc.data(), id: doc.id}))[i]
        }
        i++
    }
    
    return InfoUser
    
} 