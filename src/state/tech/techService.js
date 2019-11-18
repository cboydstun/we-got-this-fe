import Firebase from '../../config/firebase';
import { installActionNames } from '../../state';

const db = Firebase.getFirestore();
const service = {
    async getAllTechs() {
        return (await db.collection('techs').get()).docs.map(doc => {
            return { docId: doc.id, ...doc.data() }
        });
    },

    async addTechToTeam(techId, teamId) {
        const team = {
            docId: teamId,
            ...(
                await db
                    .collection('teams')
                    .doc(teamId)
                    .get()
            ).data()
        };

        await db
            .collection('teams')
            .doc(teamId)
            .update({ users: [...team.users, techId] });
    },

    async archiveTech(techId) {
        await db
            .collection('techs')
            .doc(techId)
            .update({ disabled: true });
    },

    async inviteTech(tech) {
        const doc = (await (await db.collection('techs').add(tech)).get());

        return {
            docId: doc.id,
            ...doc.data()
        }
    }
};

export default installActionNames(service);
