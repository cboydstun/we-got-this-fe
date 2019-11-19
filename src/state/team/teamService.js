import Firebase from '../../config/firebase';

const db = Firebase.getFirestore();

export const service = {
    async createTeam(team) {
        return await (await db.collection('teams').add(team)).get();
    },

    async getTeams() {
        let teams = [];
        (await db.collection('teams').get()).forEach(doc => {
            teams.push({ docId: doc.id, ...doc.data() });
        });
        return teams;
    },
};
