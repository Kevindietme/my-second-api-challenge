import { dataBase } from "./dbConnect.js";
const clothesColl = dataBase.collection('clothes');

const clothesArray = (collection) => collection.docs.map(doc => ({ id: doc.id, ...doc.data()}))

export async function retrieveAllClothes(req, res) {
try {
    const allClothes = await clothesColl.get();
    res.send(clothesArray(allClothes));
} catch (err) {
    res.status(500).send(err);
    }
}

export async function addNewClothes(req, res) {
try {
    const newClothes = req.body; 
    await clothesColl.add(newClothes);
    retrieveAllClothes(req, res);
} catch (err) {
    res.status(500).send(err);
    }

}

export async function updateNewClothes(req, res) {
    try {
    const findClothesId = req.params;
    await clothesColl.doc(findClothesId).update(req.body);
    retrieveAllClothes(req, res);
    } catch (err) {
        res.status(500).send(err);
    }

}