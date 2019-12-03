import { service } from './jobsService';
import jobModel from '../models/job';

export const types = {
    SET_DATE_FILTER: 'calendar/set_date_filter',
    SET_ZIP_FILTER: 'calendar/set_zip_filter',
    SET_TEAM_FILTER: 'calendar/set_team_filter',
    CLEAR_FILTERS: 'calendar/clear_filters',
    SET_NEW_SERVICE_FORM_OPEN: 'calendar/set_new_service_form_open',
    SET_NEW_SERVICE_FORM_02_OPEN: 'calendar/set_new_service_form_02_open',
    SET_NEW_JOB_CUSTOMER: 'calendar/set_new_job_customer',
    SET_SLOT_EVENT: 'calendar/set_slot_event',
    GET_ALL_JOBS: 'calendar/get_all_jobs',
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
    setNewServiceForm_02Open(dispatch, boolean) {
        dispatch({
            type: types.SET_NEW_SERVICE_FORM_02_OPEN,
            payload: boolean,
        });
    },
    setSlotEvent(dispatch, slotEvent) {
        dispatch({ type: types.SET_SLOT_EVENT, payload: slotEvent });
    },
    setNewJobCustomer(dispatch, customer) {
        dispatch({ type: types.SET_NEW_JOB_CUSTOMER, payload: customer });
        dispatch({ type: types.SET_NEW_SERVICE_FORM_OPEN, payload: false });
        dispatch({ type: types.SET_NEW_SERVICE_FORM_02_OPEN, payload: true });
    },

    async getAllJobs(dispatch) {
        dispatch({ type: types.GET_ALL_JOBS, payload: await service.getAllJobs() });
    },

    async scheduleNewJob(dispatch, jobDetails) {
        try {
            //Check if we need to create a new customer
            if (!jobDetails.customer.docId) {
                //If not, create the job with the customer ID
                let newJobDetails = jobModel.formatJob(jobDetails);
                let newJobDocId = await service.scheduleNewJob(newJobDetails);

                if (!newJobDocId) {
                    throw new Error('Failed to create job record');
                }

                //Get the new Job ID and add it to the customer
                let updatedCustomer = await service.addJobToCustomer(
                    jobDetails.customer.docId,
                    newJobDocId
                );

                return true;
            }
        } catch (error) {
            console.log('Scheduling Job Error: ', error);
            return error;
        }

        //If yes, create the customer first

        //Get the customer ID

        //Create the job and add the customer ID

        //Get the job ID and add back to the customer

        //If successful, add the event to their google calendar

        //then, update the global state of events that are upcoming

        //If successful, return true,

        //or return error
    },
};
