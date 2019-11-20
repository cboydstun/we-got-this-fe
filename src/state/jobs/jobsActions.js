import { services } from './jobsService';

export const types = {
    SET_DATE_FILTER: 'calendar/set_date_filter',
    SET_ZIP_FILTER: 'calendar/set_zip_filter',
    SET_TEAM_FILTER: 'calendar/set_team_filter',
    CLEAR_FILTERS: 'calendar/clear_filters',
    SET_NEW_SERVICE_FORM_OPEN: 'calendar/set_new_service_form_open',
    SET_SLOT_EVENT: 'calendar/set_slot_event',
};

export const actions = {
    setZipFilter(dispatch, zipcode) {
        dispatch({ type: types.SET_ZIP_FILTER, payload: zipcode });
    },
    setTeamFilter(dispatch, team) {
        dispatch({ type: types.SET_TEAM_FILTER, payload: team });
    },
    setDateFilter(dispatch, date) {
        dispatch({ type: types.SET_DATE_FILTER, payload: date });
    },
    clearFilters(dispatch) {
        dispatch({ type: types.CLEAR_FILTERS });
    },
    setNewServiceFormOpen(dispatch, boolean) {
        dispatch({ type: types.SET_NEW_SERVICE_FORM_OPEN, payload: boolean });
    },
    setSlotEvent(dispatch, slotEvent) {
        dispatch({ type: types.SET_SLOT_EVENT, payload: slotEvent });
    },
};
