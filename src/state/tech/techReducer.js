import service from './techService';

export const techState = {
    techs: [],
};

export default function reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case service.addTechToTeam.success:
            {
                return { ...state };
            }
            case service.archiveTech.error: {
                return {...state}
            }
        default:
            return { ...state };
    };
};