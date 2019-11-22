import Firebase from '../../config/firebase';
import { installActionNames } from '../../state';

const db = Firebase.getFirestore();

const service = {
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

    async getTeams() {
        let teams = [];
        (await db.collection('teams').get()).forEach(doc => {
            teams.push({ docId: doc.id, ...doc.data() });
        });
        return teams;
    },
};

export default installActionNames(service);