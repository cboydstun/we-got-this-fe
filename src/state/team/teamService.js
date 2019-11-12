import Firebase from '../../config/firebase';

const db = Firebase.getFirestore();

export const service = {
    async createTeam(team) {
        return await (await db.collection('teams').add(team)).get();
    },
};
