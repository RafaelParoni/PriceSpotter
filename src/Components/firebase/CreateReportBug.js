// Banco de dados
import { initializeApp   } from "firebase/app";
import {collection, getDocs, getFirestore, setDoc, doc} from "firebase/firestore";
import { FIREBASE_API_KEY } from "../../exports";

const firebaseApp = initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: "price-spotter-fd615.firebaseapp.com",
    projectId: "price-spotter-fd615",
    storageBucket: "price-spotter-fd615.appspot.com",
    messagingSenderId: "638666359454",
    appId: "1:638666359454:web:4d7fbf489b7d51c7e0718f"
});


export async function createReportBug(newReport, idUser){

    const db = getFirestore(firebaseApp);
    var collectionUser = 'bugs'
    const userCollection = collection(db, collectionUser);

    const data = await getDocs(userCollection);
    var InfoUser = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    var i = 0
    while(i < data.docs.map((doc) => ({...doc.data(), id: doc.id})).length){
        if(idUser === data.docs.map((doc) => ({...doc.data(), id: doc.id}))[i].id){
            InfoUser = data.docs.map((doc) => ({...doc.data(), id: doc.id}))[i]
        }
        i++
    }
    

    var id =  `${Math.floor(Math.random() * 9999) + InfoUser.length}`

   await setDoc(doc(db, collectionUser, id), newReport);


}