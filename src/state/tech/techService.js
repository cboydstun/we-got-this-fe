import Firebase from '../../config/firebase';
import { installActionNames } from '../../state';

const db = Firebase.getFirestore();
const storage = Firebase.getStorageRef();

const getTech = async techId => {
    const techDoc = await db.collection('users').doc(techId).get();

    return {
        docId: techDoc.id,
        team: await service.getTechsTeam(techDoc.id),
        ...techDoc.data(),
    }
}

const service = {
    async getAllTechs() {
        const techDocs = (await db.collection('users').where('roles', 'array-contains', 'tech').get()).docs;

        return await Promise.all(techDocs.map(async techDoc => getTech(techDoc.id)));
    },

    async getTechsTeam(techId) {
        const techDoc = await db.collection('users').doc(techId).get();
        const teamDoc = (await db.collection('teams').where('users', 'array-contains', techDoc.id).get()).docs[0];

        if (!teamDoc) {
            return null;
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

        return getTech(techId);
    },

    async setTechDisabled(techId, disabled) {
        await db
            .collection('users')
            .doc(techId)
            .update({ disabled });

        return getTech(techId);
    },

    async createTech(tech) {
        const { displayName, email, photo, teamId } = tech;
        const techDoc = (await (await db.collection('users').add({ displayName, email, roles: ['tech'] })).get());

        if (teamId) {
            await service.addTechToTeam(techDoc.id, teamId);
        };

        if (photo) {
            const snapshot = await storage.child(`images/${techDoc.id}/headshot`).put(photo);
            await techDoc.ref.update({ photoUrl: await snapshot.ref.getDownloadURL() });
        };

        return getTech(techDoc.id);
    }
};

export default installActionNames(service);
