import service from './techService';

export const techState = {
    techs: [],
};

export default function reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case service.addTechToTeam.success: {
            const techs = [...state.techs];
            techs[techs.findIndex(tech => tech.docId === payload.docId)].team = payload.team;
            return { ...state, techs };
        }
        case service.getAllTechs.success:
            return { ...state, techs: payload };
        case service.createTech.success:
            return { ...state, techs: [...state.techs, payload] }
        case service.setTechDisabled.success:
        case service.updateTech.success: {
            const techs = [...state.techs];
            techs[techs.findIndex(tech => tech.docId === payload.docId)] = payload;
            return { ...state, techs };
        }
        default:
            return { ...state };
    }
}
