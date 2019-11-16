import Firebase from '../../config/firebase';
import { installActionNames } from '../../state';

const db = Firebase.getFirestore();
const service = {
    async addTechToTeam(techEmail, teamId) {
        const team = (
            await db
                .collection('teams')
                .doc(teamId)
                .get()
        ).data();

        await db
            .collection('teams')
            .doc(teamId)
            .update({ users: [...team.users, techEmail] });
    },

    async archiveTech(techId) {
        await db
            .collection('techs')
            .doc(techId)
            .update({ disabled: true });
    },

    inviteTech: ({
        firstName,
        lastName,
        email,
        phone,
        address,
        notes,
        city,
        zip,
    }) => {
        db.collection('techs').add({
            firstName,
            lastName,
            email,
            phone,
            address,
            notes,
            city,
            zip,
        });
    },
};

export default installActionNames(service);
