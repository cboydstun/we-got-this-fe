import Firebase from '../../config/firebase';

const db = Firebase.getFirestore();

export const service = {
    async getAllTeams() {
        return (await db.collection('teams').get()).docs.map(doc => {
            return {
                docId: doc.id, ...doc.data()
            }
        });
    },

    async createTeam(team) {
        return await (await db.collection('teams').add(team)).get();
    },
};
