import service from './techService';

export const techState = {
    techs: [],
};

export default function reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case service.addTechToTeam.success:
            return { ...state };
        case service.getAllTechs.success:
            return { ...state, techs: payload };
        case service.inviteTech.success:
            return { ...state, techs: [...state.techs, payload] }
        case service.archiveTech.success:
            {
                console.log('STATE HERE IS ', state)
                return { ...state }
            }
        default:
            return { ...state };
    }
}
