import Firebase from '../../config/firebase';
import { installActionNames } from '../../state';

const db = Firebase.getFirestore();
const service = {
    async getAllTechs() {
        const techDocs = (await db.collection('users').where('roles', 'array-contains', 'tech').get()).docs;

        return await Promise.all(techDocs.map(async techDoc => {
            const tech = {
                docId: techDoc.id,
                team: await service.getTechsTeam(techDoc.id),
                ...techDoc.data()
            }

            return tech;
        }));
    },

    async getTechsTeam(techId) {
        const techDoc = await db.collection('users').doc(techId).get();
        const teamDoc = (await db.collection('teams').where('users', 'array-contains', techDoc.id).get()).docs[0];

        if (!teamDoc) {
            return;
        }

        return { docId: teamDoc.id, ...teamDoc.data() };
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

        return { techId, team: await service.getTechsTeam(techId) }
    },

    async archiveTech(techId) {
        await db
            .collection('users')
            .doc(techId)
            .update({ disabled: true });
    },

    async inviteTech(tech) {
        const doc = (await (await db.collection('users').add(tech)).get());

        return {
            docId: doc.id,
            ...doc.data()
        }
    }
};

export default installActionNames(service);
